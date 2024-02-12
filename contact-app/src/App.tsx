import { ConfigProvider } from 'antd';
import './App.css';
import Main from './components/Main';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Roboto',
        },
      }}
    >
      <div className="App">
        <Main />
      </div>
    </ConfigProvider>
  );
}

export default App;