import React from "react";
import style from "../DoubleInput/DoubleInput.module.css";

export default function DoubleInput ({ value, setState, label }) {
  return (
    <>
      <label>{label}: </label>
      <div>
        <input
          className={style.input}
          type="number"
          name="min"
          placeholder="Min"
          min={1}
          value={value.min}
          autoComplete={"off"}
          required
          onChange={(e) => setState({ ...value, min: e.target.value })}
        />{" "}
        -{" "}
        <input
          className={style.input}
          type="number"
          name="max"
          placeholder="Max"
          min={1}
          value={value.max}
          autoComplete={"off"}
          required
          onChange={(e) => setState({ ...value, max: e.target.value })}
        />
      </div>
    </>
  );
};


