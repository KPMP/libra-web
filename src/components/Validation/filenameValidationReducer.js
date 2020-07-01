import actionNames from '../../actions/actionNames';

export const filenameValidation = (state = {}, action) => {
	let newState = {};

    switch (action.type) {
        case actionNames.SET_VALIDATION_RESULT:
            newState = action.payload;
            return newState;
        case actionNames.CLEAR_VALIDATION_RESULT:	
        	return newState;
        default:
            return state;
    }
}
