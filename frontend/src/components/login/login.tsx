import React from "react";
import { Link } from "react-router-dom";
import Header from "../header/header";

export default function Login(): any {
  return (
    <div className="Landing">
      <body>
        <Header />
        <Link to="/landing"></Link>
      </body>
    </div>
  );
}
