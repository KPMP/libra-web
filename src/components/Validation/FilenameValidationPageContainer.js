import { connect } from 'react-redux';
import FilenameValidationPage from './FilenameValidationPage';
import { validateFilenames, clearValidationResult } from '../../actions/Validation/validationActions';

const mapStateToProps = (state, props) => ({
	validationResult: state.filenameValidation
});

const mapDispatchToProps = (dispatch, props) => ({
	validateFilenames(formData) {
		dispatch(validateFilenames(formData));
	},
	clearValidationResult() {
		dispatch(clearValidationResult());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(FilenameValidationPage);