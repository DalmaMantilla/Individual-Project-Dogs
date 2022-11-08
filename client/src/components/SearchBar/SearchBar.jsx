import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDogs } from "../../redux/actions/";
import style from '../SearchBar/SearchBar.module.css';


export default function SearchBar() {
const [search, setSearch] = useState('');
let dispatch = useDispatch()


function onSubmit(e) {
    e.preventDefault();
    dispatch(searchDogs(search));
    setSearch('');
}

function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value)
    console.log(search)
}


    return (
        <div className={style.nav}>
            <form 
                className={style.form} 
                onSubmit={onSubmit}
            >
            <input 
                className={style.input} 
                type='text' 
                name='search'
                placeholder='Search dog...' 
                value={search} 
                onChange={onInputChange}
            />
            <input 
                className={style.btn_lupa} 
                type='submit' 
                value='🔍' 
            />
            </form>
        </div>
        
        )
} 


