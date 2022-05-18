import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: 0,
      moeda: '',
      pagamento: '',
      categoria: '',
      description: '',
    };
  }

  render() {
    const { currencies } = this.props;
    const { valor, moeda, pagamento, categoria, description } = this.state;
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input
            type="number"
            data-testid="value-input"
            name="valor"
            id="valor"
            value={ valor }
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
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select
            name="moeda"
            id="moeda"
            value={ moeda }
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
        <label htmlFor="pagamento">
          Método de Pagamento
          <select
            data-testid="method-input"
            name="pagamento"
            id="pagamento"
            value={ pagamento }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Débito">Cartão de débito</option>
            <option value="Cartão de Crédito">Cartão de crédito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria
          <select
            data-testid="tag-input"
            name="categoria"
            id="categoria"
            value={ categoria }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(Form);
