import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import MainPage from './pages/MainPage';
import ProductDetails from './pages/ProductDetails';
// import Details from './components/Details';

function App() {
  return (
    <BrowserRouter>
      <Route
        exact
        path="/"
        component={ MainPage }
      />
      <Route
        exact
        path="/cart"
        component={ Cart }
      />
      <Route
        exact
        path="/product-details/:id"
        render={ (props) => <ProductDetails { ...props } /> }
      />
    </BrowserRouter>

  );
}

export default App;
