import React from "react";
import { NavLink } from "react-router-dom";
import style from "../Header/Header.module.css";
import  SearchBar  from "../SearchBar/SearchBar";


export default function Header() {
  return (
    <header>
      <div className={style.header}>
        <NavLink to="/">
          <p className={style.text}>Inicio</p>
        </NavLink>
        <NavLink to="/home">
          <p className={style.text}>Home</p>
        </NavLink>
        <NavLink to="/createDog">
          <p className={style.text}>Create Dog</p>
        </NavLink>

        <NavLink to="/about">
          <p className={style.text}>About</p>
        </NavLink>

        <SearchBar/>
      </div>
    </header>
  );
}
