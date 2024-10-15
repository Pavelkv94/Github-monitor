import React, { useEffect, useState } from "react";
import s from "./Header.module.css";
import searchIcon from "../../assets/search.svg";

type HeaderPropsType = {
  value: string;
  setSearchTerm: (value: string) => void;
};

export const HeaderUp: React.FC<HeaderPropsType> = ({ value, setSearchTerm }) => {
  const [tempSearch, setTempSearch] = useState<string>(value);

  useEffect(() => {
    setTempSearch(value);
  }, [value]);

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
            value={tempSearch}
            onChange={(e) => {
              setTempSearch(e.currentTarget.value);
            }}
          />
          <div
            className={s.searchBtn}
            onClick={() => {
              setSearchTerm(tempSearch);
            }}
          >
            <img src={searchIcon} width={26} />
          </div>
        </div>
      </div>
    </div>
  );
};
