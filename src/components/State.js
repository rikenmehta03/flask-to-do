import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class State extends Component {
    render() {
        const { taskState, task, getListStyle, getItemStyle } = this.props;

        return (
            <div>
                <Droppable droppableId={taskState} >
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {task[taskState].map((item, index) => (
                                <Draggable
                                    key={item._id}
                                    draggableId={item._id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {item.title}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable >
            </div>
        );
    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(State);