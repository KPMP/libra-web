import actionNames from '../actionNames';
import { setValidationResult, clearValidationResult } from './validationActions';

describe('setValidationResult', () => {
	it('should return the result in the correct structure', () => {
		let expectedResult = {
			type: actionNames.SET_VALIDATION_RESULT,
			payload: { 'key': 'value' }
		};
		
		let result = setValidationResult({ 'key': 'value' });
		
		expect(result).toEqual(expectedResult);
	});
});
describe('clearValidationResult', () => {
	it('should return the result in the correct structure', () => {
		let expectedResult = {
			type: actionNames.CLEAR_VALIDATION_RESULT
		};
		
		let result = clearValidationResult();
		
		expect(result).toEqual(expectedResult);
	});
});