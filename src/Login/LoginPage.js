import React, { useRef, useState, useEffect } from "react";
import logo1 from "../imgs/logo2.jpg";
import { useNavigate } from "react-router-dom";
import "./LoginStyles.css";

const Login = ({ handleLogin }) => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the handleLogin function to attempt login
    handleLogin(user, pwd);
  };

  return (
    <section className="registerPage">
      <img className="regImg" src={logo1} alt="" />
      <div className="registerDetails">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In:</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">User name:</label>
          <br />
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            basename
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          ></input>
          <br />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          ></input>
          <br />
          <br />
          <button className="btn">Sign In</button>
        </form>
        <p onClick={() => navigate("/Register")}>
          Need an Account?
          <br />
        </p>
        <p onClick={() => navigate("/ForgotPass")}>Forgot password?</p>
      </div>
    </section>
  );
};

export default Login;
