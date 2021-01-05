// a library to wrap and simplify api calls
// import AppConfig from '../../../Config/AppConfig'
import { getSession, generateHmac } from '../../../Utils/Utils'

export const create = api => ({
  loadQrMerchant: ({ institution_id }) => {
    const merchant_id = getSession('merchant_id')
    const body = `mutation{
      createQrStatic(merchant_id:"${merchant_id}",institution_id:"${institution_id}") {
         qr_code 
         status
         error
       }
     }`
    console.log('body>>>> ', body)
    const query = { query: body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  }
})
