import React, { Component } from 'react';
import {Row, Col, Input, Button} from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import FileDropzone from './FileDropzone';
import { getUploader} from './fineUploader';
import { Link } from 'react-router-dom';
import qq from 'fine-uploader/lib/core';
ModuleRegistry.registerModules([ AllCommunityModule ]);
let uploader = getUploader(0)
class BulkUpload extends Component {
    constructor(props) {
        super(props);
        this.fileIds = new Set();
        uploader.methods.reset();
		uploader.params = { hostname: window.location.hostname }

        this.handleFileSubmit = () => {
			let newCount = this.state.filesAdded + 1;
			this.setState( { filesAdded: newCount } );
			this.isSubmitDisabled();
			return true;
        };
        uploader.on('submit', this.handleFileSubmit);

        this.handleFileCancel = () => {
			let newCount = this.state.filesAdded - 1;
			this.setState( { filesAdded: newCount });
			this.isSubmitDisabled();
			return true;
        };
        uploader.on('cancel', this.handleFileCancel);

        this.validateFileSubmit = (id, name) => {
			let files = uploader.methods.getUploads({
			status: [ qq.status.SUBMITTED, qq.status.PAUSED ]});

			for(let fileIndex in files) {
				let existingName = files[fileIndex].name;
				if (existingName === name) {
					alert("You have already selected " + existingName + " to upload.");
					return false;
				}
			}
			return true;
        };
        uploader.on('submit', this.validateFileSubmit);

        this.validateUploadBatch = () => {
			if (this.state.submitClicked) {
				return false;
			}
			return true;
        };
        uploader.on('validateBatch', this.validateUploadBatch);

        this.state = {
            rowData: [
                {property: false, name: "Globus only", stateKey: "globusOnly", description: "Create packages in the data lake, move files into Globus, but do not put them in data lake. This leaves the packages available for data manager to review"},
                {property: false, name: "Preserve folder structure", stateKey: "preservePath", description: "Preserve the folder structure"},
                {property: false, name: "Bypass duplicate check", stateKey: "bypassDups", description: "Create new packages even when a package already exists for the package type and redcap_id combination. This is useful for reprocessed segmentation mask data."},
            ],
            globusOnly: false,
            preservePath: false,
            bypassDups: false,
            hasFiles: false,
            submitClicked: false,
            filesAdded: 0
        };
    }

    componentDidMount() {
        uploader.on('statusChange', this.handleUploadStatusChange);
    }

    componentWillUnmount() {
        uploader.off('statusChange', this.handleUploadStatusChange);
        uploader.off('submit', this.handleFileSubmit);
        uploader.off('cancel', this.handleFileCancel);
        uploader.off('submit', this.validateFileSubmit);
        uploader.off('validateBatch', this.validateUploadBatch);
    }

    handleUploadStatusChange = (id, oldStatus, status) => {
        const removedStatuses = [
            uploader.qq.status.CANCELED,
            uploader.qq.status.REJECTED,
        ];
        if (removedStatuses.includes(status)) {
            this.fileIds.delete(id);
        } else {
            this.fileIds.add(id);
        }

        this.setState({hasFiles: this.fileIds.size > 0});
        const activeUploads = uploader.methods.getUploads({
            status: [uploader.qq.status.UPLOADING]
        });
        this.props.setIsUploading(activeUploads.length > 0);
    }

    handleOptionChange = (row, checked) => {
        this.setState((previousState) => ({
            [row.stateKey]: checked,
            rowData: previousState.rowData.map((currentRow) => (
                currentRow.stateKey === row.stateKey
                    ? {...currentRow, property: checked}
                    : currentRow
            )),
        }));
    }

    handleSubmit = () => {
        this.setState({submitClicked: true});
        const selectedOptions = this.state.rowData
            .filter((row) => row.property)
            .map((row) => row.name);
        const message = selectedOptions.length > 0
            ? `You selected: ${selectedOptions.join(', ')}`
            : 'You did not select any options.';

        alert(message);
        uploader.methods.uploadStoredFiles();
    }

    isFormValid() {

	}
    isSubmitDisabled = () => {
        return !this.state.hasFiles;

    }
    getColumns = () => {
        let columns = [];
        columns.push(
            {
                field: 'property',
                headerName: 'Enable?',
                width: 100,
                minWidth: 100,
                maxWidth: 100,
                cellStyle: {textAlign: 'center'},
                cellRenderer: (params) => {
                    return (
                        <Input
                            type="checkbox"
                            name={params.data.stateKey}
                            checked={params.data.property}
                            aria-label={params.data.name}
                            onChange={(event) => this.handleOptionChange(params.data, event.target.checked)}
                        />
                    );
                }
            }, 
            {
                field: 'name',
                headerName: 'Name',
                width: 200,
                minWidth: 200,
                maxWidth: 200,
            },
            {
                field: 'description',
                headerName: 'Description',
            }
        ) 
        return columns;

    }

    render() {
        return (
            <article id="dynamicUploadForm" className="upload-form-section container justify-content-center pt-4">
                <h4>STEP 1: Provide the upload information</h4>
                    <div className="ag-theme-material img-fluid">
                        <AgGridReact
                            rowData={this.state.rowData}
                            columnDefs={this.getColumns()}
                            domLayout='autoHeight'
                            onGridReady={this.onGridReady}
                            autoSizeStrategy={{type: 'fitGridWidth'}}
                            id="uploadOptionsTable"
                        />
                    </div>
                <h4>STEP 2: Add YAML/YML files only</h4>
                    <Row className={"dropzone btn-sm"}>
					    <Col md={12}>
						    <FileDropzone uploader={uploader} isUploading={this.props.isUploading}/>
					    </Col>
				    </Row>
                <h4>STEP 3: Submit the upload</h4>                  
                <Row className="fixed-bottom pt-4" id="form-footer">
					<div className="container justify-content-center">
						<Row className="text-center">
							<Col md={12}>
								<Link to="/">
									<Button id="cancel" className="mr-3">Cancel</Button>
								</Link>
								<Button id="submit" disabled={this.isSubmitDisabled()} color="primary" onClick={this.handleSubmit}>Submit</Button>
							</Col>
						</Row>
					</div>
				</Row>
            </article>
        );
    }
}
export default BulkUpload;