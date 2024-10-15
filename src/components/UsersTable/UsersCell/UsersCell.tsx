import { UserType } from "../../../types/input-types";
import s from "./UsersCell.module.css";

type UserRowType = {
  user: UserType;
};
const UsersCell = ({ user }: UserRowType) => {
  return <div className={s.userCell}>{user.login}</div>;
};

export default UsersCell;
