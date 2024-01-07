import "antd/dist/reset.css";
import React from "react";
import { UserProvider } from "./context/UserContext";
import UserContactList from "./ui/templates/UserContactList";

function App() {
  return (
    <UserProvider>
      <UserContactList />
    </UserProvider>
  );
}

export default App;
