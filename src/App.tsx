import { ContactList } from "./containers/ContactList";
import "./App.scss";
import { UserProvider } from "./Context/UserProvider";

function App() {
  return (
    <UserProvider>
      <section className="principal">
        <ContactList />
      </section>
    </UserProvider>
  );
}

export default App;
