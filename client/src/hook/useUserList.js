import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export const useUserList = () => {
  const { users, totalCount, loadUsers, handleDeleteUser } =
    useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, _setPageSize] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: totalCount,
    onChange: (page, _pageSize) => setCurrentPage(page),
  };

  useEffect(() => {
    loadUsers(currentPage, pageSize, searchQuery);
  }, [currentPage, searchQuery]);

  return {
    users,
    handleDeleteUser,
    paginationConfig,
    setSearchQuery,
  };
};
