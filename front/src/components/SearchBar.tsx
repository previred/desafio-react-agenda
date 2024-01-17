import { Input } from 'antd';
import '../App.css'
import { useContext, useEffect, useState } from 'react';
import { getUsersByName } from '../ApiFunctions';
import { UserContext } from '../context/UserContext';

const { Search } = Input;

const SearchBar = () => {
    const usersContext = useContext(UserContext);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                //Updates the users list after searching the user by name
                const data = await getUsersByName(searchText);
                usersContext.setUsers(data);
                console.log(data)
            } catch (error) {
                console.error('Error Fetching users:', error);
            }
        }
        fetchUsers();

    }, [searchText]);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    return (
        <div className='container'>
            <Search
                className='searchBar'
                placeholder="Search by name"
                value={searchText}
                onChange={handleSearch}
                allowClear
            />
        </div>
    );
};

export default SearchBar;