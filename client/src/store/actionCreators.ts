import { Dispatch } from 'redux';
import { ADD_STOCK_TO_LIST, FETCH_STOCK_REQUEST, FETCH_STOCK_SUCCESS } from './actionTypes';

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
        const { Symbol, Name } = res;
        const previewData: IStockPreview = {
          Symbol,
          Name,
          '52WeekHigh': res['52WeekHigh'],
          '52WeekLow': res['52WeekLow'],
        };
        dispatch(fetchStockSuccess(previewData));
      });
  };
}

export function saveStock(stockDetails: IStockPreview): IAction {
  return {
    type: ADD_STOCK_TO_LIST,
    payload: stockDetails,
  };
}
