import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

import State from './State';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { changeState, reorderItem, loadTasks } from '../actions/task';
import { updateState } from '../utils/taskUpdates';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2
    }
});

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

class DragDropArea extends Component {
    componentWillMount() {
        this.props.dispatch(loadTasks());
    }
    onDragEnd = result => {
        const { task } = this.props;
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            this.props.dispatch(reorderItem({
                source: source.droppableId,
                startIndex: source.index,
                endIndex: destination.index
            }));
        } else {
            const id = task[source.droppableId][source.index]._id;
            const status = destination.droppableId;
            this.props.dispatch(changeState({
                source: source.droppableId,
                destination: destination.droppableId,
                droppableSource: source,
                droppableDestination: destination
            })).then(() => {
                updateState(id, status);
            });
        }
    };
    render() {
        const { task, classes } = this.props;
        console.log(Object.keys(task));
        return (
            <div className={classes.root}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Grid container className={classes.demo} justify="center" spacing={16}>
                        {
                            ['todo', 'doing', 'done'].map((state) => {
                                return (
                                    <Grid key={state} item>
                                        <State
                                            taskState={state}
                                            getItemStyle={getItemStyle}
                                            getListStyle={getListStyle}
                                        />
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </DragDropContext>
            </div>
        )
    }
}

DragDropArea.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => state;

export default withStyles(styles)(connect(mapStateToProps)(DragDropArea));