import { connect } from 'react-redux'
import BulkUpload from './BulkUpload';
import { setIsUploading } from '../../actions/Packages/packageActions';

const mapStateToProps = (state, props) => ({
    isUploading: state.isUploading
});

const mapDispatchToProps = (dispatch, props) => ({
    setIsUploading: (isUploading) => dispatch(setIsUploading(isUploading))
});

export default connect(mapStateToProps, mapDispatchToProps)(BulkUpload);