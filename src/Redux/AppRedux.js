import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  init: null,
  setRouteActive: ['data'],
  setMerchantCode: ['data'],
  appPatch: ['data'],
  reset: null
})

export const AppTypes = Types
export default Creators

/* ------------- Initial State ------------- */

// let initialData = AppConfig.env === 'development' ? window : window
// let initialData = AppConfig.env === 'development' ? {
//   LANG: 'en'
// } : window

// console.log('initialData===', initialData.LANG)
export const INITIAL_STATE = Immutable({
  lang: document.documentElement.lang,
  routeActive: '',
  pageTitle: '',
  merchantCode: '',
  version: 0,
  sessionToken: ''
})

/* ------------- Selectors ------------- */
export const AppSelectors = {
  lang: st => st.lang || 'id',
  routeActive: st => st.routeActive,
  pageTitle: st => st.pageTitle,
  merchantCode: st => st.merchantCode,
  version: st => st.version
}
const appPatch = (state, { data }) => {
  let mergeData = {}
  if (data.hasOwnProperty('merchantCode')) mergeData.merchantCode = data.merchantCode
  if (data.hasOwnProperty('routeActive')) mergeData.routeActive = data.routeActive
  if (data.hasOwnProperty('pageTitle')) mergeData.pageTitle = data.pageTitle
  mergeData.version = state.version + 1
  return state.merge(mergeData)
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INIT]: () => {},
  [Types.SET_ROUTE_ACTIVE]: (state, { data }) => state.merge({routeActive: data.routeActive || ''}),
  [Types.SET_MERCHANT_CODE]: (state, { data }) => state.merge({merchantCode: data.merchantCode || ''}),
  [Types.APP_PATCH]: appPatch,
  [Types.RESET]: (state) => INITIAL_STATE
})
