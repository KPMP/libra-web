import React, { Component } from 'react';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import ValidationResult from './ValidationResult';

class FilenameValidationPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			packageId: '',
			filenames: ''
		};
		this.props.clearValidationResult();
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handlePackageIdChange = (event) => {
		this.setState({ packageId: event.target.value });
	}
	
	handleFilenamesChange = (event) => {
		this.setState({ filenames: event.target.value });
	}
	
	handleSubmit(e) {
		e.preventDefault();
		this.props.validateFilenames(this.state);
	}

	
	render() {
		const { packageId, filenames } = this.state;
		const isEnabled = packageId.length > 0 && filenames.length > 0;
		if (Object.keys(this.props.validationResult).length !== 0 && this.props.validationResult.constructor === Object && this.props.validationResult.directoryExists) {
			let filesNotInGlobus = this.props.validationResult.metadataFilesNotFoundInGlobus;
			let filesNotInMetadata = this.props.validationResult.globusFilesNotFoundInMetadata;
			let isSuccess = !filesNotInGlobus && !filesNotInMetadata;
			
			return (
				<ValidationResult
					result={this.props.validationResult}
					clearValidationResult={this.props.clearValidationResult}
					isSuccess={isSuccess}
				/>
			);
			
		} else {
			return (
				<Container>
					{Object.keys(this.props.validationResult).length !== 0 && this.props.validationResult.constructor === Object && !this.props.validationResult.directoryExists &&

						<Alert color="danger">
							The package directory doesn't exist in Globus!
						</Alert>

					}
					<form onSubmit={this.handleSubmit}>
						<Row className='mt-3'>
							<Col sm={3}>
								<label>Package Id:</label>
							</Col>
							<Col sm={9}>
								<input type='text' size={40} ref={(input) => this.packageId = input} onChange={this.handlePackageIdChange}/>
							</Col>
						</Row>
						<Row className='mt-3'>
							<Col sm={3}>
								<label>Files in metadata spreadsheet:</label>
								(Separated by either newlines or commas)
							</Col>
							<Col sm={9}>
								<textarea name='filenames' id='filenames' rows='10' cols='100' onChange={this.handleFilenamesChange} ref={(input) => this.filenames = input}/>
							</Col>
						</Row>
						<Row className='mt-3'>
							<Col sm={3} >
							</Col>
							<Col sm={9}>
								<Button color='primary' type="submit" disabled={!isEnabled}>Validate</Button>
							</Col>
						</Row>
					</form>
				</Container>
			);
		}
	}
	
}

export default FilenameValidationPage;