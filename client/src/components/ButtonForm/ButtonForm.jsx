import React from "react";
import style from "../ButtonForm/ButtonForm.module.css";

export default function ButtonForm ({ text, onClick, type }) {
  return (
    <>
      <button className={style.button} type={type} onClick={onClick}>
        <span>{text}</span>
      </button>
    </>
  );
};


