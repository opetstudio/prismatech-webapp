import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dashboardFetch: ['data'],
  dashboardPatch: ['data'],
  dailyTransactionSummary:['data'],
  hourlyTrend:['data'],
  reset: null
})
export const DashboardTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  dashbaordFetchMSG: { ir: false, rc: '', rm: '', rd: '' } // ir=isRequesting rc=responseCode rd=redponseDescription
  ,dailyTransactionSummary:[],hourlyTrend:[]
})

/* ------------- Selectors ------------- */
export const DashboardSelectors = {
  dashbaordFetchMSG: st => st.dashbaordFetchMSG
}

/* ------------- Reducers ------------- */
export const dashbaordFetch = (state, { data }) => {
  data.dashbaordFetchMSG = { ir: true, rc: '', rm: '', rd: '' }
  return dashboardPatch(state, { data })
}

export const dashboardPatch = (state, { data }) => {
  const mergeData = {}
  console.log(data,'dataon');
  
  if (data.hasOwnProperty('dashbaordFetchMSG')) mergeData.dashbaordFetchMSG = data.dashbaordFetchMSG
  if (data.hasOwnProperty('dailyTransactionSummary')) mergeData.dailyTransactionSummary = data.dailyTransactionSummary
  if (data.hasOwnProperty('hourlyTrend')) mergeData.hourlyTrend = data.hourlyTrend
  
  return state.merge(mergeData)
}
export const dailyTransactionSummary = (state, { data }) => {
  const mergeData = {}
  return state.merge(mergeData)
}
export const hourlyTrend = (state, { data }) => {
  const mergeData = {}
  return state.merge(mergeData)
}
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.DASHBOARD_FETCH]: dashbaordFetch,
  [Types.DASHBOARD_PATCH]: dashboardPatch,
  [Types.DAILY_TRANSACTION_SUMMARY]: dailyTransactionSummary,
  [Types.HOURLY_TREND]: hourlyTrend,
  [Types.RESET]: (state) => INITIAL_STATE
})
