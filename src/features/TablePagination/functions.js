import Immutable from 'seamless-immutable'
import config from './config'
export const fetchData = ({ history, fields, filter, loading, pageSize, pageIndex, serviceName, tablepaginationFetchData, whereCondition, distinct }) => {
  // if (loading) return
  if (!tablepaginationFetchData) return
  tablepaginationFetchData({
    serviceName: serviceName,
    pageSize: pageSize || config.defaultPageSize,
    pageIndex: pageIndex || config.defaultPageIndex,
    filter: Immutable.asMutable(filter || {}, { deep: true }),
    fields: fields,
    history,
    whereCondition,
    distinct
  })
  console.log('fetchData invoked whereCondition', whereCondition)
}
