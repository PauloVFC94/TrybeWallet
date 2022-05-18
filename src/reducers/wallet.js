import { ADD_CURRENCIES, ADD_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_CURRENCIES:
    return { ...state, ...action };
  case ADD_EXPENSES:
    return { ...state, ...action };
  default:
    return state;
  }
}

export default wallet;
