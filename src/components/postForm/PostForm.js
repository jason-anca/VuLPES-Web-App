import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function PostForm({ addPost }) {
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost(postTitle, postDescription);
        setPostTitle('');
        setPostDescription('');
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inlineContainer}>
                <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Post Title"
                    style={styles.titleInput}
                />
                <button type="submit" style={styles.submitButton}>Post</button>
            </div>
            <ReactQuill
                value={postDescription}
                onChange={setPostDescription}
                style={styles.quillEditor}
            />
        </form>
    );
}

const styles = {
    form: {
        marginBottom: '40px',
    },
    inlineContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',  // Adjust spacing as needed
    },
    
    titleInput: {
        width: '977px', 
        padding: '10px',
        marginRight: '10px',  // Add some space between the input and the button
        fontSize: '16px',
    },
    quillEditor: {
        height: '200px',
        width: '1000px',  // Adjust based on your layout needs
        marginBottom: '60px'
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#FFA500',
        color: '#333',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default PostForm;
