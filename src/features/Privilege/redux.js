import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  privilegeCheckboxOnClick: ['data'],
  privilegeCheckboxSubmit: ['data'],
  privilegeCheckboxSubmitDone: ['data'],
  reset: null
})

export const PrivilegeTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  checkbox: {},
  loading: false,
  errors: []
})
export const privilegeCheckboxOnClick = (state, { data }) => state.merge({
  checkbox: { ...state.checkbox, [data.role_id]: { ...state.checkbox[data.role_id], [data.privilege_id]: data.checked } }
})
export const privilegeCheckboxSubmit = (state, { data }) => state.merge({
  loading: true
})
export const privilegeCheckboxSubmitDone = (state, { data }) => state.merge({
  errors: data.errors,
  loading: false
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRIVILEGE_CHECKBOX_ON_CLICK]: privilegeCheckboxOnClick,
  [Types.PRIVILEGE_CHECKBOX_SUBMIT]: privilegeCheckboxSubmit,
  [Types.PRIVILEGE_CHECKBOX_SUBMIT_DONE]: privilegeCheckboxSubmitDone,
  [Types.RESET]: (state) => INITIAL_STATE
})
