import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TradeRow from "./TradeRow";

const columns = ["time", "price", "amount"];

export default class TradeTable extends PureComponent {
  render() {
    const data = this.props.data;

    return (
      <table>
        <thead>
          <tr>
            <th />
            {columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(trade => (
            <TradeRow key={trade.id} row={trade} columns={columns} />
          ))}
        </tbody>
      </table>
    );
  }
}

TradeTable.propTypes = {
  data: PropTypes.array.isRequired
};
