import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import Search from "../../atoms/Search";
import UserTable from "../../molecules/UserTable";
import { Divider } from "antd";

const UserList = () => {
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

  return (
    <React.Fragment>
      <Search
        placeholder='Buscar contacto'
        allowClear
        onSearch={(value, _e, _info) => setSearchQuery(value)}
        style={{
          width: "100%",
        }}
      />
      <Divider style={{ margin: "12px 0" }} />
      <UserTable
        dataSource={users}
        onDelete={handleDeleteUser}
        pagination={paginationConfig}
      />
    </React.Fragment>
  );
};

export default UserList;
