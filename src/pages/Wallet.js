import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getCurrenciesThunk } from '../actions/index';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesThunk());
  }

  render() {
    return (
      <div>
        <Header />
        <Form />
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Wallet);
