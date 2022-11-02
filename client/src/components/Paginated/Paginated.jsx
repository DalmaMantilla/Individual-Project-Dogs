import React from "react";
import style from "../Paginated/Paginated.module.css";

export default function Paginated ({ currentPage, dogsPerPage, allDogs, pagination }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={style.nav}>
      <ul className={style.list}>
        {currentPage > 1 && (
          <li className={style.element}>
            <a
              onClick={() => pagination(currentPage - 1)}
              className={style.number}
            >
              Prev
            </a>
          </li>
        )}
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li
              key={number}
              className={currentPage === number ? style.active : style.element}
            >
              <a
                onClick={() => pagination(number)}
                className={style.number}
              >
                {number}
              </a>
            </li>
          ))}
        {currentPage < allDogs / dogsPerPage && (
          <li className={style.element}>
            <a
              onClick={() => pagination(currentPage + 1)}
              className={style.number}
            >
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};


