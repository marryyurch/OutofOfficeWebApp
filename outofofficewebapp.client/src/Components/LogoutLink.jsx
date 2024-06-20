//import { Button, Input, Text } from "@chakra-ui/react";
//import React from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'; 

function LogoutLink(props) {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: ""
        })
        .then((data) => {
            if (data.ok) {
                navigate("/login");
            } else {
                // handle error if needed
            }
        })
        .catch((error) => {
            console.error(error);
        });
    };

    LogoutLink.propTypes = {
        children: PropTypes.node // Define the type for children
    };

    return (
        <>
            <a href="#" onClick={handleSubmit}>{props.children}</a>
        </>
    );
}

export default LogoutLink;