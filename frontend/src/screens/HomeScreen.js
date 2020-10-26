import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import products from '../products';
// import axios from 'axios'; //we are using redux
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // const products = []
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const {data} = await axios.get('/api/products')

  //     setProducts(data)
  //   }

  //   fetchProducts()
  // }, [])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className="">
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
