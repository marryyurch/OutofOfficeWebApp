import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    
    const [error, setError] = useState("");

    const handleLoginClick = () => {
        navigate("/login");
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault

        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            
            setError("");
            
            fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    
                    console.log(data);
                    if (data.ok)
                        setError("Successful register.");
                    else
                        setError("Error registering.");
                })
                .catch((error) => {
                    
                    console.error(error);
                    setError("Error registering.");
                });
        }
    };

    return (
        <section className="p-8 flex flex-row justify-center items-center min-h-screen"> 
        <div className="containerbox">
            <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
            <h3 className="font-bold text-xl">Register</h3>
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
            <Input placeholder="Confirm password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
            />
            <Button colorScheme="purple" type="submit">Register</Button>
            <Button colorScheme="blue" type="button" onClick={handleLoginClick}>Go to Login</Button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
        </section>
    );
}

export default Register;