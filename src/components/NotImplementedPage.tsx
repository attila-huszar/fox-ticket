import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { TbSmartHome } from "react-icons/tb";
import logo from "../assets/fox.png";
import "./NotImplementedPage.css";

export default function NotImplementedPage() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <div className="NotImplementedPage">
      <h1>This page is not implemented yet</h1>
      <img src={logo} id="logo" alt="logo" />
      <Button css={"margin: auto"} shadow size="lg" icon={<TbSmartHome />} auto color="gradient" rounded onPress={routeChange} id="homeBtn">
        Home
      </Button>
    </div>
  );
}
