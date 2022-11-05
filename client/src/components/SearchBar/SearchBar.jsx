import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDogs } from "../../redux/actions/";
import s from '../SearchBar/SearchBar.module.css';


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
        <div className={s.nav}>
            <form className={s.form} onSubmit={onSubmit}>
            <input className={s.input} type='text' placeholder="Search dog..." value={search} onChange={onInputChange}></input>
            <input className={s.btn} type='submit' value='🔍'></input>
            </form>
        </div>
    )
} 