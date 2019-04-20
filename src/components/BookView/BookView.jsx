import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class BookView extends Component {
  render() {
    return (
      <div>
        {this.renderBids()}
        {this.renderAsks()}
      </div>
    );
  }

  renderBids() {
    const bids = this.props.books.bids;
    const prices = Object.keys(bids);
    return (
      <table>
        <thead>
          <tr>
            <th>Count</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {prices.map(price => {
            const bid = bids[price];
            return (
              <tr key={price}>
                <td>{bid.count}</td>
                <td>{bid.amount}</td>
                <td>{bid.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  renderAsks() {
    const asks = this.props.books.asks;
    const prices = Object.keys(asks);
    return (
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Amount</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {prices.map(price => {
            const ask = asks[price];
            return (
              <tr key={price}>
                <td>{ask.price}</td>
                <td>{ask.amount}</td>
                <td>{ask.count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
