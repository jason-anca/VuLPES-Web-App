import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { embedYouTubeVideos } from '../utils';
import '@fortawesome/fontawesome-free/css/all.css';
import { DragDropContext } from 'react-beautiful-dnd';
import PostForm from './postForm/PostForm';
import PostList from './postList/postList';

const SubjectPage = () => {
    const { teacherId, subjectUniqueId } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadedPosts = JSON.parse(localStorage.getItem(`posts_${teacherId}_${subjectUniqueId}`)) || [];
        setPosts(loadedPosts);
    }, [teacherId, subjectUniqueId]);

    useEffect(() => {
        localStorage.setItem(`posts_${teacherId}_${subjectUniqueId}`, JSON.stringify(posts));
    }, [posts]);

    const addPost = (title, description) => {
        const newPost = {
            id: `post_${posts.length + 1}`,
            title,
            description,
            timestamp: new Date().toISOString(),
        };
        setPosts([...posts, newPost]);
    };

    const deletePost = (id) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(posts);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setPosts(items);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={styles.container}>
                <h2 style={styles.heading}>Create a New Post</h2>
                <PostForm addPost={addPost} />
                <PostList posts={posts} deletePost={deletePost} />
            </div>
        </DragDropContext>
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
};

export default SubjectPage;
