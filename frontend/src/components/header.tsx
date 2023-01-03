import React from "react";
import foxticketLogo from "./foxticketLogo.png";
import { Link } from "react-router-dom";
import logout from "./logout.png";
import userProfileLogo from "./userprofile.png";
import purchaseLogo from "./store.png";
import handleClick from "./App";

export default function Header(): any {
  return (
    <header className="Header">
      <Link to="/" onClick={handleClick}>
        <img src={foxticketLogo} className="Landing-logo" alt="logo" />
      </Link>
      <Link to="/login" onClick={handleClick}>
        <a href="/login" className="nav-link">
          <button className="button">Login</button>
        </a>
      </Link>
      <Link to="/logout" onClick={handleClick}>
        <a href="/" className="nav-link">
          <button className="button">
            <img src={logout} className="logout-logo" alt="logo" /> Logout
          </button>
        </a>
      </Link>
      <Link to="/profile" onClick={handleClick}>
        <a href="/profile" className="nav-link">
          <button className="button">
            <img
              src={userProfileLogo}
              className="userProfile-logo"
              alt="logo"
            />{" "}
            Profile
          </button>
        </a>
      </Link>
      <Link to="/purchases" onClick={handleClick}>
        <a href="/purchases" className="nav-link">
          <button className="button">
            <img src={purchaseLogo} className="purchase-logo" alt="logo" />{" "}
            Purchases
          </button>
        </a>
      </Link>
      <Link to="/register" onClick={handleClick}>
        <a href="/register" className="nav-link">
          <button className="button">Register</button>
        </a>
      </Link>
    </header>
  );
}
