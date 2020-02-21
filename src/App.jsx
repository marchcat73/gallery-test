import React from 'react';

import { Layout } from './components';
import { Gallery } from './containers';

import './styles/main.scss';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Gallery />
      </Layout>
    </div>
  );
};

export default App;
