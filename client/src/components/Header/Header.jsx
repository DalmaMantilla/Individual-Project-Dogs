import React from "react";
import { NavLink } from "react-router-dom";
import s from '../Header/Header.module.css';
// import SearchBar from "./searchBar";
import home from "../../img/error.png";

export default function NavBar() {
  return (
    <header>
      <div className={s.navbar}>
        <NavLink to="/">
          <img className={s.img}
            src={home}
            id="landingpage"
            width="50"
            height="50"
            alt="img not found"
          />
        </NavLink>
        <NavLink to="/home">
          <p className={s.text}>Home</p>
        </NavLink>
        <NavLink to="/post">
          <p className={s.text}>Create your dog</p>
        </NavLink>

        <NavLink to="/about">
          <p className={s.text}>About</p>
        </NavLink>

        {/* <SearchBar></SearchBar> */}
      </div>
    </header>
  );
}
