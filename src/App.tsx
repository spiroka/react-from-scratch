import React from 'react';
import './styles/style.scss';
import { hot } from 'react-hot-loader';
import Albums from './Albums';

function App() {
  return (
    <main className="container">
      <Albums bandName="Metallica" />
    </main>
  );
}

export default hot(module)(App);
