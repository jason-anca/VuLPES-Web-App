import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DOMPurify from 'dompurify';
import { embedYouTubeVideos } from '../../utils';
import '../../css/PostList.css';  // Ensure this is correctly imported, cause I keep putting the wrong path
import { useAuth } from '../../contexts/AuthContext';

function PostList({ posts, deletePost }) {
    const { user } = useAuth();
    const createMarkup = (htmlContent) => {
        const embeddedContent = embedYouTubeVideos(htmlContent);
        const sanitizedContent = DOMPurify.sanitize(embeddedContent, {
            ADD_TAGS: ['iframe'],
            ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'src']
        });
        return { __html: sanitizedContent };
    };

    return (
        <Droppable droppableId="posts" isDropDisabled={!user}>
            {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="postsContainer">
                    {posts.map((post, index) => (
                        <Draggable key={post.id} draggableId={post.id} index={index} isDragDisabled={!user}>
                            {(provided) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="postCard"
                                style={{ ...provided.draggableProps.style, cursor: user ? 'grab' : 'default' }}
                            >
                                <span className="grippy" {...provided.dragHandleProps}></span>
                                <h3>{post.title}</h3>
                                <div dangerouslySetInnerHTML={createMarkup(post.description)} />
                                <div className="footerContainer">
                                        <span className="timestamp">{new Date(post.timestamp).toLocaleString()}</span>
                                        {user && (<button id="deleteButton" onClick={() => deletePost(post.id)} className="deleteButton">
                                            <i className="fas fa-trash"></i> Delete
                                        </button>
                                        )}
                                    </div>
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

export default PostList;
