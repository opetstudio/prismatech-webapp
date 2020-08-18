import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../../../Config/AppConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  filterByDate:['data'],
  filterByAmount:['data'],
  filterById:['data'],
  filterByStatus:['data'],
  filterReset:['data'],
  filterRequestDone:['data'],
  doFilter:['data'],
  // fetchTransaction:['data'],
  // fetchTransactionDone:['data'],
  // fetchTransactionFailed:['data'],
  // fetchTransactionReset:null,
})

export const TransactionHistoryDataTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isFiltering:false,
    trxData:[],
    // transaction_id:'',
    // transaction_amount:0,
    // created_at:'',
    // transaction_method:'',
    // merchant_name:'',,
    f_trx_id:'',
    f_id:'',
    f_amount_end:'',
    f_amount_start:'',
    f_date_start:'',
    f_date_end:'',
    f_status:'',
    errors:[],
    status:0
})

// export const fetch = state  => state.merge({ isRequesting: true })
// export const done = (state,{data}) => state.merge({ isRequesting:false, ...data })
// export const failed = (state,{data}) => state.merge({ isRequesting:false, ...data })
// export const reset = state=> state.merge(INITIAL_STATE)

export const doFilter= (state,{data}) =>state.merge({ isFiltering:true, ...data })
export const byDateRange= (state,{data}) => state.merge({ isFiltering:true, ...data })
export const byAmount= (state,{data}) => state.merge({ isFiltering:true, ...data })
export const byId= (state,{data}) => state.merge({ isFiltering:true, ...data })
export const byStatus= (state,{data}) => state.merge({ isFiltering:true, ...data })
export const resetfilter= (state,{data}) => state.merge(INITIAL_STATE)
export const requesteDone= (state,{data}) => state.merge({ isFiltering:false })



export const reducer = createReducer(INITIAL_STATE, {
  [Types.DO_FILTER]: doFilter, 
  [Types.FILTER_BY_STATUS]: byStatus, 
  [Types.FILTER_BY_DATE]: byDateRange, 
  [Types.FILTER_BY_AMOUNT]: byAmount, 
  [Types.FILTER_BY_ID]: byId, 
  [Types.FILTER_REQUEST_DONE]: requesteDone, 
  [Types.FILTER_RESET]: resetfilter, 
  // [Types.FETCH_TRANSACTION]: reset,
  // [Types.FETCH_TRANSACTION_DONE]: done,
  // [Types.FETCH_TRANSACTION_FAILED]: done,
  // [Types.FETCH_TRANSACTION_RESET]: failed
})
