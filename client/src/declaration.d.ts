type ActionType = 'QUERY_STOCK'| 'FETCH_STOCK_REQUEST'| 'FETCH_STOCK_SUCCESS'| 'FETCH_STOCK_ERROR'| 'ADD_STOCK_TO_LIST'

interface ITimeSeriesData {
  time: string
  amount: number
}

interface IStockPreview {
  Symbol: string
  Name: string
  Currency: string
  '52WeekHigh': number
  '52WeekLow': number
  timeSeriesData: ITimeSeriesData[]
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
