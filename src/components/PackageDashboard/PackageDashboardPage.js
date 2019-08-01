import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PackageTable from './PackageTable';

class PackageDashboardPage extends Component {

    componentDidMount() {
        this.props.getPackages();
    }

    render() {
        return <Container id="package-dashboard-page">
            <Row>
                <Col sm={12}>
                    <PackageTable
                        packages={this.props.packages}
                    />
                </Col>
            </Row>
        </Container>;
    }
}

export default PackageDashboardPage;