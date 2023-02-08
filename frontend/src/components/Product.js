import React from 'react'
import { Link } from 'react-router-dom'
import { Card,Button } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded zoom'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        {/* <div class="container"> */}
        
        <Link to={`/product/${product._id}`} className="links"><Button  className='btn my-3' style={{width:"-webkit-fill-available",marginLeft:"-25px"}}>${product.price}</Button></Link>
  {/* <a class="btn btn-1">${product.price}</a> */}
  {/* <a class="btn btn-2">Hover me</a>
  <a class="btn btn-3">Hover me</a> 
  <a class="btn btn-4">Hover me</a> 
  <a class="btn btn-5">Hover me</a> */}
{/* </div> */}

       
      </Card.Body>
    </Card>
  )
}

export default Product
