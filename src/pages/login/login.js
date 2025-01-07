import React, { useState } from "react";
import "../signup/register.css";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../../grqphql/auth";
import { useMutation } from '@apollo/client';
const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser] = useMutation(LOGIN_USER);
    const handleLogin = async (e) => { 
        e.preventDefault();
        if (!username || !password) {
            alert("Please enter both username and password!");
            return;
        }
        console.log("heelllo33");
        try {
            const response = await loginUser({
                variables: { input: { username: username, password: password } }
            });
            console.log("heelllo44");
            if (response && response.data) {
                const { token } = response.data.login;
                console.log("Login successful! Token:", token);
                alert("Login successful!");
            }
        } catch (err) {
            console.error("Login failed:", err);
            alert("Invalid credentials!");
        }
        setUsername("");
        setPassword("");
    };

    return (
        <div className="outer-container" >
            <div className="inner-container" >
                <h1>Login</h1>
                <div className="username">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <div className="button">
                    <input
                        type="button"
                        className="btn"
                        id="loginBtn"
                        value="Login"
                        onClick={handleLogin}
                    />
                </div>
                <p>
                    Already have an account?{" "}
                    <Link to="/signup">SignUp</Link>
                </p>
            </div>
        </div>
    );
};


export default LoginForm;
