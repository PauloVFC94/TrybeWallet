import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenses } from '../actions/index';

class Table extends Component {
  removeBtn = ({ target }) => {
    const { expenses, removeExp } = this.props;
    const objDel = target.value;
    const base = expenses.filter((element) => element.description !== objDel);
    removeExp(base);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {expenses.map((despesa) => {
            const objCurrencies = Object.entries(despesa.exchangeRates)
              .find((element) => element[1].code === despesa.currency)[1];
            return (
              <tr key={ despesa.id }>
                <td>{ despesa.description }</td>
                <td>{ despesa.tag }</td>
                <td>{ despesa.method }</td>
                <td>{ Number(despesa.value).toFixed(2) }</td>
                <td>{ objCurrencies.name }</td>
                <td>{ Number(objCurrencies.ask).toFixed(2) }</td>
                <td>{ Number(despesa.value * objCurrencies.ask).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button
                    value={ despesa.description }
                    onClick={ this.removeBtn }
                    type="button"
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExp: (expenses) => dispatch(removeExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
