import { QUERY_STOCK } from './actionTypes';

export default function reducer(state: IState, { type, payload }: IAction): IState {
  switch (type) {
    case QUERY_STOCK:
      return {
        ...state,
        query: payload,
      };
    default:
      return state;
  }
}
