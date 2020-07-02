import { connect } from 'react-redux';
import { getPackages, movePackageFiles } from "../../actions/Packages/packageActions";
import PackageDashboardPage from './PackageDashboardPage';

const mapStateToProps = (state, props) => ({
    packages: state.packages
});

const mapDispatchToProps = (dispatch, props) => ({
    getPackages() {
        dispatch(getPackages());
    },
    movePackageFiles(packageId) {
        dispatch(movePackageFiles(packageId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PackageDashboardPage);