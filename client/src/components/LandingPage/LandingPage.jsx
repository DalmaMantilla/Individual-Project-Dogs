import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";


export default function LandingPage(){
  return (
    <>
      <div className={style.background}>
        <div className={style.container}>
          <section className={style.section}>
            <h1 className={style.title}>WELCOME</h1>
            <h1 className={style.title}>TO MY</h1>
            <h1 className={style.title}>INDIVIDUAL PROJECT</h1>
            <h1 className={style.title}>DOGS</h1>
            <Link to={"/home"} className={style.buttonlink}>
              <button data-text="Awesome" className={style.button}>
                <span className={style.actual_text}>&nbsp;HOME&nbsp;</span>
                <span className={style.hover_text} aria-hidden="true">
                  &nbsp;HOME&nbsp;
                </span>
              </button>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}