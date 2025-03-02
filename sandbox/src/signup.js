export default function Signup() {
    return (
      <body>
        <title>SpotiCry Signup</title>
        <h2>Sign up for SpotiCry</h2>
        <div class="signup-grid">
            <label>Name:</label>
            <input class="any-input"></input>
            <label>Phone Number:</label>
            <input class="any-input"></input>
            <label>Password:</label>
            <input class="pw"></input>
            <label>Confirm Password:</label>
            <input class="pw"></input>
            <label>Emergency Contact Name:</label>
            <input class="any-input"></input>
            <label>Emergency Contact Number:</label>
            <input class="any-input"></input>
        </div>
        <button class="signup-button">Sign Up</button>
      </body>
    )
  }


//   const root = createRoot(document.getElementById("root"));
//   root.render(
//   <StrictMode>
//       <Signup />
//   </StrictMode>
//   );