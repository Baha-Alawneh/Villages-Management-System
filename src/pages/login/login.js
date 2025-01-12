import React, { useState } from "react";
import "../signup/register.css";
import { Link,useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../../grqphql/auth";
import { useMutation } from '@apollo/client';
const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser] = useMutation(LOGIN_USER);
    const navigate = useNavigate();

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
                localStorage.setItem('authToken', token);
                console.log("Login successful! Token:", token);
                alert("Login successful!");
                navigate("/");
            }
        } catch (err) {
            console.error("Login failed:", err);
            alert("Invalid credentials!"); 
        }
        setUsername("");
        setPassword("");
    };

    return (
        <div className="outer-container-register" >
            <div className="inner-container-register" >

                <h1>Login</h1>
                <div className="username-register">
                    <label htmlFor="username-register">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>
                <div className="password-register">
                    <label htmlFor="password-register">Password</label>
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
                        className="btn-register"
                        id="loginBtn"
                        value="Login"
                        onClick={handleLogin}
                    />
                </div>
                <p className="already-register">
                    Already have an account?{" "}
                    <Link className="link" to="/signup">SignUp</Link>
                </p>
            </div>
            
        </div>
    );
};


export default LoginForm;
