const userReducerDefaultState = {
    name: '',
    email: '',
    token: null,
    refresh: null
};

export default (state = userReducerDefaultState) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                ...action.user
            };
        case 'CLEAR_USER':
            return userReducerDefaultState;
        default:
            return state;
    }
}