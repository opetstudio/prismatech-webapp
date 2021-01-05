import AppConfig from '../../Config/AppConfig'
// import { path } from 'ramda'
import _ from 'lodash'
import { getAccessToken } from '../../Utils/Utils'
// import { generateSha256 } from '../../Utils/Utils'
export const create = api => ({
  submitFilter: (data) => {
    const { filter, page, size, columns, datasource, userMerchantCode } = data
    console.log('submitFilter======filter=', filter)
    const theFilter = _.omitBy(filter, _.isEmpty)
    const filterStr = JSON.stringify(theFilter)
    const col = (columns.map(r => r.id) || []).join(' ')
    console.log('filterStr===>', filterStr)
    console.log('col===>', col)
    // api.setHeader('mId', userMerchantId)
    const at = getAccessToken()
    api.setHeader('Authorization', `Bearer ${at}`)
    api.setHeader('merchantid', `${userMerchantCode}`)
    console.log('submitFilter======filterStr=', filterStr)
    const query = `{${datasource}(page: ${page}, size: ${size}, where: "${filterStr.replace(/"/g, '\\"')}", sort: "") {content{ ${col} } size number totalPages}}`
    console.log('query===>', query)
    const resp = api.post(AppConfig.graphqlPath, { query })
    return resp
  },
  deleteRowById: (data) => {
    const { table, id, userMerchantCode, deleteById } = data
    const at = getAccessToken()
    api.setHeader('Authorization', `Bearer ${at}`)
    api.setHeader('merchantid', `${userMerchantCode}`)
    const mutation = `mutation{${deleteById}(id: "${id}"){responseCode, responseMessage, responseDescription}}`
    return api.post(AppConfig.graphqlPath, { query: mutation })
  }
})
