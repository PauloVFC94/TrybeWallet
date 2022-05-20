import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';
import trybewallet from './trybewallet-form.png';

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
      <header className="header-div">
        <img src={ trybewallet } alt="trybewallet logo" />
        <div className="header-email">
          <label htmlFor="email-header">
            Usuário:
            <h3 name="email-header" data-testid="email-field">{ email }</h3>
          </label>
          <label htmlFor="header-values">
            Saldo de dívidas:
            <div className="header-values" name="header-values">
              <h3 data-testid="total-field">{ total.toFixed(2) }</h3>
              <h3 data-testid="header-currency-field">{ moeda }</h3>
            </div>
          </label>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
