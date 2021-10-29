import React from 'react';
import s from './UserInfo.module.css';



export const UserInfo: React.FC<any> = ({ userDetails }) => {


    return (
        <div className={s.details}>
            {userDetails && <div className={s.details}>
                <img src={userDetails.avatar_url} alt="" className={s.ava} />
                <div style={{ fontWeight: "bold" }}>{userDetails.name}</div>
                <div>followers: {userDetails.followers}</div>
                <div> go to me : <a href={userDetails.html_url} target="_blank">{userDetails.login}</a></div>
                <div>public repos: {userDetails.public_repos}</div>
                {userDetails.location && <div>location: {userDetails.location}</div>}
            </div>}
        </div>

    );
}


