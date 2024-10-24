import React from "react";
import s from "./Repositories.module.css";
import { RepoType } from "../../types/input-types";
import Repo from "./Repo/Repo";

type RepositoriesPropsType = {
  data: RepoType[];
};
export const Repositories: React.FC<RepositoriesPropsType> = ({ data }) => {
  return (
    <div className={s.reposWrapper}>
      <h2>REPOSITORIES LIST:</h2>

      <div className={s.repos}>
        {data.map((r: RepoType, i) => (
          <Repo repo={r} key={i} index={i + 1}/>
        ))}
      </div>
    </div>
  );
};
