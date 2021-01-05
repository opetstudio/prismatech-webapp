// import React from 'react'
import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginActions from '../../Containers/Login/redux'
import TablepaginationActions from './redux'
import _ from 'lodash'
import { callErrorToast } from '../../Utils/Utils'

export function * tablepaginationFetchData (api, { data }) {
  console.log('tablepaginationFetchData====data', data)
  const { serviceName } = data
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
      callErrorToast(element.message, 'error')
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
      callErrorToast(element.message, 'error')
    })
  }
}
export function * tablepaginationSubmitForm (api, { data }) {
  console.log('tablepaginationSubmitForm====data', data)
  const {
    payload,
    serviceName,
    history,
    fileArray
  } = data
  let errors = []
  let detailData = {}

  console.log('data.payloaddata.payload1', data.payload)

  if (fileArray) {
    // upload file
    for (const i in fileArray) {
      // fileArray
      const fileArr = fileArray[i]
      if (fileArr && errors.length === 0) {
        console.log('tidakadaaaerror')
        // const form = new FormData()
        // form.append('image[image]', {
        //   name: 'omgitsme.jpg',
        //   uri: pathToImageOnFilesystem,
        //   type: 'image/jpg'
        // })
        const uploadFileResp = yield call(api.uploadFileService, { fileArr })
        console.log('uploadFileRespxx===>', uploadFileResp)
        errors = errors.concat(path(['data', 'errors'], uploadFileResp) || [])
        if (!_.isEmpty(uploadFileResp.problem)) errors.push({ message: uploadFileResp.problem })
        else {
          const fileIds = uploadFileResp.data.list_data.map(v => v._id)
          data.payload = { ...data.payload, [i]: [...data.payload[i], ...fileIds] }
        }
        // api.post(AppConfig.graphqlPath, body)
      } else {
        console.log('adatidakadaaaerror', errors)
      }
    }
  }
  console.log('data.payloaddata.payload2', data.payload)

  if (errors.length === 0) {
    // const { serviceName, history, redirectAfterCreate, isUpdate, updateServiceName, redirectAfterCreateToParent } = data
    let response = null
    // const isUpdate = !!payload._id
    // if (isUpdate) response = yield call(api.updateService, data)
    response = yield call(api.upsertService, data)
    // else response = yield call(api.createService, data)

    console.log('response======>', response)
    errors = errors.concat(path(['data', 'errors'], response) || [])
    if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
    //   const statusBody = parseInt(path(['data', 'data', 'tablepaginationFetchData', 'status'], response) || 0)
    const errorBody = path(['data', 'data', serviceName, 'error'], response)
    detailData = path(['data', 'data', serviceName, 'detail_data'], response)
    if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
    yield put(TablepaginationActions.tablepaginationSubmitFormDone({ errors, serviceName, detailData }))
    console.log('errors========>', errors)
  }

  // const history = yield call(useHistory)
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      callErrorToast(element.message, 'error')
    })
  } else {
    callErrorToast('success', 'success')
  }
  if (_.isEmpty(errors)) {
    // detailData
    // detailData._id
    if (!payload._id) history.push(`${window.location.pathname}/${detailData._id}`)
    // if (!_.isEmpty(redirectAfterCreateToParent)) history.push(redirectAfterCreateToParent)
    // else history.push(`${redirectAfterCreate}/${detailData._id}`)
    // yield put(TablepaginationActions.tablepaginationOnChangeForm({ serviceName, fieldName: '_id', fieldValue: '' + detailData._id }))
  }
}
export function * tablepaginationDeleteData (api, { data }) {
  console.log('tablepaginationDeleteData====data', data)
  const { serviceName, history, historyPush, redirectAfterDelete } = data
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
      callErrorToast(element.message, 'error')
    })
  } else {
    callErrorToast('success', 'success')
    if (historyPush) historyPush(redirectAfterDelete)
    if (history) history.push(redirectAfterDelete)
  }
}
