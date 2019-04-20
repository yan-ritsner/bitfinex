import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TradeCell from "./TradeCell";

export default class TradeRow extends PureComponent {
  render() {
    const row = this.props.row;
    const columns = this.props.columns;
    const className = row.buy ? "trade-buy-row" : "trade-sell-row";
    const icon = row.buy
      ? "fas fa-chevron-up trade-buy-icon"
      : "fas fa-chevron-down trade-sell-icon";
    return (
      <tr className={className}>
        <td>
          <i className={icon} />
        </td>
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
