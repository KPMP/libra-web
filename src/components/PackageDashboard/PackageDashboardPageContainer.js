import { connect } from 'react-redux';
import { getPackages, movePackageFiles, getStateDisplayMap } from "../../actions/Packages/packageActions";
import PackageDashboardPage from './PackageDashboardPage';

const mapStateToProps = (state, props) => ({
    packages: state.packages
});

const mapDispatchToProps = (dispatch, props) => ({
    getPackages() {
        dispatch(getPackages());
        dispatch(getStateDisplayMap());
    },
    movePackageFiles(packageId) {
        dispatch(movePackageFiles(packageId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PackageDashboardPage);