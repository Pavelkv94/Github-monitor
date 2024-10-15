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
};

export const UsersTable: React.FC<UsersTablePropsType> = ({ users, page, setPage, getUsers }) => {
  // const [users, setUsers] = useState<SearchUserType[]>([])
  // const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);

  // const [userDetails, setUserDetails] = useState<UserType | null>(null);

  // useEffect(() => {
  //     axios.get<SearchResult>(`https://api.github.com/search/users?q=${term}`)
  //         .then(res => {
  //             setUsers(res.data.items)
  //         })
  // }, [term])

  // useEffect(() => {
  //   if (!!selectedUser) {
  //     axios
  //       .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
  //       .then((res) => {
  //         setUserDetails(res.data);
  //       });
  //   }
  // }, [selectedUser]);

  return users.total_count !== 0 ? (
    <>
      <div className={s.usersList}>
        {users.items.map((user, i) => (
          <UsersCell key={i} user={user} />
        ))}
      </div>
      <Paginator page={page} totalCount={users.total_count} setPage={setPage} getUsers={getUsers} />
    </>
  ) : (
    <p className={s.noSearch}>No search results.</p>
  );
};
