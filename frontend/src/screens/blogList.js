import React, { useEffect,useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

const BlogList = () => {
    const [posts,setPosts] = useState([])
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(()=>{
        axios.get(`/api/blog/`).then((res)=>{
            setPosts(res.data)
        }).catch((err)=>{
           
        })
    },[])


  const deleteHandler = async(id) => {
    if (window.confirm('Are you sure')) {
        const data = { 
            'user': {
                'isAdmin':'true'
            }
            
        };
      await axios.delete(`/api/blog/${id}`,{data : data}).then((res)=>{
        console.log(res)
      })
    }
  }

//   const createProductHandler = () => {
//     dispatch(createProduct())
//   }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Blogs</h1>
        </Col>
        <Col className='text-right'>
          <Link to="/blogEdit"><Button className='my-3'>
            <i className='fas fa-plus'></i> Create Blog
          </Button></Link>
        </Col>
      </Row>
    
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>IMAGE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.title}</td>
                  <td>${product.description}</td>
                  <td>{product.image}</td>
                  <td>
                    <Link to={{pathname:`/blogEdit`, state:{id:product._id}}}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      
    </>
  )
}

export default BlogList