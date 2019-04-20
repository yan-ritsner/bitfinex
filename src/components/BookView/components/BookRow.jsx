import React, { Component } from "react";
import PropTypes from "prop-types";
import BookCell from "./BookCell";
import { arraysEqual } from "../../../utils/utils";

export default class BookRow extends Component {
  shouldComponentUpdate(nextProps) {
    return arraysEqual(this.props.row, nextProps.row);
  }
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
