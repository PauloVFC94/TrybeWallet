import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moeda: 'BRL',
    };
  }

  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, expense) => {
      const currentCurrencie = Object.entries(expense.exchangeRates)
        .find((currency) => currency[0] === expense.currency);
      return acc + (expense.value * currentCurrencie[1].ask);
    }, 0);
    const { moeda } = this.state;
    return (
      <header>
        <h2 data-testid="email-field">{ email }</h2>
        <h2 data-testid="total-field">{ total.toFixed(2) }</h2>
        <h2 data-testid="header-currency-field">{ moeda }</h2>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
