import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import localization from "../../assets/constants/localization";
import brandLogo from "../../assets/features/brandLogo.png";
export default function Header() {
  const activeStyle = {
    fontWeight: "bold",
  };
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (state) => {
    setOpen(state);
  };
  const handleNavClick = (path) => {
    navigate(path);
    setOpen(false);
  };
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        // 👈 threshold check
        if (window.scrollY > lastScrollY) {
          // scrolling down
          setHidden(true);
        } else {
          // scrolling up
          setHidden(false);
        }
      } else {
        // If user is near the top (<50px), always show header
        setHidden(false);
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={
        "site-header" +
        (window.RDL.isMobile ? " mobile-view" : "") +
        (hidden ? " hidden" : "")
      }
    >
      <div className="header-inner">
        <NavLink to="/" className="brand" end>
          <div className="brand-logo-name">
            <img className="brand-logo" src={brandLogo} alt={"title"} />
            <span className="brand-name">{localization.brandName}</span>
          </div>
        </NavLink>
        {!window.RDL.isMobile && (
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
        )}
        {window.RDL.isMobile && (
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        {/* Drawer (slider menu) */}
        {window.RDL.isMobile && (
          <Drawer
            anchor="right"
            open={open}
            onClose={() => toggleDrawer(false)} // <-- fixed
            className="custom-drawer-home-page"
          >
            <List>
              {localization.navbarOptions.map((navItem) => (
                <ListItem
                  button
                  key={navItem[0]}
                  onClick={() => handleNavClick(navItem[1])}
                >
                  <ListItemText primary={navItem[0]} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        )}
      </div>
    </header>
  );
}
