import actionNames from '../../actions/actionNames';

export const packages = (state = {}, action) => {
    let newState = {};

    switch (action.type) {
        case actionNames.SET_PACKAGES:
            newState.packages = state.packages;
            return newState;

        default:
            return state;
    }
};