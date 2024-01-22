
import React, { useState } from "react";

import { ScheduleTitle } from "./components/ScheduleTitle.tsx";
import { ScheduleTable } from "./components/ScheduleTable.tsx";
import ScheduleDrawer from "./components/ScheduleDrawer.tsx";
import { AddContactButton } from "./components/AddContactButton.tsx";
import { ContactProvider } from "./context/ContactContext.tsx";
import { SearchContact } from "./components/SearchContact.tsx";
import { Flex } from "antd";

const App: React.FC = () => {
  return (
    <ContactProvider>
      <Flex gap="middle" align="start" vertical>
        <ScheduleTitle/>
        <AddContactButton/>
        <SearchContact/>
        <ScheduleTable/>
        <ScheduleDrawer/>
      </Flex>
    </ContactProvider>
  )
};

export default App;