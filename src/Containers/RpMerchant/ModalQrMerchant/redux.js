import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getQr: ['data'],
  getQrDone: ['data']
})

export const MerchantQrTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  isRequesting: false,
  errors: [],
  status: 0,
  qr_code: ''

})

export const done = (state, { data }) => state.merge({ isRequesting: false, ...data })
export const get = (state, { data }) => state.merge({ isRequesting: true, ...data })

export const reducer = createReducer(INITIAL_STATE, {

  [Types.GET_QR]: get,
  [Types.GET_QR_DONE]: done
})
