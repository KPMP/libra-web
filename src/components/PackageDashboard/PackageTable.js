import React, { Component } from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';

const PACKAGE_ID_LABEL = "Packages ID";
const PACKAGE_TYPE_LABEL = "Packages Type";
const SUBMITTER_LABEL = "Submitter";
const TIS_NAME_LABEL = "TIS Name";
const DATE_SUBMITTED_LABEL = "Date Submitted";

const PACKAGE_ID = "id";
const SUBMITTER_ID = "displayName";
const PACKAGE_TYPE_ID = "packageType";
const TIS_NAME_ID = "tisName";
const DATE_SUBMITTED_ID = "createdAt";

// package id, submitter, package type, tis name, date submitted
class PackageTable extends Component {

    constructor(props) {
        super(props);

        this.getColumns = this.getColumns.bind(this);
        this.onSortedChange = this.onSortedChange.bind(this);
        this.onFilteredChange = this.onFilteredChange.bind(this);
        this.resetFilterAndSort = this.resetFilterAndSort.bind(this);
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
                accessor: (row) => row[PACKAGE_ID]
            },
            {
                Header: PACKAGE_TYPE_LABEL,
                id: PACKAGE_TYPE_ID,
                accessor: (row) => row[PACKAGE_TYPE_ID]
            },
            {
                Header: SUBMITTER_LABEL,
                id: SUBMITTER_ID,
                accessor: (row) => row.submitter[SUBMITTER_ID]
            },
            {
                Header: TIS_NAME_LABEL,
                id: TIS_NAME_ID,
                accessor: (row) => row[TIS_NAME_ID]
            },
            {
                Header: DATE_SUBMITTED_LABEL,
                id: DATE_SUBMITTED_ID,
                accessor: (row) => {
                    //TODO format this
                    return row[DATE_SUBMITTED_ID]
                }
            }
        ];
    }

    onSortedChange(sorted) {
        // ReactGA.event({
        //     category: 'Data Table',
        //     action: 'Sort Data'
        // });
        this.setState({
            sorted: sorted
        });
    }

    onFilteredChange(filtered) {
        // ReactGA.event({
        //     category: 'Data Table',
        //     action: 'Filter Data'
        // });
        this.setState({
            filtered: filtered
        });
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
            defaultPageSize={10}
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