import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import taskReducer from '../reducers/task';

export default () => {
    const store = createStore(
        combineReducers({
            task: taskReducer
        }),
        applyMiddleware(
            thunkMiddleware
        )
    );
    return store;
};
