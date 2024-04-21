import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../../contexts/AuthContext';

function toggleEditor() {
    var x = document.getElementById("editor");
    if (x === null){
        return
    } else {
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
}

function PostForm({ addPost }) {
    const { user } = useAuth();
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost(postTitle, postDescription);
        setPostTitle('');
        setPostDescription('');
    };

    if (!user) {
        console.log("You must be logged in to post content and view the form.");
        toggleEditor();
        return null;
    }

    return (
        <div id="editor">
            <form id="editor" onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inlineContainer}>
                    <h2 style={styles.heading}>Create a New Post</h2>
                    <input
                        type="text"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="Post Title"
                        style={styles.titleInput}
                    />
                </div>
                <ReactQuill
                    value={postDescription}
                    onChange={setPostDescription}
                    style={styles.quillEditor}
                />
                <button type="submit" style={styles.submitButton}>Post</button>
            </form>
        </div>
    );
}

const styles = {
    form: {
        marginBottom: '40px',
    },
    inlineContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        position: 'relative'
    },

    titleInput: {
        width: '977px',
        padding: '10px',
        marginRight: '10px',
        marginTop: '100px',
        fontSize: '16px',
        position: 'absolute'
    },
    quillEditor: {
        height: '200px',
        width: '1000px',
        marginBottom: '60px',
        marginTop: '50px',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#FFA500',
        color: '#333',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'relative'
    },
    heading: {
        position: 'relative',
        marginBottom: '20px',
    },
};

export default PostForm;
