import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {
  return (
    <nav>
      <ul>
        <li className="todo">
          <Link className="link" to="/todos">
            To-dos
          </Link>
        </li>
        <li className="todo">
          <Link className="link" to="/goals">
            Goals
          </Link>
        </li>
        <li>
          <Link className="link" to="/motivate">
            Motivational quote
          </Link>
        </li>
        <li>
          <Link className="link" to="/signup">
            Sign up
          </Link>
        </li>
        <li>
          <Link className="link" to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link
            className="link"
            onClick={props.removeUserFromState}
            to="/logout"
          >
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
