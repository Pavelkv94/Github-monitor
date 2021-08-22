import axios from 'axios';
import React, { useEffect, useState } from 'react';
import s from './Repositories.module.css';



export const Repositories: React.FC<any> = ({ selectedUser, setUserDetails }) => {

    const [repo, setRepo] = useState<any[] | null>(null)

    useEffect(() => {
        if (!!selectedUser) {
            axios.get<any>(`https://api.github.com/users/${selectedUser.login}/repos`)
                .then(res => {
                    setRepo(res.data)
                })
        }
    }, [selectedUser])

    return (<div className={s.header}>
        {repo?.map((u: any) => <div>{u.name} <hr /></div>)}

    </div>);
}


