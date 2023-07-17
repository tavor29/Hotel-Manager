import { useRef, useState, useEffect } from "react";
import logo1 from "../imgs/logo2.jpg";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./LoginStyles.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Role_REGEX = /^[a-zA-Z][a-zA-Z]{3,23}$/;

const Register = () => {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [role, setRole] = useState("");
  const [validRole, setValidRole] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setvalidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = Role_REGEX.test(role);
    console.log(result);
    console.log(user);
    setValidRole(result);
  }, [role]);

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
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
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
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                User name:
                <span className={validName ? "valid" : "offscreen"}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#926255" }}
                  />
                </span>
                <span className={validName || !user ? "offscreen" : "invalid"}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: "#926255" }}
                  />
                </span>
              </label>
              <br />
              <br />
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="uidnote"
              />
              <br />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                <br />
                4 to 24 characters.
                <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              <br />
              <label htmlFor="role">Role:</label>
              <span className={validRole ? "valid" : "offscreen"}>
                <FontAwesomeIcon icon={faCheck} style={{ color: "#926255" }} />
              </span>
              <span className={validRole || !user ? "offscreen" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} style={{ color: "#926255" }} />
              </span>
              <br />
              <br />
              <input
                type="text"
                id="role"
                onChange={(e) => setRole(e.target.value)}
                required
                aria-invalid={validRole ? "false" : "true"}
                aria-describedby="pwdnote"
              />
              <br />
              <br />
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
                disabled={!validName || !validPwd || !validMatch ? true : false}
              >
                Sign Me Up
              </button>
            </form>
            <br />
            <p style={{ paddingTop: 60 }} onClick={() => navigate("/")}>
              Already registered?
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
