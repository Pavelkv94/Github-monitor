import React, { useEffect, useState } from "react";
import s from "./UserProfile.module.css";
import Tilt from "react-parallax-tilt";
import { RepoType, SelectedUserType } from "../../types/input-types";
import { useQuery } from "@tanstack/react-query";
import { Repositories } from "../Repositories/Repositories";

type UserProfilePropsType = {
  userDetails: SelectedUserType;
  openRepo: boolean;
  setOpenRepo: (value: boolean) => void;
};

export const UserProfile: React.FC<UserProfilePropsType> = ({ userDetails, openRepo, setOpenRepo }) => {
  const names = [userDetails.name, userDetails.login].filter((user) => !!user);
  const [page, setPage] = useState<number>(1);

  const {
    data: repos,
    error: reposError,
    refetch: getRepos,
  } = useQuery<RepoType[]>({
    queryKey: ["repos", userDetails.login, page],
    queryFn: async (): Promise<RepoType[]> => {
      const response = await fetch(`https://api.github.com/users/${userDetails.login}/repos?per_page=30&page=${page}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
    enabled: false,
  });

  useEffect(() => {
    if (openRepo) getRepos();
  }, [page, openRepo]);

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
            {userDetails.public_repos > 0 && (
              <button
                onClick={() => {
                  setOpenRepo(true);
                  getRepos();
                }}
              >
                Show
              </button>
            )}
          </div>
        </div>
      </div>
      {reposError && <h2 className="wrong">Something was wrong!</h2>}
      {openRepo && <Repositories data={repos || []} page={page} setPage={setPage} getRepos={getRepos} total={userDetails.public_repos} />}
    </div>
  );
};
