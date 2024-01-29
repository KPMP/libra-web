import React, { Component } from 'react';
import ReactTable from 'react-table';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Row, Col, Button } from 'reactstrap';
import { getStateDisplayText } from './stateDisplayHelper';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPackagesStateless } from '../../actions/Packages/packageActions';

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
const GLOBUS_MOVE_STATUS = "globusMoveStatus";
const ERROR_MESSAGE = "errorMessage";

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
			columns: [],
			packages: [],
			isLoaded: false
		};
	};

	async componentDidMount() {
		await this.getPackages();
	}

	async getPackages() {
		let packages = await getPackagesStateless();
		
		console.log("packages received")
		this.setState({packages: packages, isLoaded: true});
	}

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
					let href = 'https://app.globus.org/file-manager?origin_id=d4560298-72ed-11ec-bdef-55fe55c2cfea&origin_path=/PROD_INBOX/' + row[PACKAGE_INFO_PROPERTY][PACKAGE_ID]; 
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
						if(row[GLOBUS_MOVE_STATUS] === null || row[GLOBUS_MOVE_STATUS] === ""){
							return (
								// eslint-disable-next-line
								<Button color="primary" onClick={() => this.handleMoveFileClick(row[PACKAGE_INFO_PROPERTY][PACKAGE_ID])}>Move Files</Button>
							);
						}
						else if (row[GLOBUS_MOVE_STATUS].toLowerCase() === "processing" || row[GLOBUS_MOVE_STATUS].toLowerCase() === "waiting") {
							return (
								<p>awaiting move</p>
							);
						}
						else if (row[GLOBUS_MOVE_STATUS].toLowerCase() === "error"){
							return (
								<p>{row[ERROR_MESSAGE]}</p>
							);
						}
						else if (row[GLOBUS_MOVE_STATUS].toLowerCase() === "success") {
							return '';
						}
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

	prepareData = () => {
		console.log(this.state.packages)
		return this.state.packages.map((pkg) => {
			return {
				[PACKAGE_ID_LABEL]: pkg[PACKAGE_INFO_PROPERTY][PACKAGE_ID],
				[SUBJECT_ID_LABEL]: pkg[PACKAGE_INFO_PROPERTY][SUBJECT_ID],
				[PACKAGE_TYPE_LABEL]: pkg[PACKAGE_INFO_PROPERTY][PACKAGE_TYPE_ID],
				[SUBMITTER_LABEL]: pkg[PACKAGE_INFO_PROPERTY].submitter && pkg[PACKAGE_INFO_PROPERTY].submitter[SUBMITTER_ID] ? pkg[PACKAGE_INFO_PROPERTY].submitter[SUBMITTER_ID] : pkg[PACKAGE_INFO_PROPERTY].submitter[SUBMITTER_FIRST_NAME] + ' ' + pkg[PACKAGE_INFO_PROPERTY].submitter[SUBMITTER_LAST_NAME],
				[TIS_NAME_LABEL]: pkg[PACKAGE_INFO_PROPERTY][TIS_NAME_ID],
				[DATE_SUBMITTED_LABEL]: new Moment(pkg[PACKAGE_INFO_PROPERTY][DATE_SUBMITTED_ID]).local().format(DATE_FORMAT),
				[PACKAGE_STATE_LABEL]: getStateDisplayText(pkg.state, this.props.stateDisplayMap)
			}
		});
	}

	render() {
		console.log(this.state.isLoaded)
		if (!this.state.isLoaded) {
			return (
				<h4>Loading packages...</h4>
			)
		} else {
			this.setState({columns: this.getColumns()});
			return (
				<article>
				<Row><Col xs={12} className='mb-2'>
					<CSVLink
						data={this.prepareData()}
						filename={'dmd-package-info.csv'}
						target="_blank"
						className="text-body icon-container"
					>
						<FontAwesomeIcon icon={faDownload} pull='right' />
					</CSVLink>
				</Col></Row>
				<Row><Col xs={12}>
					<ReactTable
						data={this.state.packages}
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
					/>
				</Col></Row>
			</article>
			);
		}
	}
}

PackageTable.propTypes = {
	stateDisplayMap: PropTypes.arrayOf(PropTypes.object)
};

export default PackageTable;
