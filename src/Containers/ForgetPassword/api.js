// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'
import { getSession, generateHmac, generateSha256 } from '../../Utils/Utils'

export const create = api => ({
  doForgetPassword: ({ email }) => {
    const deviceId = navigator.userAgent
    const body = `mutation{forgetPasswordSendOtp(email:"${email}"){ status error otpRefNum} }`
    console.log('body forget password==>', body)
    const query = { query: body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  },
  submitForgetPassword: ({ email, otpRefNum, otp, new_password }) => {
    const deviceId = navigator.userAgent
    const body = `mutation{
      changePasswordViaForgetPassword(email:"${email}",otpRefNum:"${otpRefNum}",otp:"${otp}",new_password:"${new_password}"){ 
                    status error 
                  } 
                }`
    console.log('body submit forget password==>', body)
    const query = { query: body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  }
})
