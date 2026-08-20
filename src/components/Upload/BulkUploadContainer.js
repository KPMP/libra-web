import { connect } from 'react-redux'
import BulkUpload from './BulkUpload';

const mapStateToProps = (state, props) => ({
    isUploading: state.isUploading
});

const mapDispatchToProps = (dispatch, props) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(BulkUpload);