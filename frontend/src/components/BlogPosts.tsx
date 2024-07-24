import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogPosts(){

    const [posts, setPosts] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)

    const params = useParams();
    const blog_id = params.blogId;

    const POSTS_API_URL = "http://localhost:8000/posts/";

    const getPosts = async(blog_id: number) => {
        try{
            const postResponse = await axios.get(POSTS_API_URL + blog_id);
            setPosts(postResponse.data);
        } catch (err) {
            setError(`Error retrieving posts: ${err}`);
        }
    }

    useEffect(() => {
        getPosts(Number(blog_id));
    },[])

    return(
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <li>{post.content}</li>
                ))}
            </ul>
        </div>
    )
}

export default BlogPosts;