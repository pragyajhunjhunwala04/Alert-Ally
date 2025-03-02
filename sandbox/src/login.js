import React, { StrictMode } from "react";

import Signup from "./signup";
import Home from "./home";

export default function Login() {
  return (
    <body>
      <title>SpotiCry Login</title>
      <h1>SpotiCry</h1>
      <div class="temp-logo">Logo</div>
      <h2>Log in to SpotiCry</h2>
      <div class="login-grid">
        <label>Phone Number:</label>
        <input class="any-input"></input>
        <label>Password:</label>
        <input class="pw"></input>
      </div>
      <button class="login-button">Login</button>
      <p>Don't have an account?</p>
      <button class="signup-button">Sign Up</button>
    </body>
  )
}