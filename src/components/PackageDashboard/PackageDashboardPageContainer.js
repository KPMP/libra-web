import { connect } from 'react-redux';
import PackageDashboardPage from './PackageDashboardPage';

const mapStateToProps = (state, props) => ({
    packages: state.packages
});

const mapDispatchToProps = (dispatch, props) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PackageDashboardPage);