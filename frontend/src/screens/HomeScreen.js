import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import {Button,Image} from 'react-bootstrap'

const HomeScreen = ({ match }) => {
  const [posts,setPosts] = useState([])


  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  useEffect(()=>{
    axios.get(`/api/blog/`).then((res)=>{
        setPosts(res.data.slice(res.data.length-4,res.data.length))
    }).catch((err)=>{
       
    })
},[])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
          
        
      )}





      <h1 style={{marginTop:'30px'}}>Latest Blogs</h1>
                
         
              <Row> {posts.map((item)=> <Col key={item._id} sm={12} md={6} lg={4} xl={3}><Card  className='my-3 p-3 rounded zoom'>
              <Card.Img variant="top" src={item.image} style={{ minWidth: '9rem',minHeight:"9rem" }}/>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text> 
                  {item.description}
                </Card.Text>
                <Link to={{
        pathname: `/blogsPost/${item.title}`,
        state: { id:item._id } 
      }} ><Button variant="primary" style={{width:"-webkit-fill-available"}}>Read More</Button></Link>
              </Card.Body>
            </Card></Col>)}</Row>
        
          
         
    </>
  )
}

export default HomeScreen
