import React from 'react';
import s from '../styles/Card.module.css';



export default function Card({ name, image, temperament, weight_min, weight_max}){
    return (
        <div className={s.container}>
            <h2 className={s.name}>{name}</h2>
            <img className={s.img} src={image} alt="img not found" width="350px" height="300px"/>
            <h4 className={s.temp}>{temperament}</h4>
            <h5 className={s.peso}>{weight_min} - {weight_max} Kilos.</h5>
        </div>
    )
}