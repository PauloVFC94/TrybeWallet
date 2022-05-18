import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      moeda: 'BRL',
    };
  }

  render() {
    const { email } = this.props;
    const { total, moeda } = this.state;
    return (
      <header>
        <h2 data-testid="email-field">{ email }</h2>
        <h2 data-testid="total-field">{ total }</h2>
        <h2 data-testid="header-currency-field">{ moeda }</h2>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, null)(Header);
