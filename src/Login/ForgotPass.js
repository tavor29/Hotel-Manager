import React, { useRef, useState, useEffect } from "react";
import logo1 from "../imgs/logo2.jpg";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./LoginStyles.css";

const EMAIL_REGEX = /^(?=.*[@])(?=.*[.]).{8,24}$/;

const ForgotPed = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

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
        <h1>Forgot Password:</h1>
        <form>
          <label htmlFor="email">
            Email:
            <span className={validEmail ? "valid" : "offscreen"}>
              <FontAwesomeIcon icon={faCheck} style={{ color: "#926255" }} />
            </span>
            <span className={validEmail || !email ? "offscreen" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} style={{ color: "#926255" }} />
            </span>
          </label>
          <br />
          <br />
          <input
            type="text"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="uidnote"
          />
          <br />
          <p
            id="uidnote"
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            <br />
            Write your full email and check that you wrote it correctly
          </p>
          <br />
          <button className="btn" onClick={() => navigate("/Opt")}>
            Next
          </button>
        </form>
        <br />
        <p style={{ paddingTop: 15 }} onClick={() => navigate("/")}>
          I remembered the password!
        </p>
      </div>
    </section>
  );
};
export default ForgotPed;
