import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TradeTable from "./components/TradeTable";
import "./TradeView.css";

class TradeView extends PureComponent {
  render() {
    const data = this.props.trades.data;

    return (
      <div className="book-view">
        <TradeTable data={data} />
      </div>
    );
  }
}

TradeView.propTypes = {
  trades: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    trades: state.trades
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeView);
