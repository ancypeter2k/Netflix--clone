import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { login, signup } from "../../firebase";
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);

  const toggleSignState = () => {
    setSignState(signState === "Sign In" ? "Sign Up" : "Sign In");
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 

    try {
      if (signState === "Sign Up") {
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
      console.log("Authentication successful!");
    } catch (err) {
      setError(err.message); 
      console.error("Authentication failed:", err);
    }
    setLoading(false);
  };

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className="login">
      <img src={logo} className="login-logo" alt="Logo" />
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1>{signState}</h1>

          {error && <p className="error-message">{error}</p>}

          {signState === "Sign Up" && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button type="submit">{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>

          <div className="form-switch">
            {signState === "Sign In" ? (
              <p>
                New to Netflix?
                <span onClick={toggleSignState}>Sign Up Now</span>
              </p>
            ) : (
              <p>
                Already have an account?
                <span onClick={toggleSignState}>Sign In Now</span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
