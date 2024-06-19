import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbarx">
      <ul className="navbarx-nav">
        <li className="nav-itemx">
          <Link to="/" className="nav-linkx">
            Transactions
          </Link>
        </li>
        <li className="nav-itemx">
          <Link to="/barchart" className="nav-linkx">
            Bar Chart
          </Link>
        </li>
        <li className="nav-itemx">
          <Link to="/stats" className="nav-linkx">
            Stats
          </Link>
        </li>
        <li className="nav-itemx">
          <Link to="/piechart" className="nav-linkx">
            Pie Chart
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
