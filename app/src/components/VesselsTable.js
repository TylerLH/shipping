import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Table, {
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from 'material-ui/Table';

const columnData = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID'
  },
  { id: 'vessel_name', numeric: false, disablePadding: true, label: 'Name' }
];

class VesselsTable extends Component {
  static propTypes = {
    vessels: PropTypes.object.isRequired
  };

  renderHead() {
    return (
      <TableHead>
        <TableRow>
          {columnData.map(c => <TableCell key={c.id}>{c.label}</TableCell>)}
        </TableRow>
      </TableHead>
    );
  }

  renderRows() {
    const { vessels } = this.props;
    return Object.values(vessels).map(v => {
      return (
        <TableRow key={v.id}>
          <TableCell>{v.id}</TableCell>
          <TableCell>{get(v, 'name', '')}</TableCell>
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

export default VesselsTable;
