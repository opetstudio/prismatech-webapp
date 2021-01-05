import AppConfig from '../../Config/AppConfig'
import { generateHmac } from '../../Utils/Utils'
export const create = api => ({
  signupRequest: ({ email, deviceId, fullName }) => {
    const body = { query: `mutation{signUpV2(email: "${email}", device_id: "${deviceId}", full_name: "${fullName}"){ error, status, success }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    return api.post(AppConfig.graphqlPath, body)
  }
})
