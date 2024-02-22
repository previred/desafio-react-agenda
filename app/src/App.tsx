import React from 'react';
import './App.css';
import Home from './pages/home';
import { ApiProvider } from '../src/utils/apiContext';

const App: React.FC = () => {
  return (
    <ApiProvider>
      <Home />
    </ApiProvider>
  );
};

export default App;
