import { useEffect, useState } from "react";
import { HeaderUp } from "../Header/Header";
import { UsersTable } from "../UsersTable/UsersTable";
import s from "./Github.module.css";
import { useQuery } from "@tanstack/react-query";
import { UserResponseType } from "../../types/input-types";

type GitHubPropsType = {
  setDataIsLoaded: (value: boolean) => void;
};

export function Github({ setDataIsLoaded }: GitHubPropsType) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const {
    data: users,
    error,
    isLoading,
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

  // useEffect(() => {
  //   searchTerm.length > 2 && getUsers();
  // }, [page, searchTerm]);

  return (
    <div className={s.container}>
      <HeaderUp setSearchTerm={setSearchTerm} searchTerm={searchTerm} getUsers={getUsers} />
      {users && <UsersTable users={users} page={page} setPage={setPage} getUsers={getUsers} />}
    </div>
  );
}
