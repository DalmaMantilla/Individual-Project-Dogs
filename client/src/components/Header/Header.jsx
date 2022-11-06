import React from "react";
import { NavLink } from "react-router-dom";
import s from "../Header/Header.module.css";
import  SearchBar  from "../SearchBar/SearchBar";
import home from "../../img/home.png";

export default function Header() {
  return (
    <header>
      <div className={s.header}>
        <NavLink to="/">
          <p className={s.text}>Inicio</p>
        </NavLink>
        <NavLink to="/">
          <p className={s.text}>Home</p>
        </NavLink>
        <NavLink to="/post">
          <p className={s.text}>Create Dog</p>
        </NavLink>

        <NavLink to="/about">
          <p className={s.text}>About</p>
        </NavLink>

        <SearchBar></SearchBar>
      </div>
    </header>
  );
}
