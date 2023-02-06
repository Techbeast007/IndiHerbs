import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

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
        <>
       
       
                <div>{post.title}</div>

            
    
       
        </>
    )
}
export default SingleBlog