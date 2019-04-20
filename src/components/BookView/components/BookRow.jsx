import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import BookCell from "./BookCell";

export default class BookRow extends PureComponent {
  render() {
    const row = this.props.row;
    const columns = this.props.columns;
    return (
      <tr>
        {columns.map(column => (
          <BookCell key={column} row={row} column={column} />
        ))}
      </tr>
    );
  }
}

BookRow.propTypes = {
  row: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired
};
