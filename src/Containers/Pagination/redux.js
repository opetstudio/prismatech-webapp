import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { path } from 'ramda'
// import qs from 'qs'

// const queryParameter = qs.parse(window.location.search, { ignoreQueryPrefix: true })
// const graphql = (queryParameter).graphql || '{}'
// const graphqlJson = JSON.parse(graphql)
// const filter = path(['filter'], graphqlJson) || {}
// const table = path(['table'], graphqlJson) || null

// graphql={"table":"vAReport","filter":{"mercRefNo":"190115149","mercCd":"19YW0904"}}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fieldOnChange: ['data'],
  resetFilter: ['data'],
  submitFilter: ['data'],
  saveGraphqlParameter: ['data'],
  submitFilterDone: ['data'],
  deleteRowById: ['data'],
  deleteRowByIdDone: ['data']
})

export const PaginationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  filter: {},
  // filter: (table) ? { [table]: filter } : {},
  submitFilterMSG: {},
  deleteRowByIdMSG: {},
  rows: {},
  page: {},
  totalPages: {},
  size: {},
  table: '',
  graphqlParameter: {}
})

/* ------------- Selectors ------------- */

export const PaginationSelectors = {
  filter: (st, table) => {
    console.log('get filter from redux. table=', table)
    console.log('get filter from redux. table=', st.filter)
    return st.filter[table] || {}
  },
  rows: (st, table) => st.rows[table],
  page: (st, table) => st.page[table] || 0,
  totalPages: (st, table) => st.totalPages[table],
  table: (st) => st.table,
  size: (st, table) => st.size[table] || 10,
  submitFilterMSG: (st, table) => st.submitFilterMSG[table],
  deleteRowByIdMSG: (st) => st.deleteRowByIdMSG,
  graphqlParameter: (st) => st.graphqlParameter,
  fieldValue: (st, table, field) => path([table, field], st.filter)
}

/* ------------- Reducers ------------- */

export const fieldOnChange = (state, { data }) => {
  console.log('fieldOnChange======', data)
  // const { data } = action
  const table = path(['table'], data)
  const field = path(['field'], data)
  const val = path(['value'], data)
  if (!table || !field) return state
  return state.merge({ table, filter: { ...state.filter, [table]: { ...(state.filter[table] || {}), [field]: val } }, version: state.version + 1 })
}
export const resetFilter = (state, { data }) => {
  const table = path(['table'], data)
  return state.merge({ filter: { ...state.filter, [table]: {} }, version: state.version + 1 })
}
export const saveGraphqlParameter = (state, { data }) => state.merge({ graphqlParameter: data })
export const submitFilter = (state, { data }) => {
  const table = path(['table'], data)
  return state.merge({ table, submitFilterMSG: { ...state.submitFilterMSG, [table]: { ir: true, rc: '', rm: '', rd: '' } }, version: state.version + 1 })
}
export const submitFilterDone = (state, { data }) => {
  const table = path(['table'], data)
  const rows = path(['rows'], data)
  const submitFilterMSG = path(['submitFilterMSG'], data)
  const page = path(['page'], data)
  const totalPages = path(['totalPages'], data)
  const size = path(['size'], data)
  return state.merge({ table, size: { ...state.size, [table]: size }, totalPages: { ...state.totalPages, [table]: totalPages }, page: { ...state.page, [table]: page }, rows: { ...state.rows, [table]: rows }, submitFilterMSG: { ...state.submitFilterMSG, [table]: submitFilterMSG }, version: state.version + 1 })
}
export const deleteRowById = (state, { data }) => state.merge({ deleteRowByIdMSG: { ir: true, rc: '', rm: '', rd: '' } })
export const deleteRowByIdDone = (state, { data }) => state.merge({ deleteRowByIdMSG: data.deleteRowByIdMSG })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_FILTER]: resetFilter,
  [Types.SAVE_GRAPHQL_PARAMETER]: saveGraphqlParameter,
  [Types.FIELD_ON_CHANGE]: fieldOnChange,
  [Types.SUBMIT_FILTER]: submitFilter,
  [Types.SUBMIT_FILTER_DONE]: submitFilterDone,
  [Types.DELETE_ROW_BY_ID]: deleteRowById,
  [Types.DELETE_ROW_BY_ID_DONE]: deleteRowByIdDone
})
