import React from "react";
import s from "./UsersTable.module.css";
import { UserResponseType } from "../../types/input-types";
import UsersCell from "./UsersCell/UsersCell";
import Paginator from "../Paginator/Paginator";

type UsersTablePropsType = {
  users: UserResponseType;
  page: number;
  setPage: (page: number) => void;
  getUsers: () => void;
  handleUserClick: (login: string) => void;
};

export const UsersTable: React.FC<UsersTablePropsType> = ({ users, page, setPage, handleUserClick }) => {
  const totalPages = Math.ceil(users.total_count / 15);

  return users.total_count !== 0 ? (
    <>
      <div className={s.usersList}>
        {users.items.map((user, i) => (
          <UsersCell key={i} user={user} handleUserClick={handleUserClick} />
        ))}
      </div>
      <Paginator page={page} totalPages={totalPages} setPage={setPage} />
    </>
  ) : (
    <p className={s.noSearch}>No search results.</p>
  );
};
