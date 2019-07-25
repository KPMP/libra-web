import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PackageTable from './PackageTable';

class PackageDashboardPage extends Component {
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