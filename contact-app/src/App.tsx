import { ConfigProvider } from 'antd';
import './App.css';
import Main from './components/Main';
import{ ApiProvider } from './contexts/ApiContext'

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Roboto',
        },
      }}
    >
      <ApiProvider>
        <div className="App">
          <Main />
        </div>
      </ApiProvider>
    </ConfigProvider>
  );
}

export default App;