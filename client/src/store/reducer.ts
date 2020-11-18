import { Reducer } from 'redux';
import {
  ADD_STOCK_TO_LIST, CONVERT_CURRENCY, FETCH_STOCK_ERROR, FETCH_STOCK_REQUEST, FETCH_STOCK_SUCCESS, RESET_SEARCH, SET_CURRENT_RATES, UPDATE_SAVED_STOCKS,
} from './actionTypes';
import utils from '../utils';

const savedStocks = localStorage.getItem('savedStocks');

const initialState = {
  loading: false,
  error: '',
  stockPreview: undefined,
  saved: savedStocks ? JSON.parse(savedStocks) : [],
};

const reducer: Reducer = (state: IState = initialState, { type, payload }: IAction): IState => {
  const { stockPreview, convRates } = state;

  switch (type) {
    case FETCH_STOCK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_STOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        stockPreview: payload,
      };
    case FETCH_STOCK_ERROR:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };

    case RESET_SEARCH:
      return {
        ...state,
        loading: false,
        error: '',
      };

    case ADD_STOCK_TO_LIST:
      if (!payload) return state;
      alert(`${payload.Name} added to list`);
      return {
        ...state,
        saved: [...state.saved, payload],
      };

    case UPDATE_SAVED_STOCKS:
      return {
        ...state,
        saved: payload.newSavedStocks,
      };

    case SET_CURRENT_RATES:
      return {
        ...state,
        convRates: payload,
      };

    case CONVERT_CURRENCY:
      switch (payload?.newCurrency) {
        case 'USD':
          // eslint-disable-next-line no-case-declarations
          if (!stockPreview || !convRates) return state;
          return {
            ...state,
            stockPreview: {
              ...stockPreview,
              Currency: 'USD',
              '52WeekHigh': utils.convertCurrency('USD', stockPreview['52WeekHigh'], convRates),
              '52WeekLow': utils.convertCurrency('USD', stockPreview['52WeekLow'], convRates),
            },
          };
        case 'EUR':
          // eslint-disable-next-line no-case-declarations
          if (!stockPreview || !convRates) return state;
          return {
            ...state,
            stockPreview: {
              ...stockPreview,
              Currency: 'EUR',
              '52WeekHigh': utils.convertCurrency('EUR', stockPreview['52WeekHigh'], convRates),
              '52WeekLow': utils.convertCurrency('EUR', stockPreview['52WeekLow'], convRates),
            },
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default reducer;
