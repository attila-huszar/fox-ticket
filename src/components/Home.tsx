import Articles from "./Articles";
import { Fade } from "react-awesome-reveal";
import "../styles/Home.css";
import m1 from "../assets/m1a.png";

export default function Home() {
  const date = new Date();
  const localDate = date.toLocaleDateString();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = weekday[date.getDay()];

  return (
    <>
      <Fade duration={750}>
        <div className="background">
          <img
            className="m1"
            src={m1}
            alt="m1 metro"
            style={{
              objectFit: "cover",
              width: "100vw",
              height: "450px",
            }}></img>
        </div>
        <Articles />
      </Fade>

      <div className="title">
        <h2>
          News
          <p style={{ fontSize: "16" }}>
            <i>
              Budapest, {localDate}, {day}
            </i>
          </p>
        </h2>
      </div>
    </>
  );
}
