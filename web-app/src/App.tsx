import { Layout } from 'antd';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AppRouter } from './router';

const { Content } = Layout;

function App() {

  return (
    <Provider store={store}>
      <Layout style={{ height: '100%' }}>
        <Content style={{ padding: '60px 48px', width: '100%', maxWidth: 1600, margin: '0 auto', minHeight: '100%' }}>
          <AppRouter />
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
