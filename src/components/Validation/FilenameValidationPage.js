import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

class FilenameValidationPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			packageId: '',
			filenames: ''
		}
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
	}

	
	render() {
		const { packageId, filenames } = this.state;
		const isEnabled = packageId.length > 0 && filenames.length > 0;
		return (
			<Container>
				<form onSubmit={this.handleSubmit}>
					<Row className='mt-3'>
						<Col sm={4}>
							<label>Package Id:</label>
						</Col>
						<Col sm={8}>
							<input type='text' ref={(input) => this.packageId = input} onChange={this.handlePackageIdChange}/>
						</Col>
					</Row>
					<Row className='mt-3'>
						<Col sm={4}>
							<label>Files in metadata spreadsheet:</label>
						</Col>
						<Col sm={8}>
							<textarea name='filenames' id='filenames' rows='10' cols='100' onChange={this.handleFilenamesChange} ref={(input) => this.filenames = input}/>
						</Col>
					</Row>
					<Row className='mt-3'>
						<Col sm={12} className='float-right'>
							<Button color='primary' type="submit" disabled={!isEnabled}>Validate</Button>
						</Col>
					</Row>
				</form>
			</Container>
		);
	}
	
}

export default FilenameValidationPage;