import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TradeCell from "./TradeCell";

export default class TradeRow extends PureComponent {
  render() {
    const row = this.props.row;
    const columns = this.props.columns;
    return (
      <tr>
        {columns.map(column => (
          <TradeCell key={column} row={row} column={column} />
        ))}
      </tr>
    );
  }
}

TradeRow.propTypes = {
  row: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired
};
