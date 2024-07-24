import axios from "axios";
import {useEffect, useState} from 'react'
import { Link } from "react-router-dom";

function BlogList(){

    const [blogs, setBlogs] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const BLOG_API_URL = ("http://localhost:8000/blogs/")

    const getBlogs = async () => {
        try{
            const blogsresponse = await axios.get(BLOG_API_URL);
            setBlogs(blogsresponse.data);
            setLoading(false);
        } catch(err){
            setError(`Error retrieving blogs: ${err}`)
        }
    }

    useEffect(() => {
        getBlogs();
    }, [])

    if(error) return <p>{error}</p>
    if(loading) return <p>{loading}</p>

    return(
        <div>
            <h1>Blog Entries</h1>
            <ul>
                {blogs.map(blog => (
                    <li>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BlogList;