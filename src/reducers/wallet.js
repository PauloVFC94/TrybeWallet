import { ADD_CURRENCIES, ADD_EXPENSES, REMOVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.expenses,
        exchangeRates: action.currencies,
      }],
    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
}

export default wallet;
