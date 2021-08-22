import axios from 'axios';
import React, { useEffect, useState } from 'react';
import s from './Header.module.css';



export const Header: React.FC<any> = ({ value, setSearchTerm }) => {
    const [tempSearch, setTempSearch] = useState<string>(value)


    useEffect(() => {
        setTempSearch(value)
    }, [value])

    return (<div className={s.header}>
        <div className={s.logo}></div>
        <input
            type="text"
            placeholder="search"
            value={tempSearch}
            onChange={(e) => { setTempSearch(e.currentTarget.value) }}
        />
        <button
            onClick={() => {
                setSearchTerm(tempSearch)
            }}
        >
            Find
        </button>

    </div>);
}


