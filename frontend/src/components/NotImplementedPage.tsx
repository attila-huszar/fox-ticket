import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { TbSmartHome } from "react-icons/tb";
import logo from "../assets/fox.png";
import "./NotImplementedPage.css";

export default function NotImplementedPage() {
  const navigate = useNavigate();
  const routeChange = () => {
    const path = "/";
    navigate(path);
  };

  return (
    <div className="NotImplementedPage">
      <h1>This page is not implemented yet</h1>
      <img src={logo} id="logo" alt="logo" />
      <Button shadow size="lg" icon={<TbSmartHome />} auto color="gradient" rounded onClick={routeChange} id="homeBtn">
        Home
      </Button>
    </div>
  );
}
