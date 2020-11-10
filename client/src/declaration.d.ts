type ActionType = QUERY_SYMBOL;

interface IStockPreview {
  symbol: string
  name: string
  high: number
  low: number
}

interface IAction {
  type: ActionType
  payload?: IStockPreview
}

interface IState {
  loading: boolean
  error: string
  stockPreview?: IStockPreview | undefined
  saved: IStockPreview[]
}
