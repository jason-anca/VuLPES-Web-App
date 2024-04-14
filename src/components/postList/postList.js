import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DOMPurify from 'dompurify';
import { embedYouTubeVideos } from '../../utils';

function PostList({ posts, deletePost }) {
    const createMarkup = (htmlContent) => {
        const embeddedContent = embedYouTubeVideos(htmlContent);
        const sanitizedContent = DOMPurify.sanitize(embeddedContent, {
            ADD_TAGS: ['iframe'],
            ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'src']
        });
        return { __html: sanitizedContent };
    };

    return (
        <Droppable droppableId="posts">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={styles.postsContainer}>
                    {posts.map((post, index) => (
                        <Draggable key={post.id} draggableId={post.id} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{ ...provided.draggableProps.style, ...styles.postCard }}
                                >
                                    <h3 style={styles.postTitle}>{post.title}</h3>
                                    <div dangerouslySetInnerHTML={createMarkup(post.description)} />
                                    <p>{new Date(post.timestamp).toLocaleString()}</p>
                                    <button onClick={() => deletePost(post.id)} style={styles.deleteButton}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

const styles = {
    postsContainer: {
        marginTop: '20px',
    },
    postCard: {
        backgroundColor: '#333',
        padding: '20px',
        borderRadius: '5px',
        marginBottom: '20px',
        cursor: 'grab',  // Adjust cursor to indicate draggable functionality
    },
    postTitle: {
        marginTop: '0',
    },
    deleteButton: {
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        color: 'red',
    },
};

export default PostList;
