import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./TickerView.css";

class TickerView extends PureComponent {
  render() {
    const symbol = this.props.symbol;
    const data = this.props.ticker.data;
    return (
      <div className="ticker-view">
        <table>
          <tbody>
            <tr>
              <td>{symbol.toUpperCase()}</td>
              <td>{data.lastPrice}</td>
            </tr>
            <tr>
              <td>{data.volume}</td>
              <td>{`${data.dailyChange} (${data.dailyChangePerc}%)`}</td>
            </tr>
            <tr>
              <td>{`LOW ${data.low}`}</td>
              <td>{`HIGH ${data.high}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

TickerView.propTypes = {
  symbol: PropTypes.string.isRequired,
  ticker: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    symbol: state.symbols.selectedSymbol,
    ticker: state.ticker
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TickerView);
