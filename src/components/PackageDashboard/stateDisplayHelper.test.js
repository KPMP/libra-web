import { getStateDisplayText } from './stateDisplayHelper';
import React from 'react';

describe('getStateDisplayText', () => {
	it('should return empty string when no match', () => {
		expect(getStateDisplayText({},[])).toEqual('');
	});
	
	it('should return the correct state text', () => {
		let state = { state: 'alive' };
		let stateDisplayMap = [
			{ state: 'alive', apps: { dmd: { text: 'hey ho' }}},
			{ state: 'dead', apps: { dmd: { text: 'oh no' }}}
		];
		expect(getStateDisplayText(state, stateDisplayMap)).toEqual('hey ho');
	})
});