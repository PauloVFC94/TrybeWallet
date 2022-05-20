import { ADD_CURRENCIES, ADD_EXPENSES, EDIT_EXPENSES, REMOVE_EXPENSES, EDIT_EXPENSES2 } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: [],
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
  case EDIT_EXPENSES:
    return {
    ...state,
    edit: action.edit,
    }
  case EDIT_EXPENSES2:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
}

export default wallet;
