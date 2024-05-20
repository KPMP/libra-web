import actionNames from '../actionNames';
import Api from '../../helpers/Api';
import { sendMessageToBackend } from '../Error/errorActions';

const api = Api.getInstance();

export const getPackagesStateless = () => {
    
    return api.get('/api/v1/packages?shouldExclude=false')
        .then(res=> {
            return res.data
        })
        .catch(error => {
            console.log(error)
            alert("We hit an error getting packages...talk to a dev.")
        });
}   

export const movePackageFiles = (packageId) => {
    return (dispatch) => {
        api.post('/api/v1/packages/' + packageId + '/files/move')
            .then(res => {
                alert("Package marked as ready to move.");
            })
            .catch(err => {
                alert("There was a problem moving the files.");
            });
    }
}

export const setStateDisplayMap = (stateDisplayMap) => {
	return {
		type: actionNames.SET_STATE_DISPLAY_MAP,
		payload: stateDisplayMap
	}
}

export const getStateDisplayMap = () => {
	 return (dispatch) => {
        api.get('/api/v1/state/stateDisplayMap')
            .then(res => {
                dispatch(setStateDisplayMap(res.data));
            })
            .catch(err => {
                dispatch(sendMessageToBackend(err));
            });
    };
}