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
    numeric: false,
    disablePadding: true,
    label: 'ID'
  },
  { id: 'vessel_name', numeric: false, disablePadding: true, label: 'Vessel' },
  { id: 'containers', numeric: true, disablePadding: true, label: 'Containers' }
];

class VesselPlansTable extends Component {
  static propTypes = {
    vesselPlans: PropTypes.array.isRequired,
    onPlanSelection: PropTypes.func
  };

  onRowChange = vesselPlan => {
    this.props.onPlanSelection(vesselPlan);
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
    const { vesselPlans } = this.props;
    return Object.values(vesselPlans).map(vp => {
      return (
        <TableRow key={vp.id}>
          <TableCell>{vp.id}</TableCell>
          <TableCell>{get(vp, 'vessel.name', '')}</TableCell>
          <TableCell>{get(vp, 'containers.length', 0)}</TableCell>
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

export default VesselPlansTable;
