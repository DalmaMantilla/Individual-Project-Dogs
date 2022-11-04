import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClean, getDetail } from "../../redux/actions";
import { useEffect } from "react";
import s from "../DogDetails/DogDetails.module.css";

export default function DogDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const myDog = useSelector((state) => state.detail);
  console.log('Me trae el id ->',id)
  console.log('y estoooo?',myDog);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(getClean());
    }
  }, [dispatch, id]);
  

  return (
    <div className={s.contiener}>
      <Link to="/home">
        <button className={s.btn}>Back to Home</button>
      </Link>

      {myDog.length > 0 ? (
        <div className={s.card}>
          <div className={s.edit}>
            <div>
              {myDog[0].userCreated ? (
                <Link to="/delete/:id">
                  <button className={s.bn}>Delete!</button>
                </Link>
              ) : null}
            </div>
            <div>
              {myDog[0].userCreated ? (
                <Link to="/edit/:id">
                  <button className={s.bn}>Edit!</button>
                </Link>
              ) : null}
            </div>
          </div>
          <h1 className={s.title}>{myDog[0].name}</h1>
          <img
            className={s.img}
            alt="img not found"
            src={
              myDog[0].image
                ? myDog[0].image
                : "https://pm1.narvii.com/6893/724dede9a107e0d420269799b4efe8be26a88df9r1-842-1024v2_00.jpg"
            }
          />
          <p className={s.text}>
            {!myDog[0].life_time_max
              ? `Their life span is approximately ${myDog[0].life_time_min}.`
              : `Their life span is between ${myDog[0].life_time_min} and ${myDog[0].life_time_max} years.`}{" "}
            <br />
            Their temperaments are{" "}
            {!myDog[0].userCreated
              ? myDog[0].temperament + " "
              : myDog[0].temperaments.map((el) => el.name + ", ")}
            . <br />
            {!myDog[0].height_max
              ? `These dogs can measure up to ${myDog[0].min_height} cm approximately`
              : `These dogs can measure between ${myDog[0].min_height} and ${myDog[0].max_height_max} cm.`}{" "}
            <br />
            and weight between {myDog[0].min_weight} and {myDog[0].max_weight}{" "}
            kg.
          </p>
        </div>
      ) : (
        <div>
          <p className={s.loading}>Loading...</p>
          <img
            src={
              "https://i0.wp.com/thumbs.gfycat.com/ThankfulPlushAtlanticspadefish-max-1mb.gif"
            }
          />
        </div>
      )}
    </div>
  );
}
