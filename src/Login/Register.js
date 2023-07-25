import { useState } from "react";
import logo1 from "../imgs/logo2.jpg";
import { useNavigate } from "react-router-dom";
import "./LoginStyles.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,22}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const navigate = useNavigate();

  const [gender, setGender] = useState("male");
  const [fName, setFName] = useState("");
  const [sName, setSName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validName, setValidName] = useState(true);
  const [validPwd, setValidPwd] = useState(true);
  const [validMatch, setValidMatch] = useState(true);
  const [creationSucceed, setCreationSucceed] = useState(false);

  const fetchThis = async (userObject) => {
    console.log("register object:", userObject);
    try {
      const response = await fetch(
        "https://proj.ruppin.ac.il/cgroup97/prod/api/signUP",
        {
          method: "POST",
          body: JSON.stringify(userObject),
          headers: new Headers({
            "Content-type": "application/json; charset=UTF-8",
          }),
        }
      );

      if (response.ok) {
        console.log("User created successfully");
        setCreationSucceed(true);
      } else {
        const errorMessage = await response.text();
        const errorObject = JSON.parse(errorMessage);
        const errorType = errorObject.type;
        const errorMessageText = errorObject.message;

        console.log(
          `Error: ${response.status} - ${errorType} - ${errorMessageText}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidName =
      fName && USER_REGEX.test(fName) && sName && USER_REGEX.test(sName);
    const isValidPwd = password && PWD_REGEX.test(password);
    const isValidMatch = password === confirmPassword;

    setValidName(!!fName && USER_REGEX.test(fName));
    setValidPwd(isValidPwd);
    setValidMatch(isValidMatch);

    if (!isValidName || !isValidPwd || !isValidMatch) {
      return;
    }

    const userObject = {
      email: email,
      password: password,
      languageID: "1",
      dateOfBirth: birthDate,
      phone: phoneNumber,
      gender: gender,
      fName: fName,
      sName: sName,
    };
    fetchThis(userObject);
  };

  return (
    <>
      {creationSucceed ? (
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
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="firstName">First Name:</label>
              <br />
              <input
                type="text"
                id="firstName"
                onChange={(e) => setFName(e.target.value)}
                value={fName}
                required
              />
              {!validName && <p>First name is required and must be valid</p>}
              <br />
              <br />
              <label htmlFor="lastName">Last Name:</label>
              <br />
              <input
                type="text"
                id="lastName"
                onChange={(e) => setSName(e.target.value)}
                value={sName}
                required
              />
              {!validName && <p>Last name is required and must be valid</p>}
              <br />
              <br />
              <label htmlFor="email">Email:</label>
              <br />
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <br />
              <br />
              <label htmlFor="phone">Phone Number:</label>
              <br />
              <input
                type="tel"
                id="phone"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                required
              />
              <br />
              <br />
              <label htmlFor="birthDate">Date of Birth:</label>
              <br />
              <input
                type="date"
                id="birthDate"
                onChange={(e) => setBirthDate(e.target.value)}
                value={birthDate}
                required
              />
              <br />
              <br />
              <label htmlFor="gender">Gender:</label>
              <br />
              <select
                id="gender"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <br />
              <br />
              <label htmlFor="password">Password:</label>
              <br />
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              {!validPwd && (
                <p>
                  Password must contain: 1 lowercase letter, 1 uppercase letter,
                  1 digit, 1 special character, and be 8 to 24 characters long
                </p>
              )}
              <br />
              <br />
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <br />
              <input
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
              {!validMatch && <p>Passwords must match</p>}
              <br />
              <br />
              <button type="submit">Sign Me Up</button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
