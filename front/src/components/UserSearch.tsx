import { Input } from "antd";
import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;

interface UserSearchProps {
  onSearch: (value: string) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch }) => {
  const handleSearch: SearchProps['onSearch'] = (value) => {
    onSearch(value); 
  };

  const handlePressEnter: SearchProps['onPressEnter'] = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    onSearch(inputValue);
  };

  return <Search onSearch={handleSearch} onPressEnter={handlePressEnter} />;
};

export default UserSearch;
