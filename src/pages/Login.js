import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
  }

  handleChanger = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => {
        const { email, password } = this.state;
        const minPassword = 6;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.setState({
          isDisable: !(regex.test(email) && password.length >= minPassword),
        });
      });
  };

  btnFunction = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addUser(email));

    history.push('/carteira');
  }

  render() {
    const { isDisable, email, password } = this.state;
    return (
      <div>
        <input
          type="text"
          onChange={ this.handleChanger }
          placeholder="E-mail"
          data-testid="email-input"
          name="email"
          value={ email }
        />
        <input
          type="password"
          name="password"
          onChange={ this.handleChanger }
          placeholder="Senha"
          data-testid="password-input"
          value={ password }
        />
        <button
          type="submit"
          onClick={ this.btnFunction }
          disabled={ isDisable }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect()(Login);
