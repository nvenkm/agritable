import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const currentRoute = useLocation();

  console.log(currentRoute.pathname);

  return (
    <nav className="navbar">
      <h3 className="h3">Naveen</h3>
      <Link
        style={{
          color:
            currentRoute.pathname === "/" ? "orange" : "rgb(197, 189, 189)",
        }}
        className="link"
        to="/"
      >
        Table 1
      </Link>
      <Link
        style={{
          color:
            currentRoute.pathname === "/average-crop-yield-table"
              ? "orange"
              : "rgb(197, 189, 189)",
        }}
        className="link"
        to="/average-crop-yield-table"
      >
        Table 2
      </Link>
    </nav>
  );
};

export default Navbar;
