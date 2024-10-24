import React from "react";
import s from "./Header.module.css";
import searchIcon from "../../assets/search.svg";

type HeaderPropsType = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  getUsers: () => void;
};

export const HeaderUp: React.FC<HeaderPropsType> = ({ searchTerm, setSearchTerm, getUsers }) => {
  return (
    <div className={s.header}>
      <div className={s.searchContent}>
        <a href="https://github.com/" target="blank">
          <div className={s.logo}></div>
        </a>
        <div className={s.searchWrapper}>
          <input
            className={s.search}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchTerm.length > 2) {
                getUsers();
              }
            }}
          />
          <div
            className={s.searchBtn}
            onClick={() => {
              if (searchTerm.length > 2) {
                getUsers();
              }
            }}
          >
            <img src={searchIcon} width={26} />
          </div>
        </div>
      </div>
    </div>
  );
};
