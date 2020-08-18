import {path} from 'ramda'
import API from '../../../Services/Api'
import AppConfig from '../../../Config/AppConfig'

AppConfig.env = 'development'

const hostBackend = AppConfig.env === 'development' ? 'http://localhost:8762' : 'http://159.65.131.214:30397'
// const hostBackend = AppConfig.env === 'development' ? 'http://localhost:8762' : 'https://api.erevnaraya.com'
const apiDashboard = API.create(hostBackend + '/dashboard-api/')
const apiDashboardPy = API.create(hostBackend + '/dashboard-api/py/')

test('login as merchantadmin@gmail.com', async () => {
  const response = await apiDashboard.loginDoLogin({userid: 'merchantadmin@gmail.com', password: 'Password1*'}, {})
  let sessionToken = path(['data', 'sessionToken'], response)
  expect((sessionToken !== null && sessionToken !== '' && sessionToken !== undefined)).toBe(true)
})

// test('Api getLogins', async () => {
//   const response = await api.getLogins()
//   const hasData = 'data' in response
//   const hasOk = 'ok' in response
//   expect(hasData).toBe(true)
//   expect(hasOk).toBe(true)
//   expect(response.ok).toBe(true)
// })
// test('Api getLogin', async () => {
//   const id = 1
//   const response = await api.getLogin({ id })
//   const hasData = 'data' in response
//   const hasOk = 'ok' in response
//   expect(hasData).toBe(true)
//   expect(hasOk).toBe(true)
//   expect(response.ok).toBe(true)
// })
// test('Api postLogin', async () => {
//   const data = {
//     field1: 'value1'
//   }
//   const response = await api.postLogin(data)
//   const hasData = 'data' in response
//   const hasOk = 'ok' in response
//   expect(hasData).toBe(true)
//   expect(hasOk).toBe(true)
//   expect(response.ok).toBe(true)
// })
// test('Api updateLogin', async () => {
//   const data = {
//     id: 1,
//     field1: 'value1'
//   }
//   const response = await api.updateLogin(data)
//   const hasData = 'data' in response
//   const hasOk = 'ok' in response
//   expect(hasData).toBe(true)
//   expect(hasOk).toBe(true)
//   expect(response.ok).toBe(true)
// })
// test('Api removeLogin', async () => {
//   const data = {
//     id: 1
//   }
//   const response = await api.removeLogin(data)
//   const hasData = 'data' in response
//   const hasOk = 'ok' in response
//   expect(hasData).toBe(true)
//   expect(hasOk).toBe(true)
//   expect(response.ok).toBe(true)
// })
