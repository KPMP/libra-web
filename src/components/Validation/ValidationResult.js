import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { generateTableRows } from './validationResultHelper';

class ValidationFailure extends Component {
	
	
	render() {
		
		let rows = generateTableRows(this.props.result);
		let message = 'Validation Failed!';
		let imgSrc = 'img/fail-kidneys.jpg';
		let altText = 'Filname mismatch';
		if (this.props.isSuccess) {
			message = 'Validation Success!';
			imgSrc = 'img/happy-kidneys.jpg';
			altText = 'Filename match';
		}
		
		return (
			<Container>
				<Row className='mt-3'>
					<Col sm={3} >
						<img
							src={imgSrc}
							alt={altText}
							className='validationImage'
						/>
					</Col>
					<Col sm={9}>
						<h3 className='validationMessage'>{message}</h3>
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

export default ValidationFailure;