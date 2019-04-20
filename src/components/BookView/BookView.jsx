import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BookTable from "./components/BookTable";
import "./BookView.css";

/**
 * Order Book view component
 */
class BookView extends PureComponent {
  render() {
    const bids = this.props.books.sortedBids;
    const asks = this.props.books.sortedAsks;
    const total = this.props.books.total;
    const zoom = this.props.books.zoom;
    return (
      <div className="book-view">
        <div>
          <BookTable data={bids} total={total} invert={false} zoom={zoom} />
        </div>
        <div>
          <BookTable data={asks} total={total} invert={true} zoom={zoom} />
        </div>
      </div>
    );
  }
}

BookView.propTypes = {
  books: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    books: state.books
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookView);
