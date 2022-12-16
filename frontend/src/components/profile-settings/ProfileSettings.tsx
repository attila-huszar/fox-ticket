import { useState } from "react";
import "./ProfileSettings.css";

export default function ProfileSettings() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    setErrorMessage("A field is required to be changed.");
  };

  return (
    <div className="settings">
      <h1>Profile</h1>
      <div className="form">
        <form id="settings" name="settings">
          <div className="input-container">
            <input className="input-field" type="text" id="id_name" name="name" minLength={5} required placeholder=" " />
            <span className="floating-label">Name</span>
          </div>

          <div className="sep"></div>

          <div className="input-container">
            <input className="input-field" type="email" id="id_email" name="email" required placeholder=" " />
            <span className="floating-label">Email Address</span>
          </div>

          <div className="sep"></div>

          <div className="input-container">
            <input className="input-field" type="password" id="id_password" name="oldPassword" autoComplete="current-password" minLength={6} required placeholder=" " />
            <span className="floating-label">Old Password</span>
          </div>
          <a href="./forgot" id="forgot-pass" data-tooltip="Send email reminder" data-tooltip-location="bottom">
            Forgot Password?
          </a>

          <div className="sep"></div>

          <div className="input-container">
            <input className="input-field" type="password" id="id_newPassword" name="newPassword" minLength={6} required placeholder=" " />
            <span className="floating-label">New Password</span>
          </div>

          <div className="sep"></div>

          <div className="input-container">
            <input className="input-field" type="password" id="id_newPasswordAgain" name="newPasswordAgian" minLength={6} required placeholder=" " />
            <span className="floating-label">New Password Again</span>
          </div>

          {errorMessage && <div className="error">{errorMessage}</div>}
          <div className="buttons">
            <button id="submit-btn" type="button" onClick={handleClick}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
