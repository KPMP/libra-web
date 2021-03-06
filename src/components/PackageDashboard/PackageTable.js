import React, { Component } from 'react';
import ReactTable from 'react-table';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Button } from 'reactstrap';
import { getStateDisplayText } from './stateDisplayHelper';

const PACKAGE_ID_LABEL = 'Package ID';
const PACKAGE_TYPE_LABEL = 'Package Type';
const SUBMITTER_LABEL = 'Submitter';
const TIS_NAME_LABEL = 'TIS Name';
const DATE_SUBMITTED_LABEL = 'Date Submitted';
const PACKAGE_STATE_LABEL = 'Package State';
const SUBJECT_ID_LABEL = 'Subject Id';
const GLOBUS_LINK_LABEL = 'Globus Link';
const MOVE_PACKAGE_FILES_LABEL = 'Move Files to DLU';

const PACKAGE_ID = '_id';
const SUBMITTER_ID = 'displayName';
const SUBMITTER_FIRST_NAME = 'firstName';
const SUBMITTER_LAST_NAME = 'lastName';
const PACKAGE_TYPE_ID = 'packageType';
const TIS_NAME_ID = 'tisName';
const DATE_SUBMITTED_ID = 'createdAt';
const DATE_FORMAT = 'YYYY-MM-DD, h:mm a z';
const PACKAGE_INFO_PROPERTY = 'packageInfo';
const PACKAGE_STATE_ID = 'state';
const SUBJECT_ID = 'subjectId';
const LARGE_FILE_UPLOAD = 'largeFilesChecked';

// package id, submitter, package type, tis name, date submitted
class PackageTable extends Component {

	constructor(props) {
		super(props);

		this.getColumns = this.getColumns.bind(this);
		this.onSortedChange = this.onSortedChange.bind(this);
		this.onFilteredChange = this.onFilteredChange.bind(this);
		this.resetFilterAndSort = this.resetFilterAndSort.bind(this);
		this.defaultFilterMethod = this.defaultFilterMethod.bind(this);
		this.reactTable = React.createRef();

		this.state = {
			sorted: [],
			filtered: [],
			columns: this.getColumns()
		};
	};

	getColumns() {
		return [
			{
				Header: PACKAGE_ID_LABEL,
				id: PACKAGE_ID,
				accessor: (row) => row[PACKAGE_INFO_PROPERTY][PACKAGE_ID]
			},
			{
				Header: SUBJECT_ID_LABEL,
				id: SUBJECT_ID,
				accessor: (row) => row[PACKAGE_INFO_PROPERTY][SUBJECT_ID]
			},
			{
				Header: PACKAGE_TYPE_LABEL,
				id: PACKAGE_TYPE_ID,
				accessor: (row) => row[PACKAGE_INFO_PROPERTY][PACKAGE_TYPE_ID]
			},
			{
				Header: SUBMITTER_LABEL,
				id: SUBMITTER_ID,
				// eslint-disable-next-line
				accessor: (row) => row[PACKAGE_INFO_PROPERTY].submitter && row[PACKAGE_INFO_PROPERTY].submitter[SUBMITTER_ID] ? row[PACKAGE_INFO_PROPERTY].submitter[SUBMITTER_ID] : row[PACKAGE_INFO_PROPERTY].submitter[SUBMITTER_FIRST_NAME] + ' ' + row[PACKAGE_INFO_PROPERTY].submitter[SUBMITTER_LAST_NAME]
			},
			{
				Header: TIS_NAME_LABEL,
				id: TIS_NAME_ID,
				accessor: (row) => row[PACKAGE_INFO_PROPERTY][TIS_NAME_ID]
			},
			{
				Header: DATE_SUBMITTED_LABEL,
				id: DATE_SUBMITTED_ID,
				accessor: (row) => {
					return new Moment(row[PACKAGE_INFO_PROPERTY][DATE_SUBMITTED_ID])
						.local()
						.format(DATE_FORMAT)
				}
			},
			{
				Header: PACKAGE_STATE_LABEL,
				id: PACKAGE_STATE_ID,
				accessor: (row) => {
					return getStateDisplayText(row.state, this.props.stateDisplayMap);
				}
			}, {
				Header: GLOBUS_LINK_LABEL,
				accessor: 'link',
				filterable: false,
				Cell: (info) => {
					let row = info.original;
					// eslint-disable-next-line
					let href = 'https://app.globus.org/file-manager?origin_id=936381c8-1653-11ea-b94a-0e16720bb42f&origin_path=/PROD_INBOX/' + row[PACKAGE_INFO_PROPERTY][PACKAGE_ID]; 
					// eslint-disable-next-line
					if(row[PACKAGE_INFO_PROPERTY][LARGE_FILE_UPLOAD]) {
						return (
							// eslint-disable-next-line
							<a target='_blank' rel='noopener noreferrer' href={href}>{row[PACKAGE_INFO_PROPERTY][PACKAGE_ID]}</a>
						);
					} else {
						// eslint-disable-next-line
						return '';
					}
				}
			}, {
				Header: MOVE_PACKAGE_FILES_LABEL,
				accessor: 'button',
				filterable: false,
				Cell: (info) => {
					let row = info.original;
					// eslint-disable-next-line
					if(row[PACKAGE_INFO_PROPERTY][LARGE_FILE_UPLOAD] && row.state[PACKAGE_STATE_ID] === 'METADATA_RECEIVED') {
						return (
							// eslint-disable-next-line
							<Button color="primary" onClick={() => this.handleMoveFileClick(row[PACKAGE_INFO_PROPERTY][PACKAGE_ID])}>Move Files</Button>
						);
					} else {
						// eslint-disable-next-line
						return '';
					}
				}
			}
            
		];
	}

	onSortedChange(sorted) {
		ReactGA.event({
			category: 'Data Table',
			action: 'Sort Data'
		});
		this.setState({
			sorted: sorted
		});
	}

	onFilteredChange(filtered) {
		ReactGA.event({
			category: 'Data Table',
			action: 'Filter Data'
		});
		this.setState({
			filtered: filtered
		});
	}

	handleMoveFileClick = (packageId) => {
		this.props.movePackageFiles(packageId);
	};

	defaultFilterMethod(filter, row, column) {
		return row[filter.id] && row[filter.id].toUpperCase().indexOf(filter.value.toUpperCase()) > -1;
	}

	resetFilterAndSort() {
		this.setState({
			sorted: [],
			filtered: []
		});
	}

	render() {
		return <ReactTable
			data={this.props.packages}
			ref={this.reactTable}
			sorted={this.state.sorted}
			filtered={this.state.filtered}
			onSortedChange={this.onSortedChange}
			onFilteredChange={this.onFilteredChange}
			columns={this.state.columns}
			defaultPageSize={12}
			defaultFilterMethod={this.defaultFilterMethod}
			filterable
			className='-striped -highlight'
			showPageSizeOptions={false}
			noDataText={'No packages found'}
		/>;
	}
}

PackageTable.propTypes = {
		packages: PropTypes.arrayOf(PropTypes.object),
		stateDisplayMap: PropTypes.arrayOf(PropTypes.object)
};

export default PackageTable;
