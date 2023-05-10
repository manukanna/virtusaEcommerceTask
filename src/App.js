
import './App.css';
import React from 'react'
import Home from './components/home/home'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsSummary from './components/product-summary/product-summary';
import NavBar from './components/nav-bar/nav-bar'
function App() {
  const [totalProductsAddedToCart, settotalProductsAddedToCart] = React.useState([])
  const addedProductToCartValues = (item) => {
    settotalProductsAddedToCart([...totalProductsAddedToCart, item])
  }
  return (
    <>
      <BrowserRouter>
        <NavBar totalProductsAddedToCart={totalProductsAddedToCart} />
        <Routes>
          <Route path="/" element={<Home addedProductToCartValues={addedProductToCartValues} />} />
          <Route path="/productsSummary" element={<ProductsSummary totalProductsAdded={totalProductsAddedToCart}/>} />
        </Routes>
      </BrowserRouter>

      {/* <Home /> */}
    </>
  );
}

export default App;
