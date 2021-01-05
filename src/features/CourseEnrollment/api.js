import AppConfig from '../../Config/AppConfig'
import { generateHmac, getAccessToken } from '../../Utils/Utils'
export const create = api => ({
  courseenrollmentSubmitEnrollmentRequest: ({ courseId }) => {
    const body = { query: `mutation{submitCourseEnrollmentRequest(course_id: "${courseId}"){ error }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  }
})
