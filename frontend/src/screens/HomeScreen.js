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
      <Container>
        <Row className="sant"> 
          <Col sm={12} md={6} lg={4} xl={3} >
          <Image src="https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_150,h_150/https://www.indiherbs.com/wp-content/uploads/2021/09/free-shipping-e1657969467553-150x150.png" className="sants">
        </Image>
        <h6 className="sant">Free Shipping</h6>
        <p>Grab the opportunity of Free shipping in US on all our products in offer.</p>

          </Col>
          <Col sm={12} md={6} lg={4} xl={3} >
          <Image src="https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_150,h_150/https://www.indiherbs.com/wp-content/uploads/2021/09/100-Natural-e1657973302528-150x150.png" className="sants">
        </Image>
        <h6 className="sant">100% Natural</h6>
        <p className="sant">Made from 100% Natural herbs to extract the greatest synergistic benefits.</p>

          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
          <Image src="https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_150,h_150/https://www.indiherbs.com/wp-content/uploads/2021/09/High-Quality-e1657969427597-150x150.png" className="sants">
        </Image>
        <h6 className="sant" >High Quality</h6>
        <p className="sant">We are destined to provide high quality with purest and natural form of herbs in our supplements.</p>

          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
          <Image src="https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_150,h_150/https://www.indiherbs.com/wp-content/uploads/2021/09/30days-e1657973319576-150x150.png" className="sants">
        </Image>
        <h6 className="sant">30 Days MoneyBack Guarantee</h6>
        <p className="sant">Our 30-day risk-free guarantee means we'll happily refund your purchase price.</p>

          </Col>
        </Row>
        
       
      </Container>
      





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
