const taskReducerDefaultState = {
    todo: [
        {
            _id: 0,
            title: 'todo test 0'
        },
        {
            _id: 1,
            title: 'todo test 1'
        }
    ],
    doing: [
        {
            _id: 2,
            title: 'doing test 0'
        },
        {
            _id: 3,
            title: 'doing test 1'
        }
    ],
    done: [
        {
            _id: 4,
            title: 'done test 0'
        },
        {
            _id: 5,
            title: 'done test 1'
        }
    ]
}

export default (state = taskReducerDefaultState, action) => {

    switch (action.type) {
        case 'CHANGE_STATE':
            let removed;
            const sourceTasks = Array.from(state[action.source]);
            const destTasks = Array.from(state[action.destination]);
            [removed] = sourceTasks.splice(action.droppableSource.index, 1);

            destTasks.splice(action.droppableDestination.index, 0, removed);
            return {
                ...state,
                [action.source]: sourceTasks,
                [action.destination]: destTasks
            };
        case 'REORDER_ITEM':
            let removedItem;
            const result = Array.from(state[action.source]);
            [removedItem] = result.splice(action.startIndex, 1);
            result.splice(action.endIndex, 0, removedItem);

            return {
                ...state,
                [action.source]: result
            };
        case 'LOAD_TASKS':
            return {
                ...action.tasks
            };
        default:
            return state;
    }
}