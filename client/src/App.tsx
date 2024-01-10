import Home from './components/Home'
import ContactsComp from './context/ContactsComp';

function App() {
  return (
    <div className="App">
      <ContactsComp>
        <Home />
      </ContactsComp>
    </div>
  )
}

export default App
