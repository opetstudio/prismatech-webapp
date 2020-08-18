import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const reduxName = 'changepassword'
const reduxNameUpper = 'CHANGEPASSWORD'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  [reduxName + 'Submit']: ['data'],
  [reduxName + 'SubmitDone']: ['data'],
  [reduxName + 'ResetForm']: ['data'],
  reset: null
})

export const ChangepasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  isRequesting: false,
  errors: '',
  status: 0

})

export const SubmitDone = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const Submit = (state, { data }) => state.merge({ isRequesting: true, ...data })
export const ResetForm = (state, { data }) => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types[reduxNameUpper + '_SUBMIT']]: Submit,
  [Types[reduxNameUpper + '_SUBMIT_DONE']]: SubmitDone,
  [Types[reduxNameUpper + '_RESET_FORM']]: ResetForm,
  [Types.RESET]: (state) => INITIAL_STATE
})
