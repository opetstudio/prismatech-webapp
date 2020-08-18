import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import { useHistory } from 'react-router-dom'
import LoginActions from '../../Containers/Login/redux'
import TablepaginationActions from './redux'
import _ from 'lodash'

export function * tablepaginationFetchData (api, { data }) {
  console.log('tablepaginationFetchData====data', data)
  const { filter, pageSize, pageIndex, serviceName, fields, history } = data
  const response = yield call(api.fetchAllService, data)
  console.log('response======>', response)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  //   const statusBody = parseInt(path(['data', 'data', 'tablepaginationFetchData', 'status'], response) || 0)
  const errorBody = path(['data', 'data', serviceName, 'error'], response)
  const listData = path(['data', 'data', serviceName, 'list_data'], response)
  const count = path(['data', 'data', serviceName, 'count'], response)
  const pageCount = path(['data', 'data', serviceName, 'page_count'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  yield put(TablepaginationActions.tablepaginationFetchDataDone({ listData, errors, serviceName, count, pageCount }))

  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      window.callErrorToast(element.message, 'error')
    })
  }
}
export function * tablepaginationFetchDataDetail (api, { data }) {
  console.log('tablepaginationFetchDataDetail====data', data)
  const { serviceName, additionalFields } = data
  const response = yield call(api.fetchDetailService, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  //   const statusBody = parseInt(path(['data', 'data', 'tablepaginationFetchData', 'status'], response) || 0)
  const errorBody = path(['data', 'data', serviceName, 'error'], response)
  const dataDetail = path(['data', 'data', serviceName, 'data_detail'], response)
  if (additionalFields) {
    additionalFields.forEach((v, i) => {
      dataDetail[v] = path(['data', 'data', serviceName, v], response)
    })
  }
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  yield put(TablepaginationActions.tablepaginationFetchDataDetailDone({ dataDetail, errors, serviceName }))

  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      window.callErrorToast(element.message, 'error')
    })
  }
}
export function * tablepaginationSubmitForm (api, { data }) {
  console.log('tablepaginationSubmitForm====data', data)
  const { serviceName, history, redirectAfterCreate, isUpdate, updateServiceName } = data
  let response = null
  if (isUpdate) response = yield call(api.updateService, data)
  else response = yield call(api.createService, data)
  console.log('response======>', response)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  //   const statusBody = parseInt(path(['data', 'data', 'tablepaginationFetchData', 'status'], response) || 0)
  const errorBody = path(['data', 'data', serviceName, 'error'], response)
  const detailData = path(['data', 'data', `${isUpdate ? updateServiceName : serviceName}`, 'detail_data'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  yield put(TablepaginationActions.tablepaginationSubmitFormDone({ detailData, errors, serviceName }))
  // const history = yield call(useHistory)
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      window.callErrorToast(element.message, 'error')
    })
  } else {
    window.callErrorToast('success', 'success')
  }
  if (_.isEmpty(errors)) history.push(`${redirectAfterCreate}/${detailData._id}`)
}
export function * tablepaginationDeleteData (api, { data }) {
  console.log('tablepaginationDeleteData====data', data)
  const { serviceName, history, redirectAfterDelete } = data
  const response = yield call(api.deleteService, data)

  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  //   const statusBody = parseInt(path(['data', 'data', 'tablepaginationFetchData', 'status'], response) || 0)
  const errorBody = path(['data', 'data', serviceName, 'error'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  yield put(TablepaginationActions.tablepaginationDeleteDataDone({ errors, serviceName }))
  // const history = yield call(useHistory)
  document.getElementById('buttonCloseModal').click()
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || ((errors[0] || {}).message || '').includes('jwt expired'))) {
    console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      window.callErrorToast(element.message, 'error')
    })
  } else {
    window.callErrorToast('success', 'success')
    history.push(redirectAfterDelete)
  }
}
