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

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPwd = () => {
  const errRef = useRef();

  const [pwd, setPwd] = useState("");
  const [validPwd, setvalidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setvalidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = PWD_REGEX.test(pwd);
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section className="success">
          <h1 style={{ padding: 20 }}>Success!</h1>
          <p style={{ paddingBottom: 20 }} onClick={() => navigate("/")}>
            Sign In
          </p>
        </section>
      ) : (
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
            <h1>Reset Password:</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="password">
                Password:
                <span className={validPwd ? "valid" : "offscreen"}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#926255" }}
                  />
                </span>
                <span className={validPwd || !pwd ? "offscreen" : "invalid"}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: "#926255" }}
                  />
                </span>
              </label>
              <br />
              <br />
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <br />
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                <br />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and
                special character. <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>
              <br />
              <label htmlFor="confirm_ped">
                confirm Password:
                <span
                  className={validMatch && matchPwd ? "valid" : "offscreen"}
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#926255" }}
                  />
                </span>
                <span
                  className={validMatch || !matchPwd ? "offscreen" : "invalid"}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: "#926255" }}
                  />
                </span>
              </label>
              <br />
              <br />
              <input
                type="password"
                id="confirm_ped"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                <br />
                Must match the first password input field.
              </p>
              <br />
              <br />
              <button
                disabled={!validPwd || !validMatch ? true : false}
                className="btn"
                onClick={() => navigate("/")}
              >
                Sign In
              </button>
            </form>
            <br />
            <p style={{ paddingTop: 15 }} onClick={() => navigate("/")}>
              I remembered the password!
            </p>
          </div>
        </section>
      )}
    </>
  );
};
export default ResetPwd;
