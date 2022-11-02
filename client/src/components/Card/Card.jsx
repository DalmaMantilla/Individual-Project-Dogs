// import React from 'react';
// import s from '../Card/Card.module.css';



// export default function Card({ name, image, temperament, weight_min, weight_max}){
//     return (
//         <div className={s.container}>
//             <h2 className={s.name}>{name}</h2>
//             <img className={s.img} src={image} alt="img not found" width="350px" height="300px"/>
//             <h4 className={s.temp}>{temperament}</h4>
//             <h5 className={s.peso}>{weight_min} - {weight_max} Kilos.</h5>
//         </div>
//     )
// }

import React from "react";
import style from "../Card/Card.module.css";
import { Link } from "react-router-dom";
import img from "../../img/dogcreated.png";

export default function Card ({ id, image, name, min_weight, max_weight, temperament }) {
  return (
    <>
    
      <Link className={style.link} to={`/dog/${name}`}>
      <div className={style.container}>
        <div className={style.card} key={id}>
          <div className={style.content}>
            <div className={style.front}>
              <img
                className={style.img}
                src={image ? image : img}
                alt={`dog-${name}`}
              />
              <p className={style.subtitle}>{name}</p>
            </div>
            <div className={style.back}>
              {!temperament ? (
                <p className={style.description}>
                  <b>Temperament:</b> Not found
                </p>
              ) : (
                <p className={style.description}>
                  <b>Temperament:</b> {temperament}
                </p>
              )}
              <p className={style.description2}>
                <b>Min weight:</b> {min_weight} kg
              </p>
              <p className={style.description2}>
                <b>Max weight:</b> {max_weight} kg
              </p>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </>
  );
};


