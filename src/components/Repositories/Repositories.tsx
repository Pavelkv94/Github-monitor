import React from "react";
import s from "./Repositories.module.css";
import { RepoType } from "../../types/input-types";
import Repo from "./Repo/Repo";
import Paginator from "../Paginator/Paginator";

type RepositoriesPropsType = {
  data: RepoType[];
  page: number;
  setPage: (value: number) => void;
  getRepos: () => void;
  total: number;
};
export const Repositories: React.FC<RepositoriesPropsType> = ({ data, page, setPage, total }) => {
  const totalPages = Math.ceil(total / 30);

  return (
    <div className={s.reposWrapper}>
      <h2>REPOSITORIES LIST:</h2>
      <Paginator page={page} totalPages={totalPages} setPage={setPage} />
      <div className={s.repos}>
        {data.map((r: RepoType, i) => (
          <Repo repo={r} key={i} index={(page - 1) * 30 + i + 1} />
        ))}
      </div>
    </div>
  );
};
