import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../quillEditorCustom.css';
import DOMPurify from 'dompurify';
import { embedYouTubeVideos } from '../utils';
import '@fortawesome/fontawesome-free/css/all.css';

const SubjectPage = () => {
    const { teacherId, subjectUniqueId } = useParams();
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [posts, setPosts] = useState([]);


    // Load posts from localStorage on component mount
    useEffect(() => {
        const loadedPosts = JSON.parse(localStorage.getItem(`posts_${teacherId}_${subjectUniqueId}`)) || [];
        setPosts(loadedPosts);
    }, [teacherId, subjectUniqueId]);

    // Save posts to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(`posts_${teacherId}_${subjectUniqueId}`, JSON.stringify(posts));
    }, [posts, teacherId, subjectUniqueId]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        const newPost = {
            id: posts.length + 1,
            title: postTitle,
            description: postDescription,
            timestamp: new Date().toISOString(),
        };
        setPosts([...posts, newPost]);
        setPostTitle('');
        setPostDescription(''); // Clear the input after submission
    };

    const createMarkup = (htmlContent) => {
        const embeddedContent = embedYouTubeVideos(htmlContent);
        const sanitizedContent = DOMPurify.sanitize(embeddedContent, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'src'] });
        return { __html: sanitizedContent };
    };

    const deletePost = (postId) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        localStorage.setItem(`posts_${teacherId}_${subjectUniqueId}`, JSON.stringify(updatedPosts));
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Create a New Post</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Post Title"
                    style={styles.titleInput}
                />
                <ReactQuill
                    value={postDescription}
                    onChange={setPostDescription}
                    style={styles.quillEditor}
                />
                <button type="submit" style={styles.submitButton}>Post</button>
            </form>

            <div style={styles.postsContainer}>
                {posts.map((post) => (
                    <div key={post.id} style={styles.postCard}>
                        <h3 style={styles.postTitle}>{post.title}</h3>
                        <div dangerouslySetInnerHTML={createMarkup(post.description)}></div>
                        <p>{new Date(post.timestamp).toLocaleString()}</p>
                        <button onClick={() => deletePost(post.id)} style={styles.deleteButton}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#282c34',
        color: 'white',
        minHeight: '100vh',
    },
    heading: {
        marginBottom: '20px',
    },
    form: {
        marginBottom: '40px',
    },
    titleInput: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        fontSize: '16px',
    },
    quillEditor: {
        height: '200px',
        marginBottom: '60px',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#FFA500',
        color: '#333',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    postsContainer: {
        marginTop: '20px',
    },
    postCard: {
        backgroundColor: '#333',
        padding: '20px',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    postTitle: {
        marginTop: '0',
    },
    postDescription: {
        marginTop: '10px',
    },
    postTimestamp: {
        marginTop: '10px',
        fontSize: '0.8rem',
    },
    deleteButton: {
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        color: 'red', // Example style, adjust as necessary
    },
};

export default SubjectPage;
