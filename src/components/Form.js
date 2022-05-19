import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAPI } from '../actions/index';

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

  render() {
    const { currencies } = this.props;
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
        <button
          type="submit"
          onClick={ this.buttonForm }
          id="btn-form"
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExp: (expenses) => dispatch(getAPI(expenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
