import React from "react";
import Rating from "./Rating";
import { Card, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Product.css'

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded shadow text-grey">
      <Link to={`/product/${product._id}`}>
        {/* <Figure>
          <Figure.Image
            width={160}
            height={160}
            alt="171x160"
            src={product.image}
          />
        </Figure> */}
        < div className='card-image-container'>
          <Card.Img src={product.image} variant='top' className="card-image"/>
        </div>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className='card-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div" style={{color: 'grey'}}>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
