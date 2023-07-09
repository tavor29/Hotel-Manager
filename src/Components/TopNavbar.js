import logo1 from "../imgs/logo1.png";
import { Link } from "react-router-dom";
export default function TopNavbar() {
  const name = "Nir Tzuri";
  return (
    <div className="AppHeader">
      {" "}
      <Link to="/">
        <img width={90} src={logo1} alt="" />
      </Link>
      <h1
        style={{
          textAlign: "left",
          position: "absolute",
          left: 150,
          fontFamily: "Arial",
        }}
      >
        SERVISO
      </h1>
      <p>Hello {name}! </p>
    </div>
  );
}
