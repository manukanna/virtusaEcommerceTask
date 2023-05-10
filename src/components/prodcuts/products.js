import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { storePoducts } from '../../fetchProducts/fetchProducts'
import { addProduct } from '../../store/store'
import './products.scss'



const Products = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();



    useEffect(() => {
        dispatch(storePoducts())
    }, [dispatch])
    const storeProducts = useSelector((state) => {
        return state.allProducts.storeProducts
    })

    const addProductToCart = (product) => {
        let productQuantity = { ...product, quantityProduct: 1 }
        dispatch(addProduct(productQuantity))
        // props.addedProductToCart(product)
    }
    const buyProduct = (product) => {
        let productQuantity = { ...product, quantityProduct: 1 }
        dispatch(addProduct(productQuantity))
        navigate(`/productsSummary`);
    }

    return (
        <>
            <Container fluid={true}>
                <Row>
                    {storeProducts?.map((item, index) => {
                        return <Col lg="6" sm="12" md="12" xs="12" key={index}>
                            <div key={index} className="products-card">
                                <div>
                                    <img src={item.image} alt="" />
                                </div>
                                <div>
                                    <h3 className="product-title">{item.title}</h3>
                                    <div>Price : <b>${item.price}</b></div>
                                    <h6 className="product-description">{item.description}</h6>
                                    <div>Available Stock : <b>{item.rating.count}</b></div>
                                    <div className="product-buttons">
                                        <Button variant="primary" onClick={() => addProductToCart(item)}>Add To Cart</Button>
                                        <Button variant="warning" onClick={() => buyProduct(item)}>Buy Now</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    })}
                </Row>
            </Container>
        </>)
}

export default Products