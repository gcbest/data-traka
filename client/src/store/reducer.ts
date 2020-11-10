import { QUERY_STOCK } from './actionTypes';

export default function reducer(state: IState, { type, payload }: IAction): IState {
  switch (type) {
    case QUERY_STOCK:
      return {
        ...state,
        stockPreview: payload,
      };
    default:
      return state;
  }
}
