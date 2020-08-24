export const getStateDisplayText = (state, stateDisplayMap) => {
	console.log(state);
	console.log(stateDisplayMap);
	
	let stateDisplayText = stateDisplayMap.filter(function(stateDisplayItem) {
		if (stateDisplayItem.state === state.state) {
			return stateDisplayItem;
		} else {
			return '';
		}
	}, state);
	
	return stateDisplayText[0].apps.dmd.text
}