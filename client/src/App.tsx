import "./App.css";
import Home from "./pages/home";
import { BaseContent, MainContainer } from "./shared/main-container";

function App() {
  return (
    <MainContainer>
      <BaseContent>
        <Home />
      </BaseContent>
    </MainContainer>
  );
}

export default App;
