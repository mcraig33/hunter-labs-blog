import { useEffect, useState } from "react";
import BlogPosts from "./BlogPosts";
import axios from "axios";
import { useParams } from "react-router-dom";

function BlogDetail(){

    const BLOG_URL = "http://localhost:8000/blogs/";
    const params = useParams();
    const blog_id = params.blogId;

    const [blog, setBlog] = useState<any>();
    const [error, setError] = useState<string | null>(null)


    const getBlog = async(blog_id: number) => {
        try{
            const blogResponse = await axios.get(BLOG_URL + blog_id)
            alert(blogResponse.data)
            setBlog(blogResponse.data)
        } catch(err) {
            setError(`Error retrieving blog: ${err}`);
        }
    }

    useEffect(() => {
        getBlog(Number(blog_id));
    }, [])

    if(error) return <p>{error}</p>

    return(
        <div>
            <h1>{blog?.title}</h1>
            <p>{blog?.content}</p>
            <BlogPosts />
        </div>
    )
}

export default BlogDetail;
function userParams() {
    throw new Error("Function not implemented.");
}

