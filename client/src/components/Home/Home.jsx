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

import DogCard from '../DogCard/DogCard'
import style from "../Home/Home.module.css";
import { Link } from "react-router-dom";    
import Paginated from "../Paginated/Paginated";
import Header from '../Header/Header'
import Filters from "../Filters/Filters";



export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)
   
    
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

    //---ORDENAMIENTOS------------------------------------
    //---por nombre--------------
    function handleOrderAlphabetically(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`); 
    }
    //---por peso----------------
    function handleOrderByWeight(e){
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
    function handleTemperamentFilter(e){
        e.preventDefault(e);
        dispatch(filterTemperament(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
        // console.log('me trajo los temmmmmp')
    }

    return (
        <div className={style.container}>
            <Header/>
            <Filters
                handleOrderAlphabetically={handleOrderAlphabetically}
                handleOrderByWeight={handleOrderByWeight}
                handleTemperamentFilter={handleTemperamentFilter}
                handleFilterCreated={handleFilterCreated}
            />
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
                        <div className={style.div_loading}>
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
                                        <DogCard
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

