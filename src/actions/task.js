// CHANGE_STATE
export const changeState = ({ source, destination, droppableSource, droppableDestination } = data) => {
    return (dispatch) => {
        dispatch({
            type: 'CHANGE_STATE',
            source,
            destination,
            droppableSource,
            droppableDestination
        });
        return Promise.resolve();
    };
};

// REORDER_ITEM
export const reorderItem = ({ source, startIndex, endIndex } = data) => {
    return {
        type: 'REORDER_ITEM',
        source,
        startIndex,
        endIndex
    };
};

// LOAD_TASKS
export const loadTasks = () => {
    return (dispatch) => {
        return fetch('/list/task?group=true')
            .then(results => results.json())
            .then(data => {
                if (data.ok === true) {
                    dispatch({
                        type: 'LOAD_TASKS',
                        tasks: data.data
                    });
                }
            });
    };
};