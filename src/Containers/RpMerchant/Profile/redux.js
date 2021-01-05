import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchProfileData: ['data'],
  fetchProfileDataDone: ['data'],
  fetchProfileDataFailed: ['data'],
  profileReset: null
})

export const MerchantProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  isRequesting: false,
  errors: [],
  status: 0,
  isResult: false,
  email: '',
  full_name: '',
  business_name: '',
  merchant_id: '',
  device_id: '',
  address: ''
})

export const do_fetch = state => state.merge({ isRequesting: true })
export const done = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const failed = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const reset = state => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_PROFILE_DATA]: do_fetch,
  [Types.FETCH_PROFILE_DATA_DONE]: done,
  [Types.FETCH_PROFILE_DATA_FAILED]: failed,
  [Types.PROFILE_RESET]: reset
})
