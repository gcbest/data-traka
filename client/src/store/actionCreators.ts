import { Dispatch } from 'redux';
import { FETCH_STOCK_REQUEST, FETCH_STOCK_SUCCESS } from './actionTypes';

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
        // eslint-disable-next-line no-debugger
        debugger;
        const previewData: IStockPreview = {
          symbol: res.Symbol,
          name: res.Name,
          high: res['52WeekHigh'],
          low: res['52WeekLow'],
        };
        dispatch(fetchStockSuccess(previewData));
      });
  };
}
