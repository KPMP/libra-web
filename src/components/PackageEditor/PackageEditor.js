import React, {Component} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { uploader } from './fineUploader';
import qq from 'fine-uploader/lib/core';
import FileDropzone from './FileDropzone';


class PackageEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
			filesAdded: 0,
			submitClicked: false,
		};

        uploader.methods.reset();
		uploader.params = { hostname: window.location.hostname }
        uploader.on('submit', () => {
			let newCount = this.state.filesAdded + 1;
			this.setState( { filesAdded: newCount } );
			return true;
		});
		
		uploader.on('cancel', () => {
			let newCount = this.state.filesAdded - 1;
			this.setState( { filesAdded: newCount });
			return true;
		});
		
		uploader.on('submit', (id, name) => {
			let files = uploader.methods.getUploads({
			status: [ qq.status.SUBMITTED, qq.status.PAUSED ]});
			
			// The new version of react-scripts sees fileIndex as an unused variable, 
			// though it is...adding a comment to disable erroneous warning
			// eslint-disable-next-line
			for(let fileIndex in files) {
				let existingName = files[fileIndex].name;
				if (existingName === name) {
					alert("You have already selected " + existingName + " to upload.");
					return false;
				}
			}
			return true;
		});
		
		uploader.on('validateBatch', () => {
			if (this.state.submitClicked) {
				return false;
			}
			return true;
		});
		
    }

    handleSubmit = (e) => {
		this.setState({submitClicked: true});
		// let newValues = JSON.parse(JSON.stringify(values).replace(/"\s+|\s+"/g,'"'));	
        
		// this.props.postPackageInformation(newValues, uploader);
		
	}

    render() {
        return (
            <Container>
                <form onSubmit={this.handleSubmit}>
						<Row className='mt-3'>
							<Col sm={3}>
								<label>Package Id:</label>
							</Col>
							<Col sm={9}>
								<input type='text' size={40} ref={(input) => this.packageId = input} onChange={this.handlePackageIdChange}/>
							</Col>
						</Row>
						
                        <Row className={"dropzone btn-smfalse"}>
							<Col md={12}>
								<FileDropzone uploader={uploader} isUploading={this.props.isUploading}/>
							</Col>
						</Row>
                        <Row className='mt-3'>
							<Col sm={3} >
							</Col>
							<Col sm={9}>
								<Button color='primary' type="submit">Submit</Button>
							</Col>
						</Row>
					</form>
            </Container>

        );
    }

}

export default PackageEditor;