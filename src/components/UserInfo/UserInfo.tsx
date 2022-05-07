import React from "react";
import s from "./UserInfo.module.css";
import Tilt from "react-parallax-tilt";

export const UserInfo: React.FC<any> = ({ userDetails }) => {
  return (
    <div className={s.details}>
      {userDetails && (
        <div className={s.details}>
          <Tilt flipHorizontally>
            <img src={userDetails.avatar_url} alt="" className={s.ava} />
          </Tilt>
          <br />
          <div className={s.name}>{userDetails.name}</div>
          <br />
          <div className={s.description}>
            <p>followers: {userDetails.followers}</p>
            <p>
              go to me: 
              <a href={userDetails.html_url} target="_blank">
                {userDetails.login}
              </a>
            </p>
            <p> public repos: {userDetails.public_repos}</p>
            {userDetails.location && <p>location: {userDetails.location}</p>}
          </div>
        
        </div>
      )}
    </div>
  );
};
