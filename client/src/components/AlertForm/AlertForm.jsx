import React from "react";
import ButtonForm from "../ButtonForm/ButtonForm";
import warning from "../../img/error.png";
import check from "../../img/check.png";
import style from "../AlertForm/AlertForm.module.css";

export default function AlertForm ({ input, onClose }) {
  const { text, error, success } = input;

  return (
    <>
      <section className={style.bg_negro}>
        <div className={style.container}>
          {error && <img src={warning} alt="" width="80px"/>}
          {success && <img src={check} alt="" width="80px"/>}
          <p>{text}</p>
          <ButtonForm text={"OK"} onClick={onClose} />
        </div>
      </section>
    </>
  );
};


