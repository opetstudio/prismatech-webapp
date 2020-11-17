import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

const { Types, Creators } = createActions({
  tablepaginationResetForm: ['data'],
  tablepaginationResetFilter: ['data'],
  tablepaginationDeleteDataDone: ['data'],
  tablepaginationDeleteData: ['data'],
  tablepaginationFetchDataDetailDone: ['data'],
  tablepaginationFetchDataDetail: ['data'],
  tablepaginationFetchData: ['data'],
  tablepaginationFetchDataDone: ['data'],
  tablepaginationOnChangeFilter: ['data'],
  tablepaginationOnChangeForm: ['data'],
  tablepaginationSubmitForm: ['data'],
  tablepaginationSubmitFormDone: ['data'],
  reset: null
})

export const TablepaginationTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  payload: {},
  filter: {},
  data: {},
  dataDetail: {},
  loading: {},
  pageSize: {},
  pageIndex: {},
  errors: {},
  count: {},
  pageCount: {}
})

export const tablepaginationFetchData = (state, { data }) => {
  return state.merge({
    filter: { ...state.filter, [data.serviceName]: data.filter },
    loading: { ...state.loading, [data.serviceName]: true },
    pageSize: { ...state.pageSize, [data.serviceName]: data.pageSize },
    pageIndex: { ...state.pageIndex, [data.serviceName]: data.pageIndex }
  })
}
export const tablepaginationSubmitForm = (state, { data }) => {
  return state.merge({
    loading: { ...state.loading, [data.serviceName]: true }
  })
}
export const tablepaginationFetchDataDone = (state, { data }) => state.merge({
  loading: { ...state.loading, [data.serviceName]: false },
  data: { ...state.data, [data.serviceName]: data.listData },
  count: { ...state.data, [data.serviceName]: data.count },
  pageCount: { ...state.data, [data.serviceName]: data.pageCount },
  errors: { ...state.errors, [data.serviceName]: data.errors }
})
export const tablepaginationOnChangeFilter = (state, { data }) => state.merge({
  filter: { ...state.filter, [data.serviceName]: { ...state.filter[data.serviceName], [data.fieldName]: data.fieldValue } }
})
export const tablepaginationResetFilter = (state, { data }) => {
  const x1 = document.getElementById('filter_start_date')
  const x2 = document.getElementById('filter_end_date')
  x1.value = ''
  x2.value = ''
  return state.merge({
    filter: { ...state.filter, [data.serviceName]: {} }
  })
}
export const tablepaginationOnChangeForm = (state, { data }) => state.merge({
  // loading: { ...state.loading, [data.serviceName]: true },
  payload: { ...state.payload, [data.serviceName]: { ...state.payload[data.serviceName], [data.fieldName]: data.fieldValue } }
})
export const tablepaginationSubmitFormDone = (state, { data }) => {
  const d = {}
  d.loading = { ...state.loading, [data.serviceName]: false }
  d.errors = { ...state.errors, [data.serviceName]: data.errors }
  if (_.isEmpty(data.errors)) d.payload = { ...state.payload, [data.serviceName]: {} }
  return state.merge(d)
}
export const tablepaginationResetForm = (state, { data }) => state.merge({
  payload: { ...state.payload, [data.serviceName]: {} }
})
export const tablepaginationDeleteData = (state, { data }) => state.merge({
  loading: { ...state.loading, [data.serviceName]: true }
})
export const tablepaginationDeleteDataDone = (state, { data }) => state.merge({
  loading: { ...state.loading, [data.serviceName]: false },
  errors: { ...state.errors, [data.serviceName]: data.errors }
})
export const tablepaginationFetchDataDetail = (state, { data }) => state.merge({
  loading: { ...state.loading, [data.serviceName]: true }
})
export const tablepaginationFetchDataDetailDone = (state, { data }) => state.merge({
  errors: { ...state.errors, [data.serviceName]: data.errors },
  loading: { ...state.loading, [data.serviceName]: false },
  dataDetail: { ...state.dataDetail, [data.serviceName]: data.dataDetail }
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TABLEPAGINATION_RESET_FORM]: tablepaginationResetForm,
  [Types.TABLEPAGINATION_RESET_FILTER]: tablepaginationResetFilter,
  [Types.TABLEPAGINATION_DELETE_DATA_DONE]: tablepaginationDeleteDataDone,
  [Types.TABLEPAGINATION_DELETE_DATA]: tablepaginationDeleteData,
  [Types.TABLEPAGINATION_FETCH_DATA_DETAIL_DONE]: tablepaginationFetchDataDetailDone,
  [Types.TABLEPAGINATION_FETCH_DATA_DETAIL]: tablepaginationFetchDataDetail,
  [Types.TABLEPAGINATION_SUBMIT_FORM_DONE]: tablepaginationSubmitFormDone,
  [Types.TABLEPAGINATION_SUBMIT_FORM]: tablepaginationSubmitForm,
  [Types.TABLEPAGINATION_ON_CHANGE_FORM]: tablepaginationOnChangeForm,
  [Types.TABLEPAGINATION_ON_CHANGE_FILTER]: tablepaginationOnChangeFilter,
  [Types.TABLEPAGINATION_FETCH_DATA]: tablepaginationFetchData,
  [Types.TABLEPAGINATION_FETCH_DATA_DONE]: tablepaginationFetchDataDone,
  [Types.RESET]: (state) => INITIAL_STATE
})
