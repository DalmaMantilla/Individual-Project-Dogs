import React from "react";
import { NavLink } from "react-router-dom";
import github from "../img/github.png";
import linkedIn from "../img/linkedIn.png";
import style from "../About/About.module.css";

export default function About() {
  return (
    <div className={style.container}>
        <NavLink to="/home">
          <button className={style.btn_home}> Back to home</button>
        </NavLink>
     
        <div className={style.about}>
            <h1 className={style.text}>Hello there!</h1>
            <h3 className={style.text}>
                Im Dalma, a Full Stack Developer! 
                <br />
                DOGS, is an app made as an individual project during the "Soy Henry" course. If you want to know more details visit the readme
                <br />
            </h3>
            <h3 className={style.text}>Let's connect!</h3>
            <div className={style.cont_img}>
            <a href="https://github.com/DalmaMantilla">
            {" "}
                <img
                    className={style.img}
                    id="about"
                    src={github}
                    width="52"
                    height="52"
                    alt="img not found"
                />
            </a>

            <a href="https://www.linkedin.com/in/dalma-mantilla/">
                <img
                    className={style.img}
                    id="linkedin"
                    src={linkedIn}
                    width="100"
                    height="60"
                    alt="img not found"
                />
            </a>
        </div>
      </div>
    </div>
  );
}
