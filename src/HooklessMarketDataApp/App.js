import React from 'react';
import OrderBook from './OrderBook';
import ExchangeDataProvider from "./ExchangeContext";

function App() { 
  return (
    <ExchangeDataProvider>
      <header>Market Data Without React Hooks</header>
      <OrderBook />
    </ ExchangeDataProvider>
  );
}

export default App;
