import React from 'react'


export const StoreContext = React.createContext({});

const StoreProvider = ({ children }: any) => {
  return (
   <StoreContext.Provider value={""}>
        {children}
   </StoreContext.Provider>
  )
}

export default StoreProvider;