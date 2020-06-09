import { packages } from './packageReducer';
import actionNames from '../../actions/actionNames';

describe('packages', () => {
	it('should return the given state if not known action', () => {
		let action = {
			type: "UNKNOWN"
		}
		expect(packages([], action)).toEqual([]);
	});
	it('should return the new state if known action', () => {
		let action = {
				type: actionNames.SET_PACKAGES,
				payload: 'new stuff'
		}
		expect(packages([], action)).toEqual('new stuff');
	});
});