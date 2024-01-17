import './App.css'
import RegistrationForm from './components/RegistrationForm';
import Header from './components/Header';
import TableGrid from './components/TableGrid';
import UserContextProvider from './context/UserContextProvider.js';
import SearchBar from './components/SearchBar.js';

function App() {

  return (
    <div className='mainContainer'>
      <UserContextProvider>
        <Header />
        <div className='container'>
          <RegistrationForm />
        </div>
        <SearchBar />
        <TableGrid />
      </UserContextProvider>
    </div>
  )
}
export default App