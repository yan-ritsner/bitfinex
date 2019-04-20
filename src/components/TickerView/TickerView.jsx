import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./TickerView.css";

/**
 * Ticker view component.
 */
class TickerView extends PureComponent {
  render() {
    const symbol = this.props.symbol;
    const data = this.props.ticker.data;
    const icon =
      data.dailyChange > 0
        ? "fas fa-caret-up ticker-icon"
        : "fas fa-caret-down ticker-icon";
    const color =
      data.dailyChange > 0 ? "ticker-up-color" : "ticker-down-color";
    const percent = +(data.dailyChangePerc * 100).toFixed(2);
    return (
      <div className="ticker-view">
        <table>
          <tbody>
            <tr>
              <td className="ticker-symbol">{symbol.toUpperCase()}</td>
              <td>{data.lastPrice}</td>
            </tr>
            <tr>
              <td>{data.volume}</td>
              <td className={color}>
                <span>{data.dailyChange}</span>
                <i className={icon} />
                <span>({percent}%)</span>
              </td>
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
