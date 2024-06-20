import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import axios from "axios";

const UserContext = createContext({});

function AuthorizeView(props) {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    let emptyuser = { email: "" };

    const [user, setUser] = useState(emptyuser);

    useEffect(() => {
        let retryCount = 0;
        let maxRetries = 10;
        let delay = 1000;

        function wait(delay) {
            return new Promise((resolve) => setTimeout(resolve, delay));
        }

        async function fetchWithRetry(url, options) {
            try {
                let response = await fetch(url, options);
                if (response.status === 200) {
                    console.log("Authorized");
                    let j = await response.json();
                    setUser({ email: j.email });
                    setAuthorized(true);
                    return response;
                } else if (response.status === 401) {
                    console.log("Unauthorized");
                    return response;
                } else {
                    throw new Error("" + response.status);
                }
            } catch (error) {
                retryCount++;
                if (retryCount > maxRetries) {
                    throw error;
                } else {
                    await wait(delay);
                    return fetchWithRetry(url, options);
                }
            }
        }

        fetchWithRetry("/pingauth", {
            method: "GET",
        }).catch((error) => {
            console.log(error.message);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    } else {
        if (authorized && !loading) {
            return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>;
        } else {
            return <Navigate to="/login" />;
        }
    }
}

AuthorizeView.propTypes = {
    children: PropTypes.node // Define the type for children
};

export function AuthorizedUser(props) {
    const user = React.useContext(UserContext);
    if (props.value === "email") {
        return <>{user.email}</>;
    } else {
        return <></>;
    }
}

export async function CheckUserRole(props) {
    const user = React.useContext(UserContext);
    if (props.value === "email") {
        var response = await axios.get("http://localhost:5283/api/employee/check-employee-role", { params: user.email });
        return <>{ response.data}</>
    }
    else {
        return <></>;
    }
}

CheckUserRole.propTypes = {
    children: PropTypes.node // Define the type for children
};

AuthorizedUser.propTypes = {
    value: PropTypes.string.isRequired // Define the type for value
};

export default AuthorizeView;