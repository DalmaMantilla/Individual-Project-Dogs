import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs,
    orderByName,
    filterCreated,                                                                                                              
    orderByWeight,
    getTemperaments,
    filterTemperament, }
 from "../../redux/actions/index";

import Card from '../Card/Card'
import style from "../Home/Home.module.css";
import { Link } from "react-router-dom";    
import Paginated from "../Paginated/Paginated";
import Header from '../Header/Header'



export default function Home() {
    const dispatch = useDispatch();
    const [order, setOrder] = useState("");

    const allDogs = useSelector((state) => state.dogs)
    //console.log(allDogs, 'ARRAY DE PERROS')
    const allTemperaments = useSelector((state) => state.temperaments);

    //----------------PAGINADO----------------------------------------
    
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
        setOrder(e.target.value);
    }
    

    //---ORDENAMIENTOS------------------------------------
    //---por nombre--------------
    function handleSort(e){
        e.preventDefault();
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
        e.preventDefault(e);
        dispatch(filterTemperament(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
        // console.log('me trajo los temmmmmp')
    }


    return (
        <div className={style.container}>
            <Header/>
            <div>
                {/*------------------- ORDENAR ALFABETICAMENTE Y PESO-----------------------*/}
                <div className={style.row}>
                    <select className={style.select} onChange={(e) => handleSort(e)}>
                        <option hidden>
                            Alphabetical Order
                        </option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>

                    <select className={style.select} onChange={(e) => handleSortWeight(e)}>
                        <option hidden>
                            Order by Weight
                        </option>
                        <option value='weightasc'>Heavier</option>
                        <option value='weightdesc'>Lighter</option>
                    </select>
                
                {/*------------------- FILTRAR-----------------------*/}
                {/* <div className={style.row2}> */}
                <div>
                    <select className={style.select} onChange={(e) => handleFilterByTemperament(e)}>
                        <option hidden>
                            Filter by Temperament
                        </option>
                        <option value="all">Todos</option>
                            {allTemperaments.map((temp) => (
                                <option name={temp.name} key={temp.id} >{temp.name}</option>   
                            ))}
                    </select>
                    <select className={style.select} onChange={(e) => handleFilterCreated(e)}>
                        <option hidden>
                            Filter by Createds
                        </option>
                        <option value="all">All</option>
                        <option value="api">By API</option>
                        <option value="created">By Database</option>
                    </select>
                </div>
                </div>
        
                <button className={style.btn_reload} onClick={(e) => handleClick(e)}> 
                    Reload Dogs
                </button>
                </div> 

                <Paginated
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    currentPage={currentPage}
                    pagination={pagination}
                />  

                <div className={style.card}>
                    <ul className={style.grid}>
                        {" "}
                        {!currentDogs.length > 0 ? (
                            <div className={style.div}>
                                <p className={style.loading}>Loading...</p>
                                    <img
                                        src={
                                        "https://i0.wp.com/thumbs.gfycat.com/ThankfulPlushAtlanticspadefish-max-1mb.gif"
                                        }
                                    />
                            </div>
                        ) :
                        currentDogs.map((d) => {
                            return (
                                <div key={d.id} className={style.card}>
                                    <Link to={`/home/${d.id}`}>
                                        <Card
                                            className={style.card}
                                            key={d.id}
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

