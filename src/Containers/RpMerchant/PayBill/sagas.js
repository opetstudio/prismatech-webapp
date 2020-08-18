import { call, put, select } from 'redux-saga/effects'
import PaymentAction from './redux'
import AppConfig from '../../../Config/AppConfig'
import {setSession,getSession,destroySession} from '../../../Utils/Utils'
import _ from 'lodash'
import {path} from 'ramda'
import {isNullOrUndefined} from 'util'

export function * doPayment(api, action) {
    const { data } = action
    // console.log("data>>>>",data)
    
    const response = yield call(api.doPayment,data)
    console.log("response Payment>>>>",response)
    const err = path(['data','errors'], response)||[]

    // if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
    // const statusBods = parseInt(path(['data', 'data', 'MerchantTransactionHistory', 'status'], response) || 0)
    // const errorbody = path(['data', 'data', 'MerchantTransactionHistory', 'error'], response)||[]
    // const trxData = path(['data', 'data', 'MerchantTransactionHistory', 'transaction'], response)||[]
    // console.log("Sagas fetchTrx>>>>>>>>>>",trxData)
    // if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
    // const status = statusBody || response.status
    
    // if (_.isEmpty(err)) {
    //   const status=statusBody
    //   const isRequesting=false
    //   yield put(TrxActions.fetchTransactionDone({status,isRequesting,trxData}))
    // }
    // else{
    //   const errors=err[0]
    //   yield put(TrxActions.fetchTransactionFailed({errors,status}))
    // }
}
export function * doPaymentByCode (api, action) {
    const { data } = action
    // console.log("data>>>>",data)
    
    const response = yield call(api.doPaymentbyCode,data)
    console.log("response Payment>>",response)
    const err = path(['data','errors'], response)||[]

    if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
    const statusBody = parseInt(path(['data', 'data', 'createQrDynamic', 'status'], response) || 0)
    const errorbody = path(['data', 'data', 'createQrDynamic', 'error'], response)||[]
    const qr_code = path(['data', 'data', 'createQrDynamic', 'qr_code'], response)
    const transaction_id = path(['data', 'data', 'createQrDynam', 'transaction_id'], response)
   console.log()
    
    if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
    const status = statusBody || response.status
    
    if (_.isEmpty(err)) {
      const status=statusBody
      const isResult=true
      yield put(PaymentAction.doPaymentDone({qr_code,isResult}))
      window.callModalPayment()
    }
    else{
      let errors=''
      if(/Expected type Int!/.test(errors)){errors='You\'re exceed minimum payment'}
      if(!isNullOrUndefined(err[0].message)){ errors=err[0].message }
      else{ errors=err[0] }
      window.callErrorToast('Payment error. '+errors,'error')
      yield put(PaymentAction.doPaymentFailed({errors,status}))
    }
}