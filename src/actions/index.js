export const ADD_USER = 'ADD_USER';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const addUser = (email) => ({
  type: ADD_USER,
  email,
});

export const addCurrencies = (value) => ({
  type: ADD_CURRENCIES,
  value,
});

export const addExpenses = (value) => ({
  type: ADD_EXPENSES,
  value,
});
