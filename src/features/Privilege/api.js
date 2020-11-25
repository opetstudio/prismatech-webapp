import _ from 'lodash'
import AppConfig from '../../Config/AppConfig'
import { getSession, generateHmac, generateSha256, getAccessToken } from '../../Utils/Utils'
import { path } from 'ramda'
export const create = api => ({
  privilegeCheckboxSubmit: ({ roleId, privilegeIdsObj }) => {
    const privilegeIdsFlag = []
    for (const key in privilegeIdsObj) {
      privilegeIdsFlag.push(`{ privilege_id: "${key}", flag: ${privilegeIdsObj[key]}}`)
    }
    console.dir(privilegeIdsFlag)
    const body = { query: `mutation{privilegeCheckboxSubmit(role_id: "${roleId}", privilege_ids_flag: [${privilegeIdsFlag.join(',')}]){ error, status }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    return api.post(AppConfig.graphqlPath, body)
  }
})
