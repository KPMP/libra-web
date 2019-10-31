import actionNames from '../actionNames';
import Api from '../../helpers/Api';
import { sendMessageToBackend } from '../Error/errorActions';

const api = Api.getInstance();

export const getPackages = () => {
    return (dispatch) => {
        api.get('/api/v1/packages')
            .then(res => {
                dispatch(setPackages(res.data));
            })
            .catch(err => {
                dispatch(sendMessageToBackend(err));
            });
    };
}

export const setPackages = (packages) => {
    return {
        type: actionNames.SET_PACKAGES,
        payload: packages
    }
}