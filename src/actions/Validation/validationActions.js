import actionNames from '../actionNames';
import Api from '../../helpers/Api';
import { sendMessageToBackend } from '../Error/errorActions';

const api = Api.getInstance();

export const setValidationResult = (result) => {
	return {
		type: actionNames.SET_VALIDATION_RESULT,
		payload: result
	};
}

export const validateFilenames = (formData) => {
	return (dispatch) => {
		api.post('/api//v1/package/files/validation', formData)
			.then((res) => {
				dispatch(setValidationResult(res.data));
			})
			.catch((error) => {
				dispatch(sendMessageToBackend(error));
			});
	}
}

export const clearValidationResult = () => {
	return {
		type: actionNames.CLEAR_VALIDATION_RESULT
	};
}