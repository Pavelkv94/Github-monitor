import axios from 'axios';
import React from 'react';
import s from './UserInfo.module.css';



export const UserInfo: React.FC<any> = ({ userDetails }) => {


    return (
        <div className={s.details}>Details
            <br />
            {userDetails && <div>

                <img src={userDetails.avatar_url} alt="" className={s.ava} />

                <br />
                {userDetails.login}, followers: {userDetails.followers}
            </div>}
        </div>

    );
}


