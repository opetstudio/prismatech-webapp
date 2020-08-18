// a library to wrap and simplify api calls
import AppConfig from '../../../Config/AppConfig'
import {getSession,generateHmac, generateSha256} from '../../../Utils/Utils'

export const create = api => ({
  doPayment: ({merchant_id,amount}) => {
    const body = `{
        paymentMerchant(merchant_id:${merchant_id},institution_id:${'1588133477369IntRx'},amount:${amount}) {
          status 
          error
        }
      }`  
    const query= { query:body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  },
  doPaymentbyCode: ({amount}) => {
    const merchant_id=getSession('merchant_id')
    const body = `mutation{
      createQrDynamic(merchant_id:"${merchant_id}",institution_id:"${'1588133477369IntRx'}",amount:${amount}) {
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
