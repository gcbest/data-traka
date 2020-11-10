import { Reducer } from 'redux';
import { FETCH_STOCK_SUCCESS } from './actionTypes';

const initialState = {
  loading: false,
  error: '',
  stockPreview: undefined,
  saved: [],
};

const reducer: Reducer = (state: IState = initialState, { type, payload }: IAction): IState => {
  switch (type) {
    case FETCH_STOCK_SUCCESS:
      return {
        ...state,
        stockPreview: payload,
      };
    default:
      return state;
  }
};

export default reducer;
