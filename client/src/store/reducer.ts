import { Reducer } from 'redux';
import {
  ADD_STOCK_TO_LIST, CONVERT_CURRENCY, FETCH_STOCK_SUCCESS, SET_CURRENT_RATES,
} from './actionTypes';
import utils from '../utils';

const initialState = {
  loading: false,
  error: '',
  stockPreview: undefined,
  saved: [],
};

const reducer: Reducer = (state: IState = initialState, { type, payload }: IAction): IState => {
  const { stockPreview, convRates } = state;

  switch (type) {
    case FETCH_STOCK_SUCCESS:
      return {
        ...state,
        stockPreview: payload,
      };

    case ADD_STOCK_TO_LIST:
      if (!payload) return state;
      alert(`${payload.Name} added to list`);
      return {
        ...state,
        saved: [...state.saved, payload],
      };

    case SET_CURRENT_RATES:
      return {
        ...state,
        convRates: payload,
      };

    case CONVERT_CURRENCY:
      switch (payload?.Currency) {
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
