// import React from "react";
// import { Link } from "react-router-dom";
// import style from "../Header/Header.module.css";

// const Header = () => {

//   return (
//     <>
//       <header className={style.header}>
//         <button className={style.button}>
//           <Link to={"/home"}>
//             <span className={style.box}>HOME</span>
//           </Link>
//         </button>
//         <button className={style.button}>
//           <Link to={"/createDog"}>
//             <span className={style.box}>CREATE DOG</span>
//           </Link>
//         </button>
//       </header>
//     </>
//   );
// };

// export default Header;


import React from "react";
import { NavLink } from "react-router-dom";
import s from '../Header/Header.module.css';
// import SearchBar from "./searchBar";
import home from "../../img/error.png";

export default function NavBar() {
  return (
    <header>
      <div className={s.navbar}>
        <NavLink to="/">
          <img className={s.img}
            src={home}
            id="landingpage"
            width="50"
            height="50"
            alt="img not found"
          />
        </NavLink>
        <NavLink to="/home">
          <p className={s.text}>Home</p>
        </NavLink>
        <NavLink to="/post">
          <p className={s.text}>Create your dog</p>
        </NavLink>

        <NavLink to="/about">
          <p className={s.text}>About</p>
        </NavLink>

        {/* <SearchBar></SearchBar> */}
      </div>
    </header>
  );
}
