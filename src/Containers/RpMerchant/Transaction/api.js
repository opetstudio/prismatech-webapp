// a library to wrap and simplify api calls
import AppConfig from '../../../Config/AppConfig'
import {getSession,generateHmac, generateSha256, getAccessToken } from '../../../Utils/Utils'

export const create = api => ({
  fetchTrxHistory: ({merchant_id}) => {
    const body = `{
        MerchantTransactionHistory(merchant_id:"${merchant_id}") {
          status error
          success
          transaction{
            transaction_id
            transaction_amount
            created_at
            status
            transaction_method
          }
        }
      }`
    // console.log('body==>', JSON.stringify(body))
    const query= { query:body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    api.setHeader('AccessToken', getAccessToken())
    console.log("queryhmac===>>>",generateHmac(query))
    const resp = api.post('/graphql', query)
    return resp
  }
})
