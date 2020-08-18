import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../../../Config/AppConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchSettlement:['data'],
  fetchSettlementDone:['data'],
  fetchSettlementFailed:['data'],
  fetchSettlementReset:null,
})

export const SettlementTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isRequesting:false,
    settlementData:[],
    errors:[],
    status:0
})

export const fetch = state  => state.merge({ isRequesting: true })
export const done = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const failed = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const reset = state=> state.merge(INITIAL_STATE)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_SETTLEMENT]: fetch,
  [Types.FETCH_SETTLEMENT_DONE]: done,
  [Types.FETCH_SETTLEMENT_FAILED]: failed,
  [Types.FETCH_SETTLEMENT_RESET]: reset
})
