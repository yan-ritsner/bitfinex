import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import BookRow from "./BookRow";

const columns = ["count", "amount", "price"];
const invertColumns = columns.slice().reverse();

const comparer = (a, b) => b - a;
const invertComparer = (a, b) => a - b;

export default class BookTable extends PureComponent {
  render() {
    const data = this.props.data;
    const invert = this.props.invert;

    const dataColumns = invert ? invertColumns : columns;
    const dataComparer = invert ? invertComparer : comparer;
    const prices = Object.keys(data).sort(dataComparer);

    return (
      <table>
        <thead>
          <tr>
            {dataColumns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {prices.map(price => (
            <BookRow key={price} row={data[price]} columns={dataColumns} />
          ))}
        </tbody>
      </table>
    );
  }
}

BookTable.propTypes = {
  data: PropTypes.object.isRequired,
  invert: PropTypes.bool.isRequired
};
