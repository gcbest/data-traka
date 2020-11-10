import { Reducer } from 'redux';
import { ADD_STOCK_TO_LIST, FETCH_STOCK_SUCCESS } from './actionTypes';

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

    case ADD_STOCK_TO_LIST:
      if (!payload) return state;
      alert(`${payload.Name} added to list`);
      return {
        ...state,
        saved: [...state.saved, payload],
      };

    default:
      return state;
  }
};

export default reducer;
