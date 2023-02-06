import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link,useLocation } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'


const BlogEdit = () => {
  const location = useLocation()
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [id,setId] = useState(location?.state?location.state.id:'')
  useEffect(()=>{
    if(id){axios.get(`/api/blog/${id}`).then((res)=>{
      setTitle(res.data.title)
      setImage(res.data.image)
      setDescription(res.data.description)

    })}

  },[])

  const putPost =async()=>{
 await axios.put(`/api/blog/${location.state.id}`,{
      title:title,
      image:image,
      description:description,
      user:{
        isAdmin:"true"
      }
  }).then((res)=>{
      console.log(res)

  }).catch((err)=>{
    localStorage.setItem("item",err)
      console.log(err)

  })
  }
  const updatePost=async()=>{
    console.log(title,image,description)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
   
    await axios.post('/api/blog/',{
        title:title,
        image:image,
        description:description,
        user:{
          isAdmin:"true"
        }
    }).then((res)=>{
        console.log(res)

    }).catch((err)=>{
      localStorage.setItem("item",err)
        console.log(err)

    })

  }





  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }


  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
          <Form >
            <Form.Group controlId='name'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='Description' >
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description/Post'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>


           {location?.state?.id ? <Button type='submit' variant='primary' onClick={()=>putPost()}>
              Update
            </Button>:<Button type='submit' variant='primary' onClick={()=> updatePost()}>
              Update
            </Button>}
            
          </Form>
      </FormContainer>
    </>
  )
}

export default BlogEdit
