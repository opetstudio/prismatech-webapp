import AppConfig from '../../Config/AppConfig'
import { generateHmac, getAccessToken } from '../../Utils/Utils'
export const create = api => ({
  purchaseorderCheckStatusRequestOtp: ({ email, trxid }) => {
    const body = { query: `mutation{purchaseorderCheckStatusRequestOtp(email: "${email}", trxid: "${trxid}"){ error, otpRefNum }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  purchaseorderCheckStatus: ({ email, trxid, otp, otpRefNum }) => {
    const body = { query: `query{purchaseorderCheckStatus(email: "${email}", trxid: "${trxid}", otp: "${otp}", otpRefNum: "${otpRefNum}"){ error, data_detail{_id, action, debitin_paymentpage_backend_baseurl, payment_page_url, session_id, total_amount, phone_number, full_name, email, shipping_address} }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  }
})
