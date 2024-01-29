import actionNames from '../actionNames';
import Api from '../../helpers/Api';
import { sendMessageToBackend } from '../Error/errorActions';

const api = Api.getInstance();

export const getPackagesStateless = () => {
    
    api.get('/api/v1/packages?shouldExclude=false')
        .then(res=> {
            return res.data
        })
        .catch(error => {
            // logError(error);
        });
}

// export const logError = (error) => {
//     return(dispatch) => {
//         dispatch(sendMessageToBackend(error));
//     }
// }
    

export const getPackages = () => {
    return (dispatch) => {
        api.get('/api/v1/packages?shouldExclude=false')
            .then(res => {
                dispatch(setPackages(res.data));
            })
            .catch(err => {
                dispatch(sendMessageToBackend(err));
            });
    };
}

export const movePackageFiles = (packageId) => {
    return (dispatch) => {
        api.post('/api/v1/packages/' + packageId + '/files/move')
            .then(res => {
                alert(res.data);
            })
            .catch(err => {
                alert("There was a problem moving the files.");
            });
    }
}

export const setPackages = (packages) => {
    return {
        type: actionNames.SET_PACKAGES,
        payload: packages
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