import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class BookCell extends PureComponent {
  render() {
    const row = this.props.row;
    const column = this.props.column;
    return <td>{row[column]}</td>;
  }
}

BookCell.propTypes = {
  row: PropTypes.object.isRequired,
  column: PropTypes.string.isRequired
};
