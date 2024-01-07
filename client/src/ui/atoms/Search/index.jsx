import React from "react";
import { Input } from "antd";

const { Search: AntSearch } = Input;

const Search = ({ children, ...props }) => (
  <AntSearch {...props}>{children}</AntSearch>
);

export default Search;
