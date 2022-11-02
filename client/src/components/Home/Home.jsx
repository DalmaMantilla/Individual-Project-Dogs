import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs,
    orderByName,
    filterCreated,
    orderByWeight,
    getTemperaments,
    filterTemperament, }
 from "../../redux/actions";

import Card from '../Card/Card'
import s from "../Home/Home.module.css";
import style from "../Home/Home.module.css";
import { Link } from "react-router-dom";    
import Paginated from "../Paginated/Paginated";


export default function Home() {
    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.dogs)
    //console.log(allDogs, 'ARRAY DE PERROS')
    const allTemperaments = useSelector((state) => state.temperaments);

    //----------------PAGINADO----------------------------------------
    const [order, setOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1);//1
    const [dogsPerPage, setDogsPerPage] = useState(8);//8
    const indexOfLastDog = currentPage * dogsPerPage;//8
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;//0
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);//1-8

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    //---Trae del estado los perros cuando el componente se monte---
    useEffect (() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    },[dispatch]);


    // //------Recargar la pagina--------------------------------
    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
        setCurrentPage(1);
       //setOrder(e.target.value);
    }
    

    //---ORDENAMIENTOS------------------------------------
    //---por nombre--------------
    function handleSort(e){
        e.preventDefault(e);
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }
    //---por peso----------------
    function handleSortWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }


    //---FILTRADOS-------------------------------------
    //---por creacion-----------
    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }
    //---por temperamento-------
    function handleFilterByTemperament(e){
        e.preventDefault();
        dispatch(filterTemperament(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }


    return (
        <div className={s.container}>
            {/*<NavBar/>*/}
            <div className={s.title}>
                <h1>Tienda de los Perritos</h1>
            </div> 
            <div>
                {/*------------------- ORDENAR ALFABETICAMENTE Y PESO-----------------------*/}
                <div className={s.row}>
                    <select className={s.select} onchange={(e) => handleSort(e)}>
                        <option value="" disabled selected>
                            Alphabetical Order
                        </option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>

                    <select className={s.select} onchange={(e) => handleSortWeight(e)}>
                        <option value="" disabled selected>
                            Order by Weight
                        </option>
                        <option value='asc'>Heavier</option>
                        <option value='desc'>Lighter</option>
                    </select>
                </div>
                {/*------------------- FILTRAR-----------------------*/}
                <div className={s.row2}>
                    <select className={s.select} onchange={(e) => handleFilterByTemperament(e)}>
                        <option value="" disabled selected>
                            Filter by Temperament
                        </option>
                        <option value="all">Todos</option>
                        {allTemperaments.map((temp) => (
                            <option key={temp.id} name={temp.name}>{temp.name}</option>   
                        ))}
                    </select>
                    <select className={s.select} onchange={(e) => handleFilterCreated(e)}>
                        <option value="" disabled selected>
                            Filter by Createds
                        </option>
                        <option value="all">All</option>
                        <option value="api">By API</option>
                        <option value="created">By Database</option>
                    </select>
                </div>
                <button className={s.btn} onClick={(e) => handleClick(e)}> 
                    Reload Dogs
                </button>
            </div>         
            <Paginated
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                currentPage={currentPage}
                pagination={pagination}
            />         
            <div className={s.card}>
               <ul className={s.grid}>
                        {" "}
                    {!currentDogs.length > 0 ? (
                    <div className={s.div}>
                    <p className={s.loading}>Loading...</p>
                    <img
                      src={
                        "https://i0.wp.com/thumbs.gfycat.com/ThankfulPlushAtlanticspadefish-max-1mb.gif"
                      }
                    />
                  </div>
                    ) :
                        currentDogs.map((d) => {
                            return (
                                <div className={style.card}>
                                    <Link to={`/home/${d.id}`}>
                                        <Card
                                            className={style.card}
                                            name={d.name}
                                            image={
                                            d.image
                                                ? d.image
                                                : "https://images2-mega.cdn.mdstrm.com/meganoticias/2021/02/16/gen,-el-corgi-de-los-memes_327396_1_602be33018e81.jpg?d=950x535"
                                            }
                                            temperament={d.temperament}
                                            max_weight={d.max_weight}
                                            min_weight={d.min_weight}
                                        />
                                    </Link>
                                </div>
                            );
                        })}
                    </ul>
            </div>
        </div>
    );
}

