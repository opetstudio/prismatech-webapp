// a library to wrap and simplify api calls
// import AppConfig from '../../../Config/AppConfig'
import { generateHmac, getAccessToken } from '../../../Utils/Utils'

export const create = api => ({
  changePassword: ({ password, new_password, userId }) => {
    // const merchant_id = getSession('merchant_id')
    const at = getAccessToken()
    const body = `mutation{
      changeUserPassword(user_id:"${userId}",access_token:"${at}",password:"${password}",new_password:"${new_password}") {
          success
          status
          error
        }
      }`
    console.log('body change password====>', body)
    const query = { query: body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    api.setHeader('AccessToken', at)
    const resp = api.post('/graphql', query)
    return resp
  }
})
