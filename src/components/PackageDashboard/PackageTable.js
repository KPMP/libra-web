import React, { Component } from 'react';
import ReactTable from 'react-table';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import Moment from 'moment';
import stateMap from './stateMap';

const PACKAGE_ID_LABEL = "Package ID";
const PACKAGE_TYPE_LABEL = "Package Type";
const SUBMITTER_LABEL = "Submitter";
const TIS_NAME_LABEL = "TIS Name";
const DATE_SUBMITTED_LABEL = "Date Submitted";
const PACKAGE_STATE_LABEL = "Package State";

const PACKAGE_ID = "_id";
const SUBMITTER_ID = "displayName";
const SUBMITTER_FIRST_NAME = "firstName";
const SUBMITTER_LAST_NAME = "lastName";
const PACKAGE_TYPE_ID = "packageType";
const TIS_NAME_ID = "tisName";
const DATE_SUBMITTED_ID = "createdAt";
const DATE_FORMAT = "YYYY-MM-DD, h:mm a z";
const PACKAGE_INFO_PROPERTY = "packageInfo";
const PACKAGE_STATE_ID = "state";

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
                Header: PACKAGE_TYPE_LABEL,
                id: PACKAGE_TYPE_ID,
                accessor: (row) => row[PACKAGE_INFO_PROPERTY][PACKAGE_TYPE_ID]
            },
            {
                Header: SUBMITTER_LABEL,
                id: SUBMITTER_ID,
                accessor: (row) => row[PACKAGE_INFO_PROPERTY].submitter && row[PACKAGE_INFO_PROPERTY].submitter[SUBMITTER_ID] ? row[PACKAGE_INFO_PROPERTY].submitter[SUBMITTER_ID] : row[PACKAGE_INFO_PROPERTY].submitter[SUBMITTER_FIRST_NAME] + " " + row[PACKAGE_INFO_PROPERTY].submitter[SUBMITTER_LAST_NAME]
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
                    if (row.state && row.state[PACKAGE_STATE_ID]) {
                        return stateMap.has(row.state[PACKAGE_STATE_ID]) ? stateMap.get(row.state[PACKAGE_STATE_ID]) : row.state[PACKAGE_STATE_ID];
                    } else
                        return ""
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
            className="-striped -highlight"
            showPageSizeOptions={false}
            noDataText={"No packages found"}
        />;
    }
}

PackageTable.propTypes = {
    packages: PropTypes.arrayOf(PropTypes.object)
};

export default PackageTable;
