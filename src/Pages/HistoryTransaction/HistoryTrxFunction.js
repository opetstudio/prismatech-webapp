// import React, { Component } from 'react'
import { store } from '../../Containers/Adminlte'
import _ from 'lodash'
import moment from 'moment'
import FilterAction from '../../Containers/RpMerchant/TransactionHistory/redux'
// import MerchantCredentialInfo from '../../Components/Merchant/MerchantCredentialInfo'

export function _toRp (value) {
  const val = value == null ? 0 : value
  const amount = 'IDR ' + (('' + val).replace(/(.)(?=(\d{3})+$)/g, '$1,').toString())
  return amount
}
export function _formatClientDate (datetime) {
  moment.tz.setDefault('Asia/Makassar')
  const clienttz = moment.tz.guess()
  const time = moment(parseInt(datetime)).tz(clienttz).format('DD MMMM, YYYY h:mm:ss')
  return time
}
export function _previewData (data) {
  const arr = []
  _.orderBy(data, ['created_at'], ['desc']).map((r, i) => {
    arr.push({ transaction_id: r.transaction_id, status: r.status, transaction_method: r.transaction_method, transaction_amount: r.transaction_amount || 0, created_at: _formatClientDate(r.created_at).toString() })
  })
  return arr
}

export function _liveFilterData (data) {
  const { f_amount_start, f_amount_end, f_date_start, f_date_end, f_status, f_trx_id } = store.getState().rptransactionfilter
  const filteredData = []

  // by trx id
  if (!_.isEmpty(f_trx_id)) { filteredData.push(_.filter(data, function (o) { return o.transaction_id == f_trx_id })) }

  // by date range
  if (!_.isEmpty(f_date_start) && !_.isEmpty(f_date_end)) { filteredData.push(_.filter(data, function (o) { return moment(parseInt(o.created_at)).format('DD-MM-YYYY') >= f_date_start && moment(parseInt(o.created_at)).format('DD-MM-YYYY') <= f_date_end })) }
  // by status
  if (!_.isEmpty(f_status)) { filteredData.push(_.filter(data, function (o) { return o.status == f_status })) }
  // by amount
  if (_.isNumber(f_amount_end) && _.isNumber(f_amount_start) && f_amount_start <= f_amount_end) { filteredData.push(_.filter(data, function (o) { return o.transaction_amount >= f_amount_start && o.transaction_amount <= f_amount_end })) }

  store.dispatch(FilterAction.doFilter({ trxData: filteredData }))

  if (filteredData.length > 1) {
    let dataFinal = []
    dataFinal = _.flatten(_.intersection(filteredData))
    return dataFinal
  } else {
    return _.flatten(filteredData)
  }
}
