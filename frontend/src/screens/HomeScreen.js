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
import logo from '../images/logo.png'
import logos from '../images/logs.png'
import logos1 from '../images/logos1.png'
import logos2 from '../images/logos2.png'
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
      <Container style={{background:"#000000"}}>
      <Row style={{marginTop:"60px"}}>
      <Col sm={12} md={6} lg={4} xl={3}>
       <Card border="success" className='my-3 p-3 rounded zoom' style={{minHeight:"26rem",maxHeight:"26rem"}} >
     
       
        <Card.Img src={logos2} variant='top' />

      <Card.Body>
       
          <Card.Title as='div'>
            <strong><b><h5>Free Shipping</h5></b></strong>
          </Card.Title>
    

        <Card.Text as='div'>
        <h6> Grab the opportunity of Free shipping in US on all our products in offer.</h6>
        
          
        </Card.Text>

       
      </Card.Body>
    </Card>
    </Col>
    <Col sm={12} md={6} lg={4} xl={3}>
       <Card  border="dark" className='my-3 p-3 rounded zoom' style={{minHeight:"26rem",maxHeight:"26rem"}} >
     
       
        <Card.Img src={logos} variant='top'/>

      <Card.Body>
       
          <Card.Title as='div'>
            <strong><b><h5>100% Natural</h5></b></strong>
          </Card.Title>
    

        <Card.Text as='div'>
        <h6> Made from 100% Natural herbs to extract the greatest synergistic benefits.</h6>
        
          
        </Card.Text>

       
      </Card.Body>
    </Card>
    </Col>
    <Col sm={12} md={6} lg={4} xl={3}>
       <Card  border="warning" className='my-3 p-3 rounded zoom' style={{minHeight:"26rem",maxHeight:"26rem"}}>
     
        <Card.Img src={logo} variant='top' />
      

      <Card.Body>
       
          <Card.Title as='div' style={{fontFamily:"fantasy",weight:'900',color:"black",fontSize:"20px"}}>
            <strong><b><h5>HIGH QUALITY</h5></b></strong>
          </Card.Title>
    

        <Card.Text as='div'>
        <h6> We are destined to provide high quality with purest and natural form of herbs in our supplements.</h6>
        
          
        </Card.Text>

       
      </Card.Body>
    </Card>
    </Col>
    <Col sm={12} md={6} lg={4} xl={3}>
       <Card border="info" className='my-3 p-3 rounded zoom' style={{maxHeight:"26rem"}}>
     
        <Card.Img src={logos1} variant='top'  />
      

      <Card.Body>
       
          <Card.Title as='div'>
            <strong><b><h5>
30 DAYS MONEYBACK GUARANTEE</h5></b></strong>
          </Card.Title>
    

        <Card.Text as='div'>
        <h6> Our 30-day risk-free guarantee means we'll happily refund your purchase price.</h6>
        
          
        </Card.Text>

       
      </Card.Body>
    </Card>
    </Col>
    </Row>
    </Container>

      
     

      
   
        
       

      





      <h1 style={{marginTop:'30px'}}>Learn more on our Health Blogs</h1>
                
         
              <Row> {posts.map((item)=> <Col key={item._id} sm={12} md={6} lg={4} xl={3}><Card  className='my-3 p-3 rounded zoom' style={{minHeight:"18rem",maxHeight:"20rem"}}>
              <Card.Img variant="top" src={item.image} style={{ minWidth: '9rem',minHeight:"9rem",maxHeight:"5rem",maxWidth:"fill" }}/>
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
