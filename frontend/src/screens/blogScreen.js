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
    <><Container>
   <Row> {posts.map((item)=> <Col key={item._id}><Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text> 
                {item.description}
              </Card.Text>
              <Link to={{
      pathname: `/blogsPost/${item.title}`,
      state: { id:item._id } 
    }} ><Button variant="primary">Read More</Button></Link>
            </Card.Body>
          </Card></Col>)}</Row></Container>
    


    </>
  );
}

export default Blog;