import axios from "axios"
import { useState } from "react"

interface postProps {
    blog_id: number, 
    onPostCreated: () => void
}

function CreatePost(props: postProps){

    const [content, setContent] = useState<string>('')
    const [error, setError] = useState<string| null>(null)

    const CREATE_POST_API_URL = `http://localhost:8000/blog/${props.blog_id}/posts/`

    const createPost = async (content:string, blog_id: number, account_id: number) => {
        const createResponse = axios.post(`${CREATE_POST_API_URL}`, {content, blog_id, account_id})
    }

    const handleCreatePost = async () => {
        try{
            await createPost(content, props.blog_id, 1);
            setContent('');
            props.onPostCreated();
        } catch (err) {
            setError(`Failed to create post: ${err}`)
        }
    }

    if (error) return <p>{error}</p>

    return(
        <div>
            <h3>Contribute to the conversation:</h3>
            <p>
            <textarea placeholder="Comment" value={content} onChange={(e) => setContent(e.target.value)} />
            </p>
            <p>
            <button onClick={handleCreatePost}>Comment</button>
            </p>
        </div>
    )
}

export default CreatePost;