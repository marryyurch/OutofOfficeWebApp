import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Text, Checkbox } from "@chakra-ui/react";

function Login() {
    // state variables for email and passwords
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberme] = useState(false);
    // state variable for error messages
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // handle change events for input fields
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberme") setRememberme(type === "checkbox" ? checked : value);
    };

    const handleRegisterClick = () => {
        navigate("/register");
    }

    const handleRegisterHRClick = () => {
        navigate("/registerHR");
    }

    // handle submit event for the form
    const handleSubmit = (e) => {
        e.preventDefault();
        // validate email and passwords
        if (!email || !password) {
            setError("Please fill in all fields.");
        } else {
            // clear error message
            setError("");
            // post data to the /register api

            var loginurl = "";
            if (rememberme === true)
                loginurl = "/login?useCookies=true";
            else
                loginurl = "/login?useSessionCookies=true";

            fetch(loginurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then((response) => {
                    // handle success or error from the server
                    console.log(response);
                    if (response.ok) {
                        setError("Successful Login.");
                        window.location.href = '/home';
                    } else {
                        setError("Error Logging In.");
                    }
                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error Logging in.");
                });
        }
    };

    return (
        <section className="p-8 flex flex-row justify-center items-center min-h-screen"> 
        <div className="containerbox">
            <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
                <h3 className="font-bold text-xl">Login</h3>
                <Input placeholder="E-mail"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <Input placeholder="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <Checkbox defaultChecked
                    id="rememberme"
                    name="rememberme"
                    checked={rememberme}
                    onChange={handleChange} >Remember Me</Checkbox>
                <Button colorScheme="teal" type="submit">Login</Button>
                <Text textAlign='center' color='#a6a6a6' as='samp'>OR</Text>
                <Button colorScheme="blue" type="button" onClick={handleRegisterClick}>Register</Button>
                <Button colorScheme="purple" onClick={handleRegisterHRClick}>Register HR</Button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
        </section>
    );
}

export default Login;
