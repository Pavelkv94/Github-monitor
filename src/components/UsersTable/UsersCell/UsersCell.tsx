import { UserType } from "../../../types/input-types";
import s from "./UsersCell.module.css";

type UserRowType = {
  user: UserType;
  handleUserClick: (login:string) => void
};
const UsersCell = ({ user, handleUserClick }: UserRowType) => {
  return <div className={s.userCell} onClick={() => handleUserClick(user.login)}>{user.login}</div>;
};

export default UsersCell;
