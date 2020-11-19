type ActionType = 'QUERY_STOCK'| 'FETCH_STOCK_REQUEST'| 'FETCH_STOCK_SUCCESS'| 'FETCH_STOCK_ERROR'
| 'ADD_STOCK_TO_LIST' | 'CONVERT_CURRENCY' | 'SET_CURRENT_RATES' | 'RESET_SEARCH' | 'UPDATE_SAVED_STOCKS'
type Currency = 'USD' | 'EUR'

interface IConvRates {
  EurToUsd: number
  UsdToEur: number
}
// type NewAction = Currency & IConvRates

interface ITimeSeriesData {
  time: string
  amount: number
}

interface IStockPreview {
  Symbol: string
  Name: string
  Currency: Currency
  '52WeekHigh': number
  '52WeekLow': number
  Price: number
  timeSeriesData: ITimeSeriesData[]
}

interface IStockDetails extends IStockPreview {
  Exchange: string
  Sector: string
  Country: string
}

interface IAction {
  type: ActionType
  payload?: IStockPreview | IActionCurrency | any
}

interface IActionCurrency {
  type: ActionType
  payload: IConvRates
}

// type IAction = IActionStock | IActionCurrency | any
// type IAction = any

interface IState {
  loading: boolean
  error: string
  stockPreview?: IStockPreview | undefined
  saved: IStockPreview[]
  convRates?: IConvRates
}

type ConvertCurrency = (newCurrency: Currency, amount: number, convRate: IConvRates) => number
