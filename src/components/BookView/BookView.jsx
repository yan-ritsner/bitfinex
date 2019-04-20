import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BookTable from "./components/BookTable";
import "./BookView.css";

class BookView extends PureComponent {
  render() {
    const bids = this.props.books.bids;
    const asks = this.props.books.asks;
    return (
      <div className="book-view">
        <div>
          <BookTable data={bids} invert={false} />
        </div>
        <div>
          <BookTable data={asks} invert={true} />
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
