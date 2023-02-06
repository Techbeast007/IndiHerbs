import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Image from 'react-bootstrap/Image'

function SingleBlog({id}){
    const [post,setPosts] = useState([])
    const location = useLocation()
    console.log(location.state.id)

    useEffect(()=>{
        axios.get(`/api/blog/${location.state.id}`).then((res)=>{

            setPosts(res.data)
        }).catch((err)=>{
            console.log(err)
        })

    },[location.state.id])
    console.log(post)
    return (
        <><h1>{post.title}</h1>
        <Image src={post.image} style={{width:"80vw",height:"400px"}}/>
        <h6 style={{margin:"40px",display:"flex",justifyContent:"center"}}>{post.description}</h6>
       
       
                

            
    
       
        </>
    )
}
export default SingleBlog