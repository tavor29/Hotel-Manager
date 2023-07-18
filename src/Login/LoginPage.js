import React, { useRef, useState } from "react";
import logo1 from "../imgs/logo2.jpg";
import { useNavigate } from "react-router-dom";
import "./LoginStyles.css";

const Login = ({ handleLogin }) => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.trim() === "" || pwd.trim() === "") {
      setErrMsg("Please enter both username and password.");
      return;
    }

    setIsLoading(true);
    setErrMsg("");

    try {
      const response = await fetch(
        "http://proj.ruppin.ac.il/cgroup97/test2/api/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: user,
            password: pwd,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (response.ok) {
        handleLogin(user, pwd);
      } else {
        const message = await response.text();
        const object = JSON.parse(message);
        setErrMsg(object.message);
      }
    } catch (error) {
      setErrMsg("Either the email or the password is wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="registerPage">
      <img className="regImg" src={logo1} alt="" />
      <div className="registerDetails">
        {errMsg && (
          <p ref={errRef} className="errmsg" aria-live="assertive">
            {errMsg}
          </p>
        )}
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
          />
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
          />
          <br />
          <br />
          <button className="btn" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
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
