import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { bookZoom } from "../../actions/bookActions";
import "./ZoomView.css";

/**
 * Zoom view component.
 * Allows to change zoom in book depth visualization.
 */
class ZoomView extends PureComponent {
  render() {
    return (
      <span className="zoom-view">
        Zoom Book
        <i className="fas fa-search-plus" onClick={() => this.zoomIn()} />
        <i className="fas fa-search-minus" onClick={() => this.zoomOut()} />
      </span>
    );
  }

  zoomIn() {
    this.props.bookZoom(this.props.zoom + 1);
  }

  zoomOut() {
    this.props.bookZoom(this.props.zoom - 1);
  }
}

ZoomView.propTypes = {
  zoom: PropTypes.number.isRequired,
  bookZoom: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    zoom: state.books.zoom
  };
}

function mapDispatchToProps(dispatch) {
  return {
    bookZoom: bindActionCreators(bookZoom, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZoomView);
