import { filenameValidation } from './filenameValidationReducer';
import actionNames from '../../actions/actionNames';

describe('filenameValidation', () => {
	it('should return the given state if not known action', () => {
		let action = {
			type: 'UNKNOWN'
		};
		expect(filenameValidation({}, action)).toEqual({});
	});
	
	it('should return the new state if SET_VALIDATION_RESULT', () => {
		let action = {
				type: actionNames.SET_VALIDATION_RESULT,
				payload: 'new stuff'
		};
		expect(filenameValidation({}, action)).toEqual('new stuff');
	});
	it('should clear the state if CLEAR_VALIDATION_RESULT', () => {
		let action = {
				type: actionNames.CLEAR_VALIDATION_RESULT
		};
		expect(filenameValidation({'key': 'value'}, action)).toEqual({});
	});
});