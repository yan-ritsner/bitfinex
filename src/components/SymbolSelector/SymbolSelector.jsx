import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getSymbols, selectSymbol } from "../../actions/symbolActions";

class SymbolSelector extends Component {
  componentDidMount() {
    const { symbols, getSymbols } = this.props;
    if (symbols.data.length === 0 && !symbols.requested) {
      getSymbols();
    }
  }

  render() {
    const { symbols } = this.props;
    const value = symbols.selectedSymbol ? symbols.selectedSymbol : "";
    return (
      <select value={value} onChange={e => this.onChange(e)}>
        <option value="" disabled>
          Select symbol...
        </option>
        {symbols.data.map(symbol => (
          <option key={symbol} value={symbol}>
            {symbol.toUpperCase()}
          </option>
        ))}
      </select>
    );
  }

  onChange(e) {
    this.props.selectSymbol(e.target.value);
  }
}

SymbolSelector.propTypes = {
  symbols: PropTypes.object.isRequired,
  getSymbols: PropTypes.func.isRequired,
  selectSymbol: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    symbols: state.symbols
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSymbols: bindActionCreators(getSymbols, dispatch),
    selectSymbol: bindActionCreators(selectSymbol, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SymbolSelector);
