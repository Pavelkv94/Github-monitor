import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SearchResult, SearchUserType } from '../Github/Github';
import s from './Users.module.css';



export const Users: React.FC<any> = ({ term, selectedUser, setSelectedUser }) => {
    const [users, setUsers] = useState<SearchUserType[]>([])

    useEffect(() => {
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [term])

    return (
        <div className={s.usersList}>
            <ul>
                {users.map((u: any) =>
                    <li key={u.id}
                        onClick={() => {
                            setSelectedUser(u);
                        }}
                        className={`${selectedUser === u ? s.selected : ""} ${s.item}`}

                    >{u.login}</li>)
                }
            </ul>
        </div>
    );
}


