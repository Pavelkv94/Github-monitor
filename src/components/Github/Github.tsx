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

type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}

export function Github() {
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [userDetails, setUserDetails] = useState<UserType | null>(null)
    const [users, setUsers] = useState<SearchUserType[]>([])
    const [tempSearch, setTempSearch] = useState<string>("")
    const [searchTerm, setSearchTerm] = useState<string>("")

    const fetchData = (value: string) => {
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${value}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    useEffect(() => {
        fetchData(tempSearch)
    }, [searchTerm])

    useEffect(() => {
        if (!!selectedUser) {
            axios.get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setUserDetails(res.data)
                })
        }
    }, [selectedUser])

    return (<div className={s.container}>
        <div className={s.searchContainer}>
            <div>
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
            <div>Details
                <br />
                {userDetails && <div>
                    <img src={userDetails.avatar_url} alt="" />
                    <br />
                    {userDetails.login}, followers: {userDetails.followers}
                    </div>}
            </div>

        </div>
    </div>);
}


