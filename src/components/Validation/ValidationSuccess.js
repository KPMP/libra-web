import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class ValidationSuccess extends Component {
	
	generateTableRows(filesProvided, filesFound) {
		let rows = [];
		for (let i=0; i< filesProvided.length; i++) {
			let fileProvided = filesProvided[i];
			let fileFound = filesFound[i];
			rows.push( 
				<Row className='mt-3'>
					<Col sm={6}>
						{fileProvided}
					</Col>
					<Col sm={6}>
						{fileFound}
					</Col>
				</Row>
			);
		}
		return rows;
	}
	
	render() {
		let metadataFileName = '';
		let filesProvided = this.props.result.filesFromMetadata.sort();
		let filesFound = this.props.result.filesInGlobus.sort();
		let metadataFileIndex = filesFound.findIndex((file) => file.startsWith('METADATA'));
		if (metadataFileIndex > -1) {
			metadataFileName = filesFound[metadataFileIndex];
			filesFound.splice(metadataFileIndex, 1);
		}
		let rows = this.generateTableRows(filesProvided, filesFound);
		
		return (
			<Container>
				<Row className='mt-3'>
					<Col sm={2} >
						<img
							src="img/happy-kidneys.jpg"
							alt="Filename match"
							id="happy-kidneys"
							className='validationImage'
			            />
					</Col>
					<Col sm={10}>
						<h3 className='validationMessage'>Validation Success!</h3>
					</Col>
				</Row>
				<Row className='mt-3'>
					<Col sm={12}>
						<span className='heavierText'>Package Id:</span> {this.props.result.packageId}
					</Col>
				</Row>
				
				<Row className='mt-3'>
					<Col sm={6} className='resultHeader'>
						Files Provided
					</Col>
					<Col sm={6} className='resultHeader'>
						Files Found
					</Col>
				</Row>
				{rows}
				{metadataFileName !== '' &&
					<Row className='mt-3'>
						<Col sm={6}>
						
						</Col>
						<Col sm={6}>
							{metadataFileName}
						</Col>
					</Row>
					
				}
				<Row className='mt-4'>
					<Col sm={6}>
						<Link to='/filenameValidation'>
							<Button color="primary" onClick={this.props.clearValidationResult}>Let's do it again!</Button>
						</Link>
					</Col>
					<Col sm={6}>
						<Link to='/'>
							<Button color="primary">Done for now</Button>
						</Link>
					</Col>
				</Row>
			</Container>	
		);
	}
}

export default ValidationSuccess;