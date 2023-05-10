import React from 'react';
import Products from '../prodcuts/products';


const Home = (props) => {
    const addedProductToCartValues = (item) => {
        props.addedProductToCartValues(item)
    }
    return (
        <>
            <Products addedProductToCart={addedProductToCartValues} />
        </>
    )
}
export default Home