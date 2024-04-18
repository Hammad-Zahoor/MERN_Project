import React, { useState } from 'react'
import "../screens/comment.css"
import { useNavigate } from 'react-router-dom';

function Comment({ onClose, postId }) {

    const [comment, setcomment] = useState("");
    const navigate = useNavigate();

    const handle_comment = async () => {
        const response = await fetch(`http://localhost:5000/api/add_comment/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment })
        });
        try {
            const json = await response.json();
            console.log("Comment Added");
            navigate("/");
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Comments</h2>
                <input className="comment-text" type='text' placeholder='Comment...' name="comment"
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)} />
                <div className='comment-button'>
                    <button onClick={handle_comment}>Add comment</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default Comment;

