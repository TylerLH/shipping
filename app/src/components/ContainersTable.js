import React, { Component } from 'react';
import PropTypes from 'prop-types';
import has from 'lodash/has';
import Table, {
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

const columnData = [
  {
    id: 'container_number',
    numeric: false,
    disablePadding: true,
    label: 'Container Number'
  }
];

class ContainersTable extends Component {
  static propTypes = {
    containers: PropTypes.object.isRequired,
    selectedContainers: PropTypes.object.isRequired,
    isAllSelected: PropTypes.bool.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    onRowToggle: PropTypes.func.isRequired,
    numRows: PropTypes.number.isRequired,
    numSelected: PropTypes.number.isRequired
  };

  onRowChange = container => {
    this.props.onRowToggle(container);
  };

  renderHead() {
    const {
      isAllSelected,
      onSelectAllClick,
      numSelected,
      numRows
    } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < numRows}
              checked={isAllSelected}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(c => <TableCell key={c.id}>{c.label}</TableCell>)}
        </TableRow>
      </TableHead>
    );
  }

  renderRows() {
    const { containers, selectedContainers } = this.props;
    return Object.values(containers).map(c => {
      const isSelected = has(selectedContainers, c.id);
      return (
        <TableRow hover selected={isSelected} key={c.id}>
          <TableCell padding="checkbox">
            <Checkbox
              checked={isSelected}
              onChange={this.onRowChange.bind(this, c)}
            />
          </TableCell>
          <TableCell>{c.container_number}</TableCell>
        </TableRow>
      );
    });
  }

  render() {
    return (
      <div>
        <Table>
          {this.renderHead()}
          <TableBody>{this.renderRows()}</TableBody>
        </Table>
      </div>
    );
  }
}

export default ContainersTable;
