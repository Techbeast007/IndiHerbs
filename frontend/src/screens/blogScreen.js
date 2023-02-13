import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import SingleBlog from './singleBlog';

function Blog() {
  const [posts,setPosts] = useState([])

    useEffect(()=>{
        axios.get(`/api/blog/`).then((res)=>{
            setPosts(res.data)
        }).catch((err)=>{
           
        })
    },[])
    
  return (
    <><Container >
      <h1>Blogs</h1>
   <Row> {posts.map((item)=> <Col key={item._id}><Card style={{ width: '18rem',marginBottom:'10px',minHeight:"18rem",maxHeight:"22rem" }} sm={12} md={6} lg={4} xl={3}className='my-3 p-3 rounded zoom'>
            <Card.Img variant="top" src={item.image} style={{ minWidth: '9rem',minHeight:"9rem",maxHeight:"6rem" }}/>
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
          </Card></Col>)}</Row></Container>
    


    </>
  );
}

export default Blog;