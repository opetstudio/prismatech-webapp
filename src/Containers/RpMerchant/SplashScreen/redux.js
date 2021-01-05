import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
// import AppConfig from '../../../Config/AppConfig'
// import { data } from '../../../Redux/HomeRedux'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  doSplash: ['data']
})

export const SplashTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  isLoading: false
})
export const patcher = (state, { data }) => state.merge({ ...data })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DO_SPLASH]: patcher
})
