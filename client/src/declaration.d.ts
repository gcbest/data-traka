type ActionType = 'QUERY_STOCK'| 'FETCH_STOCK_REQUEST'| 'FETCH_STOCK_SUCCESS'| 'FETCH_STOCK_ERROR'| 'ADD_STOCK_TO_LIST'

interface IStockPreview {
  Symbol: string
  Name: string
  '52WeekHigh': number
  '52WeekLow': number
}

interface IStockDetails extends IStockPreview {
  Exchange: string
  Sector: string
  Country: string
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
