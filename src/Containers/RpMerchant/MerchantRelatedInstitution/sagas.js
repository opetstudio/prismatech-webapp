import { call, put } from 'redux-saga/effects'
import RelatedInstitutionActions from './redux'
import _ from 'lodash'
import { path } from 'ramda'
import { isNullOrUndefined } from 'util'

export function * fetchMerchantRelatedInsitution (api, action) {
  const { data } = action

  const response = yield call(api.fetchMerchantRelatedInsitution, data)
  // console.log("response merchant institution =======>>>>",response)
  const err = path(['data', 'errors'], response) || []

  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  const statusBody = parseInt(path(['data', 'data', 'showRelatedInstitution', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'showRelatedInstitution', 'error'], response) || []
  const related_institutions = path(['data', 'data', 'showRelatedInstitution', 'institution'], response) || []
  console.log('related>>>>>>', related_institutions)
  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  const status = statusBody || response.status

  if (_.isEmpty(err)) {
    const status = statusBody
    yield put(RelatedInstitutionActions.fetchRelatedInstitutionDone({ status, related_institutions }))
  } else {
    let errors = ''
    if (!isNullOrUndefined(err[0].message)) { errors = err[0].message } else { errors = err[0] }
    // window.callErrorToast('Get your related institution. '+errors,'error')
    yield put(RelatedInstitutionActions.fetchRelatedInstitutionFailed({ errors, status }))
  }
}
