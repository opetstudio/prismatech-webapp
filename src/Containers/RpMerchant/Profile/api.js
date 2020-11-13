// a library to wrap and simplify api calls
import AppConfig from '../../../Config/AppConfig'
import {getSession,generateHmac, generateSha256, getAccessToken} from '../../../Utils/Utils'

export const create = api => ({
  getMerchantInfo: ({merchant_id}) => {
    const body = `query{
      MerchantInfo(merchantID:"${merchant_id}") {
          status 
          error
          merchant
          {
            email
            fullname
            business_name
            password
            device_id
            address
            merchant_id
          }
        }
      }`
    // console.log("body fetch merchant>>>>>>>>>>",body)
    const query= { query:body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    api.setHeader('AccessToken', getAccessToken())
    const resp = api.post('/graphql', query)
    return resp
  }
})
