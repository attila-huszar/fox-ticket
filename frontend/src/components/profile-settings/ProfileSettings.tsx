import "./ProfileSettings.css";

export default function ProfileSettings() {
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
            <div className="eye" data-tooltip="Show/Hide Password">
              <i className="fa-regular fa-fw fa-eye" id="eyeId"></i>
            </div>
            <span className="floating-label">Old Password</span>
          </div>
          <a href="./forgot" id="forgot-pass" data-tooltip="Send email reminder" data-tooltip-location="bottom">
            Forgot Password?
          </a>

          <div className="sep"></div>

          <div className="input-container">
            <input className="input-field" type="password" id="id_password" name="newPassword" minLength={6} required placeholder=" " />
            <div className="eye" data-tooltip="Show/Hide Password">
              <i className="fa-regular fa-fw fa-eye" id="eyeId"></i>
            </div>
            <span className="floating-label">New Password</span>
          </div>

          <div className="sep"></div>

          <div className="input-container">
            <input className="input-field" type="password" id="id_password" name="newPasswordAgian" minLength={6} required placeholder=" " />
            <div className="eye" data-tooltip="Show/Hide Password">
              <i className="fa-regular fa-fw fa-eye" id="eyeId"></i>
            </div>
            <span className="floating-label">New Password Again</span>
          </div>

          <div className="buttons">
            <button id="submit-btn" type="button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
