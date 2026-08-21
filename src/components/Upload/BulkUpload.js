import React, { Component } from 'react';
import {Row, Col, Input, Container, Button} from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([ AllCommunityModule ]);
class BulkUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: [
                {property: false, name: "Globus only", stateKey: "globusOnly", description: "Create packages in the data lake, move files into Globus, but do not put them in data lake. This leaves the packages available for data manager to review"},
                {property: false, name: "Preserve folder structure", stateKey: "preservePath", description: "Preserve the folder structure"},
                {property: false, name: "Bypass duplicate check", stateKey: "bypassDups", description: "Create new packages even when a package already exists for the package type and redcap_id combination. This is useful for reprocessed segmentation mask data."},
            ],
            globusOnly: false,
            preservePath: false,
            bypassDups: false,
            submitDisabled: false,
        };
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
        const selectedOptions = this.state.rowData
            .filter((row) => row.property)
            .map((row) => row.name);
        const message = selectedOptions.length > 0
            ? `You selected: ${selectedOptions.join(', ')}`
            : 'You did not select any options.';

        alert(message);
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
            <div className='height-wrapper mb-3 mt-3'>
                <Container id='outer-wrapper'>
                    <Row xs='12' id="uploadOptionsTable">
                        <Col xs='12'>
                            <div className="ag-theme-material img-fluid">
                                <AgGridReact
                                    rowData={this.state.rowData}
                                    columnDefs={this.getColumns()}
                                    domLayout='autoHeight'
                                    onGridReady={this.onGridReady}
                                    autoSizeStrategy={{type: 'fitGridWidth'}}
                                />
                            </div>
                                            
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' className='text-center mt-3'>
                            <Button color='primary' onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default BulkUpload;