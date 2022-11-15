import React from "react";
import style from "../SelectTemperamentsForm/SelectTemperamentsForm.module.css";

export default function SelectTemperamentsForm({
  temperament,
  tempsSelected,
  handleAddTemp,
  handleRemove,
}) {
  console.log('Temperamentos seleccionados', tempsSelected)
  console.log('Temperamentos traidos del estado', temperament)
  console.log('Temperamentos agregados pára mostrar',handleAddTemp)
  
  return (
    <>
      <div>
        <label htmlFor="temperament">Temperaments: </label>
        <select className={style.input} name="temperament" onChange={handleAddTemp}>
          <option value="all">All</option>
          {temperament.length > 0 &&
            temperament.map((temp) => (
              <option value={temp.name} key={temp.id} >
                {temp.name}
              </option>
            ))}
        </select>
      </div>
      {tempsSelected.length > 0 && (
        <div className={style.temperaments}>
          {tempsSelected && tempsSelected.map((t) => (
            <span key={t} value={t} className={style.selected}>
              {t}
              <span
                className={style.x}
                id={`${t}`}
                onClick={handleRemove}
                title={"Remover"}
              >
                x
              </span>
            </span>
          ))}
        </div>
      )}
    </>
  );
};


