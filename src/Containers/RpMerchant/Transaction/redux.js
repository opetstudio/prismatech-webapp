import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchTransaction: ['data'],
  fetchTransactionDone: ['data'],
  fetchTransactionFailed: ['data'],
  fetchTransactionReset: null
})

export const TransactionHistoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isRequesting: false,
  trxData: [],
  // transaction_id:'',
  // transaction_amount:0,
  // created_at:'',
  // transaction_method:'',
  // merchant_name:'',
  errors: [],
  status: 0
})

export const fetch = state => state.merge({ isRequesting: true })
export const done = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const failed = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const reset = state => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_TRANSACTION]: fetch,
  [Types.FETCH_TRANSACTION_DONE]: done,
  [Types.FETCH_TRANSACTION_FAILED]: failed,
  [Types.FETCH_TRANSACTION_RESET]: reset
})
