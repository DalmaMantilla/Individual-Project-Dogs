import React from "react";
import style from "../DogCard/DogCard.module.css";


export default function DogCard ({ id, image, name, min_weight, max_weight, temperament }) {
 console.log('Temperamentos q recibe la card', temperament)
  return (
    <> 
        <div className={style.container}>
          <div className={style.card} key={id}>
            <div className={style.content}>
              <div className={style.front}>
                <img
                  className={style.img}
                  src={image}
                  alt={`dogs-${name}`}
                />
                <p className={style.subtitle}>{name}</p>
              </div>
              <div className={style.back}>
                {!temperament? (
                  <p className={style.description}>
                    {/* <b>Temperament:</b> Not found */}
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
  </>
  );
};


