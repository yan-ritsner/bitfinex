import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import BookRow from "./BookRow";
import BookBar from "./BookBar";

const columns = ["count", "amount", "total", "price"];
const invertColumns = columns.slice().reverse();

export default class BookTable extends PureComponent {
  render() {
    return (
      <div>
        {this.renderTableBars()}
        {this.renderTableData()}
      </div>
    );
  }

  renderTableData() {
    const data = this.props.data;
    const invert = this.props.invert;
    const dataColumns = invert ? invertColumns : columns;
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
          {data.map(row => {
            return <BookRow key={row.price} row={row} columns={dataColumns} />;
          })}
        </tbody>
      </table>
    );
  }

  renderTableBars() {
    const data = this.props.data;
    const total = this.props.total;
    const invert = this.props.invert;
    const zoom = this.props.zoom;
    const className =
      "book-view-bars " + (invert ? "book-view-bars-invert" : "");
    return (
      <div className={className}>
        <table>
          <thead>
            <tr>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map(row => {
              let percent = (total === 0 ? 0 : row.total / total) * 100 * zoom;
              if (percent > 100) percent = 100;
              return <BookBar key={row.price} percent={percent} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

BookTable.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  invert: PropTypes.bool.isRequired,
  zoom: PropTypes.number.isRequired
};
