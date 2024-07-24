import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface postProps {
    posts: any[];
}

function BlogPosts(props: postProps){
    const [error, setError] = useState<string | null>(null)

    const params = useParams();
    const blog_id = params.blogId;

    return(
        <div>
            <h2>Posts</h2>
            <ul>
                {props.posts.map(post => (
                    <li>{post.content}</li>
                ))}
            </ul>
        </div>
    )
}

export default BlogPosts;