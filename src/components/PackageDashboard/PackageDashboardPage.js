import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PackageTable from './PackageTable';

class PackageDashboardPage extends Component {

	render() {
		return ( 
			<Container id='package-dashboard-page'>
				<Row className='mt-3'>
					<Col sm={12}>
						<Link className='float-right' to='/filenameValidation'>
							<Button color="primary">Validate Filenames</Button>
						</Link>
					</Col>
				</Row>
				<Row className='mt-3'>
					<Col sm={12}>
					<PackageTable
						getPackages={this.props.getPackages}
						movePackageFiles={this.props.movePackageFiles}
						stateDisplayMap={this.props.stateDisplayMap}
					/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default PackageDashboardPage;