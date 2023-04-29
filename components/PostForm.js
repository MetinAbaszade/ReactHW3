import React, { useState } from 'react'
import { PostService } from '../services';


export default function PostForm() {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = { title, body, userId: parseInt(userId, 10) };
        const result = await PostService.addPostJson(newPost);
        alert(`Post created with ID: ${result.id}`);
        setTitle('');
        setBody('');
        setUserId('');
    }

    return (
        <>
            <h2>Add Post</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Body:
                    <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                </label>
                <label>
                    User ID:
                    <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />
                </label>
                <button type="submit">Add Post</button>
            </form>
        </>
    )
}
