import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Repositories } from '../Repositories/Repositories';
import { UserInfo } from '../UserInfo/UserInfo';
import { Users } from '../Users/Users';
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
        <Header tempSearch={tempSearch} setTempSearch={setTempSearch} setSearchTerm={setSearchTerm} />
        <div className={s.main}>
            <Users users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <UserInfo userDetails={userDetails} />
            <Repositories />
        </div>

    </div>);
}


