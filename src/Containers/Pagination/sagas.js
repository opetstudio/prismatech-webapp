import { call, put, select } from 'redux-saga/effects'
import Immutable from 'seamless-immutable'
import { path } from 'ramda'
import _ from 'lodash'
import PaginationActions from './redux'
import ModalActions from '../Modal/redux'

const $ = window.jqueryBridge()

export function * submitFilter (api, action) {
  const { data } = action
  console.log('data====>', data)
  const { table, page, size, columns, datasource, userMerchantCode } = data
  const graphqlParameter = yield select(state => ({
    filter: state.pagination.filter[table] || {}
  }))
  const saveGraphqlParameter = { table, page, size, filter: graphqlParameter.filter, columns, datasource, userMerchantCode }
  yield put(PaginationActions.saveGraphqlParameter(saveGraphqlParameter))
  console.log('graphqlParameter1=======>', saveGraphqlParameter)
  yield call(requestDataPagination, saveGraphqlParameter, api)
}
function * requestDataPagination (saveGraphqlParameter, api) {
  const { datasource, table, page, size } = saveGraphqlParameter
  const submitFilterMSG = { ir: false, rc: '00', rm: '', rd: '' }
  yield put(PaginationActions.saveGraphqlParameter(saveGraphqlParameter))
  console.log('graphqlParameter1=======>', saveGraphqlParameter)
  const response = yield call(api.submitFilter, saveGraphqlParameter)
  console.log('response===>', response)

  const rows = path(['data', 'data', datasource, 'content'], response)
  //   const page = path(['data', 'data', table, 'number'], response)
  const totalPages = path(['data', 'data', datasource, 'totalPages'], response)
  //   const size = path(['data', 'data', table, 'size'], response)
  if (response.ok) {
    // rows = {}
  } else {
    submitFilterMSG.rd = path(['problem'], response)
    submitFilterMSG.rm = 'GENERAL_ERROR'
    submitFilterMSG.rc = '99'
  }
  yield put(PaginationActions.submitFilterDone({ table, rows, submitFilterMSG, page, totalPages, size }))

}
export function * deleteRowById (api, action) {
  const { data } = action
  console.log('data====>', data)
  const { table, id, userMerchantCode, deleteById } = data
  const response = yield call(api.deleteRowById, { table, id, userMerchantCode, deleteById })
  console.log('response===>', response)
  const deleteRowByIdMSG = { ir: false, rc: '00', rm: '', rd: '' }
  if (response.ok) {
    console.log('response successss')
    // rows = {}
    const errors = path(['data', 'errors'], response) || []
    let errorMsg = ''
    for (var i = 0; i < errors.length; i++) {
      console.log('errors[i].description=====>', errors[i].description)
      errorMsg += '> ' + errors[i].description
    }
    if (errorMsg !== '') deleteRowByIdMSG.rd = errorMsg
    else {
      const responseCode = path(['data', 'data', deleteById, 'responseCode'], response)
      const responseDescription = path(['data', 'data', deleteById, 'responseDescription'], response)
      deleteRowByIdMSG.rc = responseCode
      deleteRowByIdMSG.rd = responseDescription
      if (responseCode === 'MBDD00') {
        const graphqlParameter = yield select(state => (state.pagination.graphqlParameter || {}))
        const graphqlParameterIm = Immutable.asMutable(graphqlParameter, { deep: true })
        console.log('graphqlParameterIm=======>', graphqlParameterIm)
        if (!_.isEmpty(graphqlParameterIm)) {
          yield call(requestDataPagination, graphqlParameterIm, api)
        }
        yield put(ModalActions.closeModal({}))
      }
    }
  } else {
    console.log('response errorrrrrr')
    deleteRowByIdMSG.rd = path(['problem'], response)
    deleteRowByIdMSG.rm = 'GENERAL_ERROR'
    deleteRowByIdMSG.rc = '99'
  }
  yield put(PaginationActions.deleteRowByIdDone({ deleteRowByIdMSG }))
}
