import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import products from '../products';
// import axios from 'axios'; //we are using redux
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from '../components/Paginate';
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = ({ match }) => {
  //search variables
  const keyword = match.params.keyword
  //page number
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

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
    <div className='top-banner'>
      <h1>WELCOME TO PROSHOP</h1>
    {!keyword && <ProductCarousel />}
    </div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <Row className="">
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="">
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </>
      )}
    </>
  );
};

export default HomeScreen;
