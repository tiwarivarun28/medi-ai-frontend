import { NavLink } from "react-router-dom";

export default function Navbar() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <nav>
      <NavLink
        to="/"
        end
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Home
      </NavLink>{" "}
      |{" "}
      <NavLink
        to="/upload"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Upload
      </NavLink>{" "}
      |{" "}
      <NavLink
        to="/about"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        About
      </NavLink>
    </nav>
  );
}
