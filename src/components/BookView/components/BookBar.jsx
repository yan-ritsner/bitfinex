import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class BookBar extends PureComponent {
  render() {
    const percent = this.props.percent;
    return (
      <tr>
        <td>
          <div className="book-view-bar">
            <div style={{ width: `${percent}%` }} />
          </div>
        </td>
      </tr>
    );
  }
}

BookBar.propTypes = {
  percent: PropTypes.number.isRequired
};
