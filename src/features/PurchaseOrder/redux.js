import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  purchaseorderCheckStatusRequestOtp: ['data'],
  purchaseorderCheckStatusRequestOtpDone: ['data'],
  purchaseorderCheckStatus: ['data'],
  purchaseorderCheckStatusDone: ['data'],
  reset: null
})

export const PurchaseorderTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loading: false,
  errors: [],
  otpRefNum: '',
  otpValid: false,
  purchaseOrderDetail: {}
})
export const purchaseorderCheckStatusRequestOtp = (state, { data }) => state.merge({
  loading: true
})
export const purchaseorderCheckStatusRequestOtpDone = (state, { data }) => state.merge({
  errors: data.errors,
  otpRefNum: data.otpRefNum,
  loading: false
})
export const purchaseorderCheckStatus = (state, { data }) => state.merge({
  loading: true,
  otpValid: data.otpValid
})
export const purchaseorderCheckStatusDone = (state, { data }) => state.merge({
  errors: data.errors,
  purchaseOrderDetail: data.dataDetail,
  loading: false
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PURCHASEORDER_CHECK_STATUS]: purchaseorderCheckStatus,
  [Types.PURCHASEORDER_CHECK_STATUS_DONE]: purchaseorderCheckStatusDone,
  [Types.PURCHASEORDER_CHECK_STATUS_REQUEST_OTP]: purchaseorderCheckStatusRequestOtp,
  [Types.PURCHASEORDER_CHECK_STATUS_REQUEST_OTP_DONE]: purchaseorderCheckStatusRequestOtpDone,
  [Types.RESET]: (state) => INITIAL_STATE
})
