import { useEffect, useState } from "react";
import { HeaderUp } from "../Header/Header";
import { Repositories } from "../Repositories/Repositories";
import { UserInfo } from "../UserInfo/UserInfo";
import { Users } from "../Users/Users";
import s from "./Github.module.css";

export type SearchUserType = {
  login: string;
  id: number;
};
export type SearchResult = {
  items: SearchUserType[];
};

type UserType = {
  login: string;
  id: number;
  avatar_url: string;
  followers: number;
};

export function Github() {
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
  const [userDetails, setUserDetails] = useState<UserType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (selectedUser) {
      document.title = selectedUser.login;
    }
  }, [selectedUser]);

  // useEffect(() => {
  //   if (!!selectedUser) {
  //     axios
  //       .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
  //       .then((res) => {
  //         setUserDetails(res.data);
  //       });
  //   }
  // }, [selectedUser]);

  return (
    <div className={s.container}>
      <HeaderUp
        setSearchTerm={(value: string) => setSearchTerm(value)}
        value={searchTerm}
      />
      {searchTerm !== "" && (
        <div className={s.main}>
          <Users
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            term={searchTerm}
          />
          <UserInfo userDetails={userDetails} />

          <Repositories
            selectedUser={selectedUser}
            setUserDetails={setUserDetails}
          />
        </div>
      )}
    </div>
  );
}
