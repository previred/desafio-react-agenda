import Home from './pages/Home'
import { UpdateUserListProvider } from './context/UpdateUserListContext'

export function App() {
  
  return (
    <>  
      <UpdateUserListProvider>
        <Home />
      </UpdateUserListProvider>
    </>
  )
}

