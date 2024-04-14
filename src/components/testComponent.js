import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TestDnDComponent() {
    const items = [{id: 'item-1', content: 'Item 1'}, {id: 'item-2', content: 'Item 2'}];

    const onDragEnd = (result) => {
        // You would normally reorder the list here
        console.log('Drag ended:', result);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="test-droppable">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{ margin: '8px', padding: '8px', backgroundColor: '#f0f0f0' }}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default TestDnDComponent;
