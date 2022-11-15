import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";


export default function LandingPage(){
  return (
    <>
      <div className={style.bg_container}>
          <section className={style.section}>
            <h1 className={style.title}>WELCOME</h1>
            <h1 className={style.title}>TO </h1>
            <h1 className={style.title}>PET SHOP</h1>
            <h1 className={style.title}>THE PARADISE OF DOGS</h1>
            <Link to={"/home"} className={style.buttonlink}>
              <button data-text="Awesome" className={style.button}>
                <span className={style.actual_text}>&nbsp;HOME&nbsp;</span>
                <span className={style.hover_text_button} aria-hidden="true">
                  &nbsp;HOME&nbsp;
                </span>
              </button>
            </Link>
          </section>
      </div>
    </>
  );
}