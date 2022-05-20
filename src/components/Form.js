import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAPI, editExpense, editExpense2 } from '../actions/index';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {},
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  handleChangerForm = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value,
    }, () => {
      const { id, value, currency, method, tag, description } = this.state;
      this.setState({
        expense: {
          id,
          value,
          currency,
          method,
          tag,
          description,
        },
      });
    });
  };

  buttonForm = (event) => {
    event.preventDefault();
    const { addExp } = this.props;
    const { id, expense } = this.state;
    addExp(expense);
    this.setState({
      id: (id + 1),
      value: 0,
      description: '',
    });
  };

  buttonEdit = (event) => {
    event.preventDefault();
    const { editExp2, editExp, edit, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const auxiliar = [...expenses];
    const indexObj = expenses.indexOf(expenses
      .find((despesa) => despesa.id === edit.obj));
    const taxes = expenses[indexObj].exchangeRates;
    auxiliar[indexObj] = {
      id: edit.obj,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: taxes,
    };
    editExp2(auxiliar);
    const edit1 = false;
    editExp(edit1);
  }

  render() {
    const { currencies, edit } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            data-testid="value-input"
            name="value"
            id="value"
            value={ value }
            onChange={ this.handleChangerForm }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleChangerForm }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChangerForm }
          >
            {currencies.map((element) => (
              <option
                key={ element }
                value={ element }
              >
                { element }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChangerForm }
          >
            <option>Dinheiro</option>
            <option>Cartão de débito</option>
            <option>Cartão de crédito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChangerForm }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        { edit === false ? (
          <button
            type="submit"
            onClick={ this.buttonForm }
            id="btn-form"
          >
            Adicionar Despesa
          </button>
        ) : (
          <button
            type="submit"
            onClick={ this.buttonEdit }
            id="btn-form-edit"
          >
            Editar despesa
          </button>
        )}
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExp: PropTypes.func.isRequired,
  editExp: PropTypes.func.isRequired,
  editExp2: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  edit: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExp: (expenses) => dispatch(getAPI(expenses)),
  editExp: (expenses) => dispatch(editExpense(expenses)),
  editExp2: (expenses) => dispatch(editExpense2(expenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
