import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { arrayMerge } from '../../Utils/helper/datamining'
import { isEmpty } from 'ramda'
import AppConfig from '../../Config/AppConfig'
import {setSession,getSession, makeData} from '../../Utils/Utils'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginPatch: ['data'],
  loginDoLogin: ['data'],
  loginDoLogout: ['data'],
  loginReset: ['data'],
  loginDoLoginFailed: ['data'],
  loginDoLoginSuccess: ['data'],
  loginDoLogoutSuccess: ['data'],
  setAuthorizedRouters: ['data'],
  reset: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  token:'',
  merchant_id:'',
  data: {},
  fetching: null,
  payload: null,
  single: null,
  multi: null,
  error: null,
  allIds: [],
  byId: {},
  maxModifiedon: 0,
  isLoggedIn: null,
  token: null,
  expiresIn: 0,
  refreshToken: '',
  scope: '',
  tokenType: '',
  formSubmitMessage: '',

  isRequesting: false,
  responseMessage: '',
  responseCode: '',
  version: 0,
  userFullName: '',
  responseDescription: '',
  userRole: '',
  userMerchantCode: '',
  userMerchantId: '',
  sessionToken: null,
  authorizedRouters: [],
  user: {}
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getData: state => state.data,
  getSingle: state => state.single,
  getDetailById: (state, id) => (state.byId || {})[id],
  getAllIds: state => state.allIds,
  getAllDataArr: state => state.allIds.map(id => (state.byId || {})[id]),
  getMaxModifiedon: state => state.maxModifiedon,
  getById: state => state.byId,
  isLoggedIn: state => state.isLoggedIn,
  getFormSubmitMessage: state => state.formSubmitMessage,
  getError: state => state.error,
  getToken: state => state.token,
  isRequesting: st => st.isRequesting,
  sessionToken: st => st.sessionToken,
  responseMessage: st => st.responseMessage,
  responseCode: st => st.responseCode,
  userFullName: st => st.userFullName,
  responseDescription: st => st.responseDescription,
  userRole: st => st.userRole,
  getUserRole: st => st.userRole,
  userMerchantCode: st => st.userMerchantCode,
  getUserMerchantCode: st => st.userMerchantCode,
  userMerchantId: st => st.userMerchantId,
  getAuthorizedRouters: st => st.authorizedRouters
}

/* ------------- Reducers ------------- */


// Something went wrong somewhere.
export const failure = (state, action) => {
  const { data } = action
  console.log('Response message>>>>',data.formSubmitMessage)
  return state.merge({
    fetching: false,
    error: true,
    payload: null,
    formSubmitMessage: data.formSubmitMessage
  })
}
export const reset = (state,action) =>state.merge(INITIAL_STATE)

export const loginDoLogin = (state, { data }) => {
  data.isRequesting = true
  return loginPatch(state, { data })
}
export const loginDoLogout = (state, { data }) => {
  data.isRequesting = true
  return loginPatch(state, { data })
}
export const loginDoLoginSuccess = (state, { data }) => {
  const {responseCode, responseMessage,merchant_id,token, user} = data
  data.token=token
  data.userMerchantCode=token
  data.isRequesting = false
  data.isLoggedIn = true
  data.responseCode = responseCode
  data.responseMessage= responseMessage
  return loginPatch(state, { data})
}
export const loginDoLoginFailed = (state, { data }) => {
  data.isRequesting = false
  
  return loginPatch(state, { data })
}

export const loginDoLogoutSuccess = (state, { data }) => {
  data.isRequesting = false
  data.isLoggedIn = false
  data.sessionToken = null
  data.userMerchantCode = ''
  data.userMerchantId = ''
  return loginPatch(state, { data })
}

export const loginPatch = (state, { data }) => {
  let mergeData = {}
  if (data.hasOwnProperty('user')) mergeData.user = data.user
  if (data.hasOwnProperty('merchant_id')) mergeData.merchant_id = data.merchant_id
  if (data.hasOwnProperty('isRequesting')) mergeData.isRequesting = data.isRequesting
  if (data.hasOwnProperty('responseCode')) mergeData.responseCode = data.responseCode
  if (data.hasOwnProperty('responseMessage')) mergeData.responseMessage = data.responseMessage
  if (data.isLoggedIn) mergeData.isLoggedIn = data.isLoggedIn
  if (data.hasOwnProperty('responseDescription')) mergeData.responseDescription = data.responseDescription
  if (data.hasOwnProperty('userFullName')) mergeData.userFullName = data.userFullName
  if (data.hasOwnProperty('userRole')) mergeData.userRole = data.userRole
  if (data.hasOwnProperty('sessionToken')) mergeData.sessionToken = data.sessionToken
  if (data.hasOwnProperty('userMerchantCode')) mergeData.userMerchantCode = data.userMerchantCode
  if (data.hasOwnProperty('userMerchantId')) mergeData.userMerchantId = data.userMerchantId
  mergeData.version = state.version + 1
  return state.merge(mergeData)
}
export const setAuthorizedRouters = (state, { data }) => state.merge({ authorizedRouters: data })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_RESET]: reset,
  [Types.LOGIN_PATCH]: loginPatch,
  [Types.LOGIN_DO_LOGIN]: loginDoLogin,
  [Types.LOGIN_DO_LOGIN_SUCCESS]: loginDoLoginSuccess,
  [Types.LOGIN_DO_LOGIN_FAILED]: loginDoLoginFailed,
  [Types.LOGIN_DO_LOGOUT]: loginDoLogout,
  [Types.LOGIN_DO_LOGOUT_SUCCESS]: loginDoLogoutSuccess,
  [Types.SET_AUTHORIZED_ROUTERS]: setAuthorizedRouters,
  [Types.RESET]: (state) => INITIAL_STATE
})
