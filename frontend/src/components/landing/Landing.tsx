import React from "react";
import { Link } from "react-router-dom";
import Header from "../header/header";

export default function Landing(): any {
  return (
    <div className="Landing">
      <body>
        <Header />
        <Link to="/"></Link>
      </body>
    </div>
  );
}
