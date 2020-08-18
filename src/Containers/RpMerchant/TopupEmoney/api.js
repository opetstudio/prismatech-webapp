// a library to wrap and simplify api calls
import AppConfig from '../../../Config/AppConfig'
import {getSession,generateHmac, generateSha256} from '../../../Utils/Utils'

export const create = api => ({
  doTopUpEmoney: ({email,amount,merchant_id}) => {
    const body = `{
        topupMerchant(merchant_id:"${merchant_id}",amount:"${amount}",email:"${email}") {
          status 
          error
        }
      }`
    const query= { query:body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  },
  doTopUpEmoneybyCode: ({amount,email}) => {
    const merchant_id=getSession('merchant_id')
    const body = `mutation{
      createQrTopUpMerchant(email:"${email}",merchant_id:"${merchant_id}",amount:${amount}) {
          qr_code
          error
          status
        }
      }`
    console.log("",body)
    const query= { query:body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  }
})
