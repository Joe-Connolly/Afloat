import { DEFAULT_LOCALE } from '../i18n';

export const initialState = DEFAULT_LOCALE;

export default function bankReducer(state = { transactions: null }, action) {
  switch (action.type) {
    case 'FETCH_TRANSACTIONS': {
      if (action.data) {
        return {
          ...state,
          transactions: action.data,
          balance: action.balance,
        };
      }
      return initialState;
    }
    case 'LOAN_HISTORY': {
      if (action.data) {
        return {
          ...state,
          loanHistory: action.data,
        };
      }
      return initialState;
    }
    case 'LOGOUT': {
      return initialState;
    }
    default:
      return state;
  }
}
