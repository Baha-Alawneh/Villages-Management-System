import React, { useState } from "react";
import { Link } from "react-router-dom";
import './register.css'
import { SIGNUP_USER } from "../../grqphql/auth";
import { useMutation } from "@apollo/client";
const SignUp = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    password: ""
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
 
  const handleSignUp =async () => {
    if (!formData.full_name || !formData.username || !formData.password) {
        alert("All fields (full_name, username, password) are required.");
        return;
      }
    try{
        const response = await signup({
            variables: {
              input: {
                full_name: formData.full_name,
                username: formData.username,
                password: formData.password,
              },
            },
          });
          
        console.log("Sign Up Response:", response);
        if (response && response.data) {
            console.log("signup successful! ", response.data);
            alert("User registered successfully");
        setFormData({ full_name: "", username: "", password: "" });
          }
      } catch(err) {
        console.error("sign failed:", err);
    }
    console.log("Sign Up Data:", formData);
  };

  return (
    <div className="outer-container-register">
      <div className="inner-container-register">
        <h1>Sign Up</h1>
        <label htmlFor="full_name">Full Name</label>
        <input
  type="text"
  id="full_name"
  name="full_name"  
  value={formData.full_name}
  onChange={handleChange}
  required
  placeholder="Enter your full name"
/>


        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Enter your username"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />

        <input
          type="button"
          className="btn-register"
          id="signup"
          value="Sign Up"
          onClick={handleSignUp}
        />
        {error && <p>Error: {error.message}</p>}
         <p className="already-register">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
