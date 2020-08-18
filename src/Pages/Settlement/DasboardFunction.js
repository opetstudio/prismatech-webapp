import React, { Component } from 'react'
import * as R from 'ramda'
import _ from 'lodash'
import moment from 'moment'

export function _toRp(value){
    let val = value == null ? 0 : value
    const amount = "IDR "+(('' + val).replace(/(.)(?=(\d{3})+$)/g, '$1,').toString())
    return amount
}
export function _getSumAmount(data){
  const temp=[]
  data.map((r,i)=>{
    temp.push({status:r.status,settlement_amount:parseInt(r.settlement_amount)})
  })
  console.log("data====>",temp)
  
  return _.sumBy(_.filter(temp,function(o) { return o.status == 'PNDNG'; }),'settlement_amount')
}

export function _getTodayAmount(data){

    const sum=_.sumBy(_.orderBy(_.filter(data,function(o) { return _formatDate(o.created_at) == moment().format('DD MMMM, YYYY'); }),['transaction_amount'],['desc']),'transaction_amount')
    return sum
}

export function _sortSettlement(data){

  const sum=_.orderBy(data,['payment_date'],['desc'])
  return sum
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

