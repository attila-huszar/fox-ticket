import Articles from "./Articles";
import { Fade } from "react-awesome-reveal";
import "../styles/Home.css";
import m1 from "../assets/m1a.png";
import { toast } from "react-toastify";

export default function Home() {
  const notify = () =>
    toast.success(
      `${useremail} successfully verified! Please log in with your email address.`,
      {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );

  let useremail = "";
  if (document.location.href.includes("?verified=")) {
    const verifiedEmail: string = document.location.href.split("?verified=")[1];
    useremail = decodeURI(verifiedEmail);
    notify();
  }

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
