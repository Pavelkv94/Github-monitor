import React from "react";
import s from "./UserProfile.module.css";
import Tilt from "react-parallax-tilt";
import { RepoType, SelectedUserType } from "../../types/input-types";
import { useQuery } from "@tanstack/react-query";
import { Repositories } from "../Repositories/Repositories";

type UserProfilePropsType = {
  userDetails: SelectedUserType;
};

export const UserProfile: React.FC<UserProfilePropsType> = ({ userDetails }) => {
  const names = [userDetails.name, userDetails.login].filter((user) => !!user);

  const {
    data: repos,
    error: reposError,
    refetch: getRepos,
  } = useQuery<RepoType[]>({
    queryKey: ["repos", userDetails.login],
    queryFn: async (): Promise<RepoType[]> => {
      const response = await fetch(`https://api.github.com/users/${userDetails.login}/repos`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
    enabled: false,
  });

  return (
    <div className={s.details}>
      <div className={s.profile}>
        <Tilt flipHorizontally>
          <img src={userDetails.avatar_url} alt="" className={s.ava} />
        </Tilt>
        <div className={s.userInfo}>
          <h2>
            {userDetails.name} {names.length > 1 && "/"} {userDetails.login}
          </h2>
          <p>Followers: {userDetails.followers}</p>
          <p>
            Go to my profile:{" "}
            <a href={userDetails.html_url} target="_blank">
              {userDetails.login}
            </a>
          </p>
          {userDetails.location && <p>location: {userDetails.location}</p>}
          {userDetails.bio && <p>Bio: {userDetails.bio}</p>}
          <div className={s.showRepos}>
            <p>Public repos: {userDetails.public_repos}</p>
            <button onClick={() => getRepos()}>Show</button>
          </div>
        </div>
      </div>
      {reposError && <h2>Something was wrong!</h2>}
      {repos && <Repositories data={repos} />}
    </div>
  );
};
