import React, { useState, useEffect } from 'react'
// import products from '../products';
import axios from 'axios';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';

const HomeScreen = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
    .then(res => setProducts(res.data))
    .catch(err => console.log(err))
  }, [])

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
      <Row className=''>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='' >
            <Product product={product}/>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
