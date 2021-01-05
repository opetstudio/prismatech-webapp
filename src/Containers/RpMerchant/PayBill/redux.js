import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  doPayment: ['data'],
  doPaymentDone: ['data'],
  doPaymentFailed: ['data'],
  doPaymentResetIndividual: ['data'],
  doPaymentReset: null,
  doResult: null,
  doResultCancel: null,
  doPaymentByCode: ['data']
})

export const PaymentTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  isRequesting: false,
  errors: [],
  status: 0,
  isResult: false,
  qr_code: '',
  // by code
  amount: ''

})
export const to_result = state => state.merge({ isResult: true })
export const to_result_cancel = state => state.merge({ isResult: false })

export const do_p = state => state.merge({ isRequesting: true })
export const done = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const failed = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const reset = state => state.merge(INITIAL_STATE)
export const resetIndividual = (state, { data }) => state.merge(state.merge({ ...data }))
export const do_p_by_code = state => state.merge({ isRequesting: true })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DO_RESULT_CANCEL]: to_result_cancel,
  [Types.DO_RESULT]: to_result,
  [Types.DO_PAYMENT]: do_p,
  [Types.DO_PAYMENT_BY_CODE]: do_p_by_code,
  [Types.DO_PAYMENT_DONE]: done,
  [Types.DO_PAYMENT_FAILED]: failed,
  [Types.DO_PAYMENT_RESET]: reset,
  [Types.DO_PAYMENT_RESET_INDIVIDUAL]: resetIndividual
})
