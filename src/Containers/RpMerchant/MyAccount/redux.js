import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  doEditAccount: ['data'],
  resetEditAccount: null
})

export const MyAccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  isRequesting: false,
  page: ''
})

export const doEdit = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const reset = (state, { data }) => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DO_EDIT_ACCOUNT]: doEdit,
  [Types.RESET_EDIT_ACCOUNT]: reset
})
