import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

function Blog() {
  const [posts,setPosts] = useState([])
    useEffect(()=>{
        axios.get(`https://www.indiherbs.onrender.com/api/blog/`).then((res)=>{
            setPosts(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    console.log(posts)
  return (
    <><Container>
   <Row> {posts.map((item)=> <Col><Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                {item.description}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card></Col>)}</Row></Container>
    


    </>
  );
}

export default Blog;