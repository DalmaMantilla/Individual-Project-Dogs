import React from "react";
import { NavLink } from "react-router-dom";
import github from "../../img/github.png";
import linkedIn from "../../img/linkedIn.png";
import style from "../About/About.module.css";

export default function About() {
  return (
    <div className={style.container}>
        <NavLink to="/home">
          <button className={style.btn_home}> Back to home</button>
        </NavLink>
     
        <div className={style.about}>
            <h3 className={style.text}>
              Welcome!
              <br/>
              Here at Dogs, we make sure you know everything about your pup. We are 
              experts in taking care of your dog, obtaining the data you need and 
              presenting it to you in the best possible way. In a simple way, we allow you
              to filter, sort and even randomize your search for it. Do you think we are
              missing a breed? You can send it! We are proud to provide a reliable database to users.
              <br/>
              Let's connect!
            </h3>
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
