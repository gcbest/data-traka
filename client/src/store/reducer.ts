import { FETCH_STOCK_SUCCESS } from './actionTypes';

export default function reducer(state: IState, { type, payload }: IAction): IState {
  switch (type) {
    case FETCH_STOCK_SUCCESS:
      return {
        ...state,
        stockPreview: payload,
      };
    default:
      return state;
  }
}
