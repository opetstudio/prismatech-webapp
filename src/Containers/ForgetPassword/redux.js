import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // do
  doForgetPass: ['data'],
  doForgetPassDone: ['data'],
  doForgetPassFailed: ['data'],
  // confirm
  doConfirmForgetPass: ['data'],
  doConfirmForgetPassDone: ['data'],
  doConfirmForgetPassFailed: ['data'],

  setNewPassword: ['data'],
  doForgetSetPage: ['data'],
  doForgetPassReset: null
})

export const ForgetPasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isRequesting: false,
  isResult: false,
  page: 'form',
  email: '',
  new_password: '',
  otpRefNum: '',
  errors: '',
  status: 0
})

export const doForget = state => state.merge({ isRequesting: true })
export const doForgetDone = (state, { data }) => state.merge({ isRequesting: false, errors: '', ...data })
export const doForgetFailed = (state, { data }) => state.merge({ isRequesting: false, ...data })

export const doSubmit = state => state.merge({ isRequesting: true })
export const doSubmitDone = (state, { data }) => state.merge({ isRequesting: false, errors: '', ...data })
export const doSubmitFailed = (state, { data }) => state.merge({ isRequesting: false, ...data })

export const doForgetReset = state => state.merge(INITIAL_STATE)
export const setPage = (state, { data }) => state.merge({ ...data })
export const newPasword = (state, { data }) => state.merge({ ...data })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DO_FORGET_PASS_RESET]: doForgetReset,
  [Types.DO_FORGET_SET_PAGE]: setPage,
  [Types.SET_NEW_PASSWORD]: newPasword,

  [Types.DO_FORGET_PASS]: doForget,
  [Types.DO_FORGET_PASS_DONE]: doForgetDone,
  [Types.DO_FORGET_PASS_FAILED]: doForgetFailed,

  [Types.DO_CONFIRM_FORGET_PASS]: doSubmit,
  [Types.DO_CONFIRM_FORGET_PASS_DONE]: doSubmitDone,
  [Types.DO_CONFIRM_FORGET_PASS_FAILED]: doSubmitFailed
})
