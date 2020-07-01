import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

class ValidationFailure extends Component {
	render() {
		return(
			<Container>
				<Row className='mt-3'>
					<Col sm={12}>
						<img
			              src="img/fail-kidneys.jpg"
			              alt="Filename mismatch"
			              id="fail-kidneys"
			            />
					</Col>
				</Row>
			</Container>
				
		)
	}
}

export default ValidationFailure;