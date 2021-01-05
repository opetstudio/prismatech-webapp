import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  doTopup: ['data'],
  doTopupDone: ['data'],
  doTopupFailed: ['data'],
  doTopupResetIndividual: ['data'],
  doTopupReset: null,
  doResult: null,
  doResultCancel: null,
  doTopupByCode: ['data']
})

export const TopupEmoneyTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  isRequesting: false,
  errors: [],
  status: 0,
  isResult: false,
  // by code
  qr_code: '',
  transaction_id: ''

})
export const to_result = state => state.merge({ isResult: true })
export const to_result_cancel = state => state.merge({ isResult: false })

export const do_t = state => state.merge({ isRequesting: true })
export const done = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const failed = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const reset = state => state.merge(INITIAL_STATE)
export const resetIndividual = (state, { data }) => state.merge(state.merge({ ...data }))
export const do_t_by_code = state => state.merge({ isRequesting: true })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DO_RESULT_CANCEL]: to_result_cancel,
  [Types.DO_RESULT]: to_result,
  [Types.DO_TOPUP]: do_t,
  [Types.DO_TOPUP_BY_CODE]: do_t_by_code,
  [Types.DO_TOPUP_DONE]: done,
  [Types.DO_TOPUP_FAILED]: failed,
  [Types.DO_TOPUP_RESET]: reset,
  [Types.DO_TOPUP_RESET_INDIVIDUAL]: resetIndividual
})
