import { NavLink } from "react-router-dom";

export default function Header() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand" end>
          MediAssist
        </NavLink>
        <nav className="nav" aria-label="Primary navigation">
          <NavLink
            to="/"
            end
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/upload"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Upload
          </NavLink>
          <NavLink
            to="/about"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
