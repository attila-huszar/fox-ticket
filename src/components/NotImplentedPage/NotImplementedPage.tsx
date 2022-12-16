import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./fox.png";
import "./NotImplementedPage.css";

export default function NotImplementedPage() {
  const refLogo = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  const routeChange = () => {
    const path = "/";
    navigate(path);
  };

  return (
    <div className="NotImplementedPage">
      <div className="notImplemented-body">
        <h1>This page is not implemented yet!</h1>
        <img src={logo} ref={refLogo} id="logo" alt="logo" />
        <button type="submit" onClick={routeChange} id="goHomeButton" className="button">
          Go Home
        </button>
      </div>
    </div>
  );
}
