import React from 'react'
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;
const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );
  

const OnSearch = ({onSearch}: any) => {
  return (
    <Search
        style={{ marginBottom: "40px" }}
        placeholder="Ingresa una palabra clave"
        onSearch={onSearch}
        size="large"
    />
  );
}

export default OnSearch;