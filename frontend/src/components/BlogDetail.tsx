import { useEffect, useState } from "react";
import BlogPosts from "./BlogPosts";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreatePost from "./CreatePost";

function BlogDetail(){

    const BLOG_URL = "http://localhost:8000/blogs/";
    const POSTS_API_URL = "http://localhost:8000/posts/";

    const params = useParams();
    const blog_id = params.blogId;

    const [blog, setBlog] = useState<any>();
    const [posts, setPosts] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)

    const getPosts = async(blog_id: number) => {
        try{
            const postResponse = await axios.get(POSTS_API_URL + blog_id);
            setPosts(postResponse.data);
        } catch (err) {
            setError(`Error retrieving posts: ${err}`);
        }
    }


    const getBlog = async(blog_id: number) => {
        try{
            const blogResponse = await axios.get(BLOG_URL + blog_id)
            setBlog(blogResponse.data)
        } catch(err) {
            setError(`Error retrieving blog: ${err}`);
        }
    }

    const handlePostCreated = async () => {
        try {
            getPosts(Number(blog_id));
        } catch (error) {
            setError(`Error Retrieving posts: ${error}`)
        }
    }

    useEffect(() => {
        getBlog(Number(blog_id));
        getPosts(Number(posts));
    }, [])

    if(error) return <p>{error}</p>

    return(
        <div>
            <h1>{blog?.title}</h1>
            <p>{blog?.content}</p>
            <CreatePost blog_id={Number(blog_id)} onPostCreated={handlePostCreated} />
            <BlogPosts posts={posts} />
        </div>
    )
}

export default BlogDetail;
function userParams() {
    throw new Error("Function not implemented.");
}

