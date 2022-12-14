import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import "./Registration.scss";
import regIcon from "./register-logo.png";
import mailIcon from "./mail-icon.png";
import passwordIcon from "./password-icon.png";

export default function Registration() {
  // const [isShown, setIsShown] = useState(false);

  // const handleClick = (e: any) => {
  //   e.preventDefault();
  //   setIsShown(!isShown);
  // };

  return (
    <>
      <div className="registrationField">
        <h1>Registration</h1>
        <div className="inputField">
          <img className="regIcon" src={regIcon} alt="username" />{" "}
          <input type="text" className="userName" placeholder="Username*" />
          <img className="mailIcon" src={mailIcon} alt="mail" />
          <input type="text" className="email" placeholder="Email*" />
          <img className="passwordIcon" src={passwordIcon} alt="passwordIcon" />
          <input type="text" className="password" placeholder="Password*" />
        </div>
        <div className="termsField">
          <p className="termsAndConditions">Please accept our Terms of use.*</p>
          <input type="checkbox" className="checkBox" />
          <button className="btnRegistration">Registration</button>
        <a href="ef" className="existingAccount">
          Already have an account? Login here.
        </a>
        </div>
        
      </div>
    </>
  );
}
