import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { bookPrecision } from "../../actions/bookActions";
import "./PrecisionView.css";

/**
 * Precision view component.
 * Allows to change price precision on the book view.
 */
class PrecisionView extends PureComponent {
  render() {
    return (
      <span className="precision-view">
        Book Precision
        <i className="fas fa-plus" onClick={() => this.minusPrecision()} />
        <i className="fas fa-minus" onClick={() => this.plusPrecision()} />
      </span>
    );
  }

  plusPrecision() {
    this.props.bookPrecision(this.props.precision + 1);
  }

  minusPrecision() {
    this.props.bookPrecision(this.props.precision - 1);
  }
}

PrecisionView.propTypes = {
  precision: PropTypes.number.isRequired,
  bookPrecision: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    precision: state.books.precision
  };
}

function mapDispatchToProps(dispatch) {
  return {
    bookPrecision: bindActionCreators(bookPrecision, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrecisionView);
