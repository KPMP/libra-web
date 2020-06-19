import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

class FilenameValidationPage extends Component {
	
	handleSubmit(e) {
		console.log('package id is: ' + this.packageId.value);
		console.log('filenames are: ' + this.filenames.value);
		e.preventDefault();
	}
	
	render() {
		return (
			<Container>
				<form onSubmit={this.handleSubmit}>
					<Row className='mt-3'>
						<Col sm={4}>
							<label>Package Id:</label>
						</Col>
						<Col sm={8}>
							<input type='text' ref={(input) => this.packageId = input} />
						</Col>
					</Row>
					<Row className='mt-3'>
						<Col sm={4}>
							<label>Files in metadata spreadsheet:</label>
						</Col>
						<Col sm={8}>
							<textarea rows='10' cols='100' ref={(input) => this.filenames = input} />
						</Col>
					</Row>
					<Row className='mt-3'>
						<Col sm={12} className='float-right'>
							<Button color='primary' type="submit">Submit</Button>
						</Col>
					</Row>
				</form>
			</Container>
		);
	}
	
}

export default FilenameValidationPage;