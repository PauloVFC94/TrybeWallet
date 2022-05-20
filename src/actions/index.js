export const ADD_USER = 'ADD_USER';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const EDIT_EXPENSES2 = 'EDIT_EXPENSES2';

export const addUser = (email) => ({
  type: ADD_USER,
  email,
});

export const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  currencies,
});

export const addExpenses = (expenses, currencies) => ({
  type: ADD_EXPENSES,
  expenses,
  currencies,
});

export const removeExpenses = (expenses) => ({
  type: REMOVE_EXPENSES,
  expenses,
});

export const editExpense = (edit) => ({
  type: EDIT_EXPENSES,
  edit,
})

export const editExpense2 = (expenses) => ({
  type: EDIT_EXPENSES2,
  expenses,
})

export const getCurrenciesThunk = () => {
  console.log('tuc');
  return async (dispatch) => {
    const API = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(API);
    const object = await response.json();
    const data = Object.keys(object);
    const currencies = data.filter((item) => item !== 'USDT');
    dispatch(addCurrencies(currencies));
  };
};

export const getAPI = (expense) => {
  console.log('tac');
  return async (dispatch) => {
    const API = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(API);
    const currencies = await response.json();
    dispatch(addExpenses(expense, currencies));
  };
};
