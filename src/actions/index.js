export const ADD_USER = 'ADD_USER';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const addUser = (email) => ({
  type: ADD_USER,
  email,
});

export const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  currencies,
});

export const addExpenses = (value) => ({
  type: ADD_EXPENSES,
  value,
});

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
