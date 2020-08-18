// a library to wrap and simplify api calls
import AppConfig from '../../../Config/AppConfig'
import {getSession,generateHmac, generateSha256 } from '../../../Utils/Utils'

export const create = api => ({
  getMerchantSettlement: ({merchant_id}) => {
    const body = `query{
              getSettlements(id:"${merchant_id}",entity:merchant)
              {
                status
                error
                settlements {
                  settlement_id
                  payment_date
                  settlement_amount
                  status
                }
              }
            }`
    // const body = `query{
    //   getSettlements(id:"${merchant_id}",entity:merchant)
    //   {
    //     status
    //     error
    //     settlements {
    //       settlement_id
    //       merchant_id
    //       institution_id
    //       transaction_id
    //       payment_date
    //       status
    //       created_at
    //       updated_at
    //       transaction_amount
    //       action_to
    //       action_from
    //       percentage_fee
    //       total_fee
    //       settlement_amount
    //       fix_fee
    //     }
    //   }
    // }`
    // console.log('body==>', JSON.stringify(body))
    const query= { query:body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    console.log("queryhmac===>>>",generateHmac(query))
    const resp = api.post('/graphql', query)
    return resp
  }
})
