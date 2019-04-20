import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class BookCell extends PureComponent {
  render() {
    const value = this.props.value;
    return <td>{value}</td>;
  }
}

BookCell.propTypes = {
  value: PropTypes.any.isRequired
};
