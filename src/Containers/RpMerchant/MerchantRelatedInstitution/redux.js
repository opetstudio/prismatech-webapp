import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchRelatedInstitution: ['data'],
  fetchRelatedInstitutionDone: ['data'],
  fetchRelatedInstitutionFailed: ['data'],
  relatedInstitutionReset: null
})

export const MerchantRelatedInstitutionTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  isRequesting: false,
  errors: [],
  status: 0,
  isResult: false,
  // by code
  related_institutions: []
})

export const do_fetch = state => state.merge({ isRequesting: true })
export const done = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const failed = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const reset = state => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_RELATED_INSTITUTION]: do_fetch,
  [Types.FETCH_RELATED_INSTITUTION_DONE]: done,
  [Types.FETCH_RELATED_INSTITUTION_FAILED]: failed,
  [Types.RELATED_INSTITUTION_RESET]: reset
})
