import React from 'react';
import s from './Github.module.css';

export function Github() {
    return (<div className={s.container}>
        <div className={s.searchContainer}>
            <div>
                <input type="text" placeholder="search" /> <button>Find</button>
            </div>
            <div>
                <ul>
                    {['Anna', 'Artem'].map(u => <li>{u}</li>)}
                </ul>
            </div>
        </div>
        <div className={s.results}>
            <h2>Username</h2>
            <div>Details</div>
        </div>
    </div>);
}


