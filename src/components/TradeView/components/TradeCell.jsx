import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class TradeCell extends PureComponent {
  render() {
    const row = this.props.row;
    const column = this.props.column;
    return <td>{row[column]}</td>;
  }
}

TradeCell.propTypes = {
  row: PropTypes.object.isRequired,
  column: PropTypes.string.isRequired
};
