import React from "react";
import "../styles/Header.scss";
import Nav from "./NavBar";
import NavBadge from "./NavBadge";

const Header = () => {
  return (
    <div>
      <NavBadge />
      <Nav />
    </div>
  );
};

export default Header;
