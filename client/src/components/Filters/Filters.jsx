import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions"
import style from "../Filters/Filters.module.css";

export default function Filters ({
  handleOrderAlphabetically,
  handleOrderByWeight,
  handleTemperamentFilter,
  handleFilterCreated,
}) {

const allTemperaments = useSelector((state) => state.temperaments);
const dispatch = useDispatch();
  

 //-----Recargar la pagina--------------------------------
function handleClick(e) {
  e.preventDefault();
  dispatch(getDogs());
  // setCurrentPage(1);
  // setOrder(e.target.value);
}


  return (
    <>
      <div>
        {/*------------------- ORDENAR ALFABETICAMENTE Y PESO-----------------------*/}
        <div className={style.row}>
          <select 
            className={style.select} 
            onChange={(e) => handleOrderAlphabetically(e)}
            name="Order alphabetically"
          >
            <option hidden disabled selected>Order alphabetically</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <select 
            className={style.select} 
            onChange={(e) => handleOrderByWeight(e)}
            name="Order by weight"
          >
            <option hidden disabled selected>Order by Weight</option>
            <option value='min weight'>Min weight</option>
            <option value='max weight'>Max weight</option>
          </select>
                
          {/*------------------- FILTRAR-----------------------*/}
          {/* <div className={style.row2}> */}
          <div>
            <select 
              className={style.select} 
              onChange={(e) => handleTemperamentFilter(e)}
              name="Temperament filter"
            >       
              <option hidden disabled selected>Filter by Temperament</option>
              <option value="all">Todos</option>
                {allTemperaments.length > 0 && 
                  allTemperaments.map((temp) => (
              <option 
                value={temp.name} 
                key={temp.id} 
              >
                {temp.name}
              </option>   
              ))}
            </select>

            <select 
              className={style.select} 
              onChange={(e) => handleFilterCreated(e)}
              name="Origin filter"
            >
              <option hidden disabled selected>Filter by Created</option>
                <option value="all">All</option>
                <option value="api">By API</option>
                <option value="created">By Database</option>
              </select>
          </div>
        </div>
        
        <button 
          className={style.btn_reload} 
          onClick={(e) => handleClick(e)}
        > 
          Reload Dogs
        </button>
      </div>  
    </>
  );
};


