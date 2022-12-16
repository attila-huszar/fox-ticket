import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import "./Registration.scss";
import regIcon from "./register-logo.png";
import mailIcon from "./mail-icon.png";
import passwordIcon from "./password-icon.png";


export default function Registration() {
  const [userName, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordLenght, setPasswordLenght] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);

  const [error, setError] = useState(false);

  const emptyFieldCheck = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (password.length >= 1 && password.length < 8) {
      setPasswordLenght(true);
    }
    if (
      mail.length >= 1 &&
      mail.search(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/)
    ) {
      setEmailValidation(true);
    }

    if (userName.length == 0 || mail.length == 0 || password.length == 0) {
      setError(true);
    }
  };

  function submitValidation() {
    if (userName && mail && password && passwordLenght && error && emailValidation) {
      console.log("not ok");
    } else {
      console.log("ok");
    }
  }

  return (
    <>
      <form onSubmit={emptyFieldCheck} className="registrationField">
        <h1>Registration</h1>
        <div className="inputField">
          <img className="regIcon" src={regIcon} alt="username" />{" "}
          <input
            onChange={(e) => setUserName(e.target.value)}
            name="userName"
            type="text"
            className="userName"
            placeholder="Username*"
          />
          {error && userName.length <= 0 ? (
            <label id="userName" htmlFor="userName">
              Username is required
            </label>
          ) : (
            ""
          )}
          <img className="mailIcon" src={mailIcon} alt="mail" />
          <input
            onChange={(e) => setMail(e.target.value)}
            name="email"
            type="text"
            className="email"
            placeholder="Email*"
          />
          {error && mail.length <= 0 ? (
            <label id="email" htmlFor="email">
              Email address is required
            </label>
          ) : (
            ""
          )}
          {emailValidation &&
          mail.length > 1 &&
          mail.search(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/) ? (
            <label id="email" htmlFor="email">
              Invalid email!
            </label>
          ) : (
            ""
          )}
          <img className="passwordIcon" src={passwordIcon} alt="passwordIcon" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            className="password"
            placeholder="Password*"
          />
          {error && password.length <= 0 ? (
            <label id="password" htmlFor="password">
              Password is required
            </label>
          ) : (
            ""
          )}
          {passwordLenght && password.length >= 1 && password.length < 8 ? (
            <label id="password" htmlFor="password">
              Min. 8 digits are required
            </label>
          ) : (
            ""
          )}
        </div>
        <div className="termsField">
          <p className="termsAndConditions">Please accept our Terms of use.*</p>
          <input type="checkbox" className="checkBox" />
          <button onClick={submitValidation} className="btnRegistration">
            Registration
          </button>
          <a href="http://localhost:3000/login" className="existingAccount">
            Already have an account? Login here.
          </a>
        </div>
      </form>
    </>
  );
}
