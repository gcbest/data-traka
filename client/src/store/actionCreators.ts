import { Dispatch } from 'redux';
import { FETCH_STOCK_REQUEST, FETCH_STOCK_SUCCESS, QUERY_STOCK } from './actionTypes';

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

export function queryStock(symbol: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch(fetchStockRequest());
    return fetch(`/api/stock?symbol=${symbol}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(fetchStockSuccess(res));
      });
  };
}
