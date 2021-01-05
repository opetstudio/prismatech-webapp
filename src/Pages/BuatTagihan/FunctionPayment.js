import _ from 'lodash'
import moment from 'moment'

export function _toRp (value) {
  const amount = 'IDR ' + (('' + value).replace(/(.)(?=(\d{3})+$)/g, '$1,').toString())
  return amount
}
export function _getTotalTrx (data) {
  return _.size(_.filter(data, function (o) { return o.status != 'CANCELLED' }))
}
export function _getTodayAmount (data) {
  const sum = _.sumBy(_.filter(data, function (o) { return _formatClientDate(o.created_at) == moment().format('DD MMMM, YYYY h:mm:ss') }), 'transaction_amount')
  return sum
}
export function _getOverallAmount (data) {
  return _.sumBy(_.filter(data, function (o) { return o.status != 'CANCELLED' }), 'transaction_amount')
}

export function _filterSummaryHist (data, tot) {
  return _.take(_.orderBy(data, ['transaction_amount'], ['desc']), tot)
}

export function _formatClientDate (datetime) {
  moment.tz.setDefault('Asia/Makassar')
  const clienttz = moment.tz.guess()
  const time = moment(parseInt(datetime)).tz(clienttz).format('DD MMMM, YYYY h:mm:ss')
  return time
}
