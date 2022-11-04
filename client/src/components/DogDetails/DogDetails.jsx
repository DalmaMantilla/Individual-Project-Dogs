import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClean, getDetail } from "../../redux/actions";
import { useEffect } from "react";
import style from "../DogDetails/DogDetails.module.css";

export default function DogDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const myDog = useSelector((state) => state.detail);
 
  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(getClean());
    }
  }, [dispatch, id]);
  

  return (
    <div className={style.container}>
      <Link to="/home">
        <button className={style.btn_home}>Back to Home</button>
      </Link>
      <Link to="/createDog">
        <button className={style.btn_createDog}>Create Dog</button>
      </Link>
      {myDog.length > 0 ? (
        <div className={style.card}>
          <div className={style.edit}>
            <div>
              {myDog[0].createdInDb ? (
                <Link to="/delete/:id">
                  <button className={style.btn_delete}>Delete!</button>
                </Link>
              ) : null}
            </div>
            <div>
              {myDog[0].createdInDb ? (
                <Link to="/edit/:id">
                  <button className={style.bn}>Edit!</button>
                </Link>
              ) : null}
            </div>
          </div>
          <h1 className={style.title}>{myDog[0].name}</h1>
          <img
            className={style.img}
            alt="img not found"
            src={
              myDog[0].image
                ? myDog[0].image
                : "https://pm1.narvii.com/6893/724dede9a107e0d420269799b4efe8be26a88df9r1-842-1024v2_00.jpg"
            }
          />
          <p className={style.text}>
            {!myDog[0].life_time_max
              ? `♥ Their life span is approximately → [ ${myDog[0].life_span} ]`
              : ``}{" "}
            <br />
            ♥ Their temperaments are{" "}
            → [ {!myDog[0].createdInDb
              ? myDog[0].temperament + " "
              : myDog[0].temperaments.map((el) => el.name + ", ")} ]
             <br />
            {!myDog[0].height_max
              ? ` ♥ These dogs can measure up to → [ ${myDog[0].min_height} cm ] approximately`
              : ` ♥ These dogs can measure between ${myDog[0].min_height} and ${myDog[0].max_height_max} cm.`}{" "}
            <br />
            and weight between → [ {myDog[0].min_weight} and {myDog[0].max_weight}{" "} kg ]
         
          </p>
        </div>
      ) : (
        <div>
          <p className={style.loading}>Loading...</p>
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
