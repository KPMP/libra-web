import { connect } from 'react-redux';
import { getPackages, movePackageFiles, getStateDisplayMap } from "../../actions/Packages/packageActions";
import PackageDashboardPage from './PackageDashboardPage';

const mapStateToProps = (state, props) => ({
    packages: state.packages,
    stateDisplayMap: state.stateDisplayMap
});

const mapDispatchToProps = (dispatch, props) => ({
    movePackageFiles(packageId) {
        dispatch(movePackageFiles(packageId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PackageDashboardPage);