import { Input } from "../../components/Input";

import "./SearchInput.scss";
import { CloseOutlined } from "@ant-design/icons";
import { useUsers } from "../../hook/useUser";

export const SearchInput = () => {
  const { listUserFilter, loadUserList } = useUsers();

  const handlerPress = (event: React.ChangeEvent<HTMLInputElement>) => {
    listUserFilter(event.currentTarget.value);
  };

  const clearSearchInput = () => {
    loadUserList();
  };

  return (
    <Input
      placeholder="Buscar contactos..."
      className="search-input"
      onChange={handlerPress}
      suffix={<CloseOutlined onClick={clearSearchInput} />}
    />
  );
};
