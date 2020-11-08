type ActionType = QUERY_SYMBOL;

interface IStockPreview {
  symbol: string
}

interface IAction {
  type: ActionType
  payload?: IStockPreview
}

interface IState {
  loading: boolean
  error: string
  stockPreview: IStockPreview
  saved: IStockPreview[]
}
