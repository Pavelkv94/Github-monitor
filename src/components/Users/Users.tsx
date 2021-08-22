import axios from 'axios';
import React from 'react';
import s from './Users.module.css';



export const Users: React.FC<any> = ({ users, selectedUser, setSelectedUser }) => {


    return (
        <div className={s.usersList}>
            <ul>
                {users.map((u:any) =>
                    <li key={u.id}
                        onClick={() => {
                            setSelectedUser(u);
                        }}
                        className={selectedUser === u ? s.selected : ""}

                    >{u.login}</li>)
                }
            </ul>
        </div>
    );
}


