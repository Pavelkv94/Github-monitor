import axios from 'axios';
import React, { useEffect, useState } from 'react';
import s from './Github.module.css';

type SearchUserType = {
    login: string
    id: number
}
type SearchResult = {
    items: SearchUserType[]
}

export function Github() {
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [users, setUsers] = useState<SearchUserType[]>([])
    const [tempSearch, setTempSearch] = useState<string>("")

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    useEffect(() => {
        axios.get<SearchResult>('https://api.github.com/search/users?q=')
            .then(res => {
                setUsers(res.data.items)
            })
    }, [])

    return (<div className={s.container}>
        <div className={s.searchContainer}>
            <div>
                <input
                 type="text" 
                placeholder="search" 
                value={tempSearch} 
                onChange={(e)=>{setTempSearch(e.currentTarget.value)}}
                /> 
                <button
                onClick={()=>{
                    axios.get<SearchResult>('https://api.github.com/search/users?q=' + tempSearch)
                    .then(res => {
                        setUsers(res.data.items)
                    })
                }}
                >
                    Find
                    </button>
            </div>
            <div>
                <ul>
                    {users.map(u =>
                        <li key={u.id}
                            onClick={() => {
                                setSelectedUser(u);
                                //document.title = u
                            }}
                            className={selectedUser === u ? s.selected : ""}

                        >{u.login}</li>)
                    }
                </ul>
            </div>
        </div>
        <div className={s.results}>
            <h2>Username</h2>
            <div>Details</div>
        </div>
    </div>);
}


