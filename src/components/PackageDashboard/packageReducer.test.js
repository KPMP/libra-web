import { packages } from './packageReducer';
import actionNames from '../../actions/actionNames';

describe('packages', () => {

	it('should return the given state if not known action', () => {
		let action = {
			type: 'UNKNOWN'
		};
		expect(packages([], action)).toEqual([]);
	});
	
});