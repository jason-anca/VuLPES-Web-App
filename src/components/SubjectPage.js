import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// import DOMPurify from 'dompurify';
// import { embedYouTubeVideos } from '../utils';
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
        try {
            localStorage.setItem(`posts_${teacherId}_${subjectUniqueId}`, JSON.stringify(posts));
        } catch (error) {
            console.error('Failed to save posts:', error);
        }
    }, [posts]);

    const addPost = useCallback((title, description) => {
        const newPost = {
            id: `post_${Date.now()}`,
            title,
            description,
            timestamp: new Date().toISOString(),
        };
        setPosts(prevPosts => [newPost, ...prevPosts]); 
    }, []);

    const deletePost = (id) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
    };

    const onDragEnd = useCallback((result) => {
        if (!result.destination) return;
        const items = Array.from(posts);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setPosts(items);
    }, [posts]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={styles.container}>
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
};

export default SubjectPage;
