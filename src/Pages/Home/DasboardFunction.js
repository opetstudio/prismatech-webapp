import React, { Component } from 'react'
import * as R from 'ramda'
import _ from 'lodash'
import moment from 'moment'

export function _toRp(value){
    let val = value == null ? 0 : value
    const amount = "IDR "+(('' + val).replace(/(.)(?=(\d{3})+$)/g, '$1,').toString())
    return amount
}

export function _getTotalTrx(data){

  return _.size(_.filter(data,function(o) { return o.status != 'CANCELLED'; }))
}
export function _getTodayAmount(data){

    const sum=_.sumBy(_.orderBy(_.filter(data,function(o) { return _formatDate(o.created_at) == moment().format('DD MMMM, YYYY'); }),['transaction_amount'],['desc']),'transaction_amount')
    return sum
}
export function _getOverallAmount(data){ 
  return  _.sumBy(_.filter(data,function(o) { return o.status != 'CANCELLED' || o.status != 'PENDING'; }),'transaction_amount')
}

export function _filterSummaryHist(data,tot){ 
    return  _.take(_.orderBy(data,['created_at'],['desc']),tot)
}

function _formatDate(datetime){
  moment.tz.setDefault("Asia/Makassar");
  let clienttz=moment.tz.guess()
  const time=moment(parseInt(datetime)).tz(clienttz).format('DD MMMM, YYYY')
  return time
}

export function _formatClientDate(datetime){
    moment.tz.setDefault("Asia/Makassar");
    let clienttz=moment.tz.guess()
    const time=moment(parseInt(datetime)).tz(clienttz).format('DD MMMM, YYYY h:mm:ss')
    return time
}

