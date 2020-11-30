import _ from 'lodash'
import AppConfig from '../../Config/AppConfig'
import { getSession, generateHmac, generateSha256, getAccessToken } from '../../Utils/Utils'
import { path } from 'ramda'

const doQuery = ({ api, filter, fields, serviceName, pageSize, pageIndex }) => {
  let theFilterString = null
  const arr = []
  for (const prop in filter) {
    arr.push(`${prop}: "${filter[prop]}"`)
  }
  if (!_.isEmpty(arr)) theFilterString = _.join(arr, ',')
  console.log('theFilterString===>', theFilterString)
  const body = `query
                {
                    ${serviceName}${_.isEmpty(theFilterString) ? `(page_size: ${pageSize}, page_index: ${pageIndex})` : `(${theFilterString}, page_size: ${pageSize}, page_index: ${pageIndex})`}
                    {
                        status
                        error
                        count
                        page_count
                        list_data
                            {
                                ${fields}
                            }
                    }
                }`

  const query = { query: body }
  api.setHeader('hmac', generateHmac(JSON.stringify(query)))
  api.setHeader('AccessToken', getAccessToken())
  console.log('queryhmac===>>>', generateHmac(query))
  const resp = api.post(AppConfig.graphqlPath, query)
  return resp
}
export const create = api => ({
  getAllCourses: ({ filter, fields, serviceName, pageSize, pageIndex, distinct }) => {
    return doQuery({ api, filter, fields, serviceName, pageSize, pageIndex })
  },
  fetchAllService: ({ filter, fields, serviceName, pageSize, pageIndex, whereCondition, distinct }) => {
    let theFilterString = null
    let theWhereConditionString = ''
    const arr = []
    for (const prop in filter) {
      arr.push(`${prop}: "${filter[prop]}"`)
    }
    if (!_.isEmpty(arr)) theFilterString = _.join(arr, ',')
    console.log('theFilterString===>', theFilterString)
    console.log('whereCondition===>', whereCondition)

    const arr2 = []
    for (const prop in whereCondition) {
      const wcValue = whereCondition[prop]
      console.log('wcValue===>', wcValue)
      // check type
      if (wcValue instanceof Array) arr2.push(`${prop}: ${JSON.stringify(wcValue)}`)
      else arr2.push(`${prop}: "${whereCondition[prop]}"`)
    }
    console.log('arr2====>', arr2)
    if (!_.isEmpty(arr2)) theWhereConditionString = _.join(arr2, ',') + ','

    const body = `query{${serviceName}${_.isEmpty(theFilterString) ? `(${distinct ? 'distinct:"' + distinct + '",' : ''} ${theWhereConditionString} page_size: ${pageSize}, page_index: ${pageIndex})` : `(${distinct ? 'distinct:"' + distinct + '",' : ''} ${theWhereConditionString} ${theFilterString}, page_size: ${pageSize}, page_index: ${pageIndex})`}{status,error,count,page_count,list_data{${fields}}}}`
    const query = { query: body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    api.setHeader('AccessToken', getAccessToken())
    console.log('queryhmac===>>>', generateHmac(query))
    const resp = api.post(AppConfig.graphqlPath, query)
    return resp
  },
  fetchDetailService: ({ id, serviceName, fields, additionalFields }) => {
    const body = `query{${serviceName}(id: "${id}"){status,error,data_detail{${fields}}${additionalFields ? ',' + additionalFields.join(',') : ''}}}`
    const query = { query: body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    api.setHeader('AccessToken', getAccessToken())
    // console.log('queryhmac===>>>', generateHmac(query))
    const resp = api.post(AppConfig.graphqlPath, query)
    return resp
  },
  createService: ({ payload, serviceName, fields }) => {
    let graphQlFields = null
    const arr = []

    for (const prop in payload[serviceName]) {
      let val = payload[serviceName][prop]
      if (Array.isArray(val)) {
        console.log('arrayVal===>', val) // ["{"] ["xxxx"]
        let isValJson = false
        for(let i = 0; i< val.length; i++){
          const str = val[i]
          if(str.substring(0, 1) === '{') {
            isValJson = true
            break;
          }
        }

        if(isValJson) arr.push(`${prop}: [${val}]`)
        else arr.push(`${prop}: ${JSON.stringify(val)}`)

        // const valStr = val.map(v => v)
        // console.log('valStr===>', valStr) // ["{"]
        
        // if(isJson(valStr)) {
        //   console.log('value json')
        //   arr.push(`${prop}: ${JSON.stringify(val)}`)
        // } else {
        //   console.log('value bukan json ==>', valStr)
        //   const x = valStr;
        //   if(x.substring(0, 2) === '"{') {
        //   } else {
        //     arr.push(`${prop}: ${JSON.stringify(val)}`)
        //   }
        // }
      } else if (prop === 'content1') {
        val = encodeURIComponent(val)
        arr.push(`${prop}: "${val}"`)
      } else {
        arr.push(`${prop}: "${val}"`)
      }
    }

    if (!_.isEmpty(arr)) graphQlFields = _.join(arr, ',')
    const body = { query: `mutation{${serviceName}(${graphQlFields}){ error detail_data{${fields}} }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  deleteService: ({ serviceName, id }) => {
    const body = { query: `mutation{${serviceName}(_id: "${id}"){ error }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  updateService: ({ payload, updateServiceName, serviceName, fields, id }) => {
    let graphQlFields = null
    const arr = []
    for (const prop in payload[serviceName]) {
      let val = payload[serviceName][prop]
      if (Array.isArray(val)) {
        console.log('arrayVal===>', val)
        arr.push(`${prop}: ${JSON.stringify(val)}`)
      } else if (prop === 'content1') {
        val = encodeURIComponent(val)
        arr.push(`${prop}: "${val}"`)
      } else {
        arr.push(`${prop}: "${val}"`)
      }
    }
    arr.push(`_id: "${id}"`)
    if (!_.isEmpty(arr)) graphQlFields = _.join(arr, ',')
    const body = { query: `mutation{${updateServiceName}(${graphQlFields}){ error detail_data{${fields}} }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  }
})
