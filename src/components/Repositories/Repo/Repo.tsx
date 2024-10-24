import s from "./Repo.module.css";
import { RepoType } from "../../../types/input-types";

type RepoPropsType = {
  repo: RepoType;
  index: number;
};
const Repo = ({ repo, index }: RepoPropsType) => {
  return (
    <div className={s.repo}>
      <div className={s.firstRow}>
        <p>{index}.</p>
        <a href={repo.html_url} target="_blank">
          {repo.name}
        </a>
      </div>
      <span>{repo.description}</span>
      <p>Forked: {repo.fork ? "yes" : "no"}</p>
      <span>
        <b>{repo.language} </b> / Updated - {repo.updated_at.split("T").join(" ").slice(0, -1)}
      </span>

      <hr />
    </div>
  );
};

export default Repo;
