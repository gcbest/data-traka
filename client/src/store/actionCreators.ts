import { Dispatch } from 'redux';
import {
  ADD_STOCK_TO_LIST, CONVERT_CURRENCY, FETCH_STOCK_ERROR, FETCH_STOCK_REQUEST, FETCH_STOCK_SUCCESS, RESET_SEARCH, SET_CURRENT_RATES,
} from './actionTypes';

export function fetchStockRequest(): IAction {
  return {
    type: FETCH_STOCK_REQUEST,
  };
}

export function fetchStockSuccess(stockData: IStockPreview): IAction {
  return {
    type: FETCH_STOCK_SUCCESS,
    payload: stockData,
  };
}

export function fetchStockError(err: string): IAction {
  return {
    type: FETCH_STOCK_ERROR,
    payload: { message: err },
  };
}

export function resetSearch(): IAction {
  return {
    type: RESET_SEARCH,
  };
}

export function queryStock(symbol: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch(fetchStockRequest());
    return fetch(`/api/stock?symbol=${symbol}`)
      .then((res) => res.json())
      .then((res) => {
        const {
          Symbol, Name, Currency, timeSeriesData,
        } = res;

        const previewData: IStockPreview = {
          Symbol,
          Name,
          Currency,
          '52WeekHigh': res['52WeekHigh'],
          '52WeekLow': res['52WeekLow'],
          timeSeriesData,
        };
        dispatch(fetchStockSuccess(previewData));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchStockError('Unable to find stock'));
      });
  };
}

export function saveStock(stockDetails: IStockPreview): IAction {
  return {
    type: ADD_STOCK_TO_LIST,
    payload: stockDetails,
  };
}

export function setConversionRates(convRates: IConvRates): IAction {
  return {
    type: SET_CURRENT_RATES,
    payload: convRates,
  };
}

export function convertCurrency(newCurrency: Currency | string): IAction {
  // const newAction: NewAction = { newCurrency: 'USD', convRates };
  return {
    type: CONVERT_CURRENCY,
    payload: { newCurrency },
  };
}
