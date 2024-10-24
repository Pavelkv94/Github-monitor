import { useEffect, useState } from "react";
import { HeaderUp } from "../Header/Header";
import { UsersTable } from "../UsersTable/UsersTable";
import s from "./Github.module.css";
import { useQuery } from "@tanstack/react-query";
import { SelectedUserType, UserResponseType } from "../../types/input-types";
import { UserProfile } from "../UserInfo/UserProfile";

type GitHubPropsType = {
  setDataIsLoaded: (value: boolean) => void;
};

export function Github({ setDataIsLoaded }: GitHubPropsType) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedLogin, setSelectedLogin] = useState<string | null>(null);

  const {
    data: users,
    error: usersError,
    refetch: getUsers,
  } = useQuery<UserResponseType>({
    queryKey: ["users"],
    queryFn: async (): Promise<UserResponseType> => {
      const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}&per_page=15&page=${page}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setDataIsLoaded(true);
      return await response.json();
    },
    enabled: false,
  });

  const {
    data: currentUser,
    error: userError,
    refetch: getUser,
  } = useQuery<SelectedUserType>({
    queryKey: ["user", selectedLogin],
    queryFn: async (): Promise<SelectedUserType> => {
      const response = await fetch(`https://api.github.com/users/${selectedLogin}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
    enabled: false,
  });

  const handleUserClick = (login: string) => {
    setSelectedLogin(login);
  };

  useEffect(() => {
    if (selectedLogin) {
      getUser();
    }
  }, [getUser, selectedLogin]);

  return (
    <div className={s.container}>
      <HeaderUp setSearchTerm={setSearchTerm} searchTerm={searchTerm} getUsers={getUsers} />
      {users && <UsersTable users={users} page={page} setPage={setPage} getUsers={getUsers} handleUserClick={handleUserClick} />}
      {currentUser && <UserProfile userDetails={currentUser} />}
      {(usersError || userError) && <h2>Something was wrong!</h2>}
    </div>
  );
}
