import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import BookCell from "./BookCell";

export default class BookRow extends PureComponent {
  render() {
    const row = this.props.row;
    const columns = this.props.columns;
    return (
      <tr>
        {columns.map(column => {
          return <BookCell key={column} value={row[column]} />;
        })}
      </tr>
    );
  }
}

BookRow.propTypes = {
  row: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired
};
