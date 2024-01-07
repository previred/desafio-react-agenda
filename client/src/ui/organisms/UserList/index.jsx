import React from "react";
import Search from "../../atoms/Search";
import UserTable from "../../molecules/UserTable";
import { Divider } from "antd";
import { useUserList } from "../../../hook/useUserList";

const UserList = () => {
  const { users, handleDeleteUser, paginationConfig, onSearch } =
    useUserList();

  return (
    <React.Fragment>
      <Search
        placeholder='Buscar contacto'
        allowClear
        onSearch={(value, _e, _info) => onSearch(value)}
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
