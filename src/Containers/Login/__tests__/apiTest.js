import { path } from 'ramda'
import API from '../../../Services/Api'

const hostBackend = process.env.REACT_APP_BACKEND_BASE_URL
console.log('hostBackend===>', hostBackend)
const apiDashboard = API.create(hostBackend)

test('login as opetstudio@gmail.com', async () => {
  const response = await apiDashboard.loginDoLogin({ email: 'opetstudio@gmail.com', password: 'password' }, {})
  // console.log('response.data.data===>', response.data.data.login.status)
  expect(response.data.data.login.status).toBe(200)
  expect(response.data.data.login.access_token).toBeDefined()
})
test('login email empty', async () => {
  const response = await apiDashboard.loginDoLogin({ email: '', password: 'password' }, {})
  // console.log('response.data.data===>', response.data.data.login.status)
  // console.log('response.data.data===>', response.data.data)
  expect(response.data.data.login.status).toBe(400)
  expect(response.data.data.login.error).toBe('Email or Password can\'t be empty')
  expect(response.data.data.login.access_token).toBe(null)
})
test('login email null', async () => {
  const response = await apiDashboard.loginDoLogin({ email: null, password: 'password' }, {})
  // console.log('response.data.data===>', response.data.data.login.status)
  // console.log('response.data.data===>', response.data.data)
  expect(response.data.data.login.status).toBe(400)
  expect(response.data.data.login.error).toBe('Invalid email or password')
  expect(response.data.data.login.access_token).toBe(null)
})
test('login email not sending', async () => {
  const response = await apiDashboard.loginDoLogin({ password: 'password' }, {})
  // console.log('response.data.data===>', response.data.data.login.status)
  // console.log('response.data.data===>', response.data.data)
  expect(response.data.data.login.status).toBe(400)
  expect(response.data.data.login.error).toBe('Invalid email or password')
  expect(response.data.data.login.access_token).toBe(null)
})
test('login password empty', async () => {
  const response = await apiDashboard.loginDoLogin({ email: 'opetstudio@gmail.com', password: '' }, {})
  // console.log('response.data.data===>', response.data.data.login.status)
  // console.log('response.data.data===>', response.data.data)
  expect(response.data.data.login.status).toBe(400)
  expect(response.data.data.login.error).toBe('Email or Password can\'t be empty')
  expect(response.data.data.login.access_token).toBe(null)
})
test('login password null', async () => {
  const response = await apiDashboard.loginDoLogin({ email: 'opetstudio@gmail.com', password: null }, {})
  expect(response.data.data.login.status).toBe(500)
  expect(response.data.data.login.error).toBe('Invalid password')
  expect(response.data.data.login.access_token).toBe(null)
})
test('login password not sending', async () => {
  const response = await apiDashboard.loginDoLogin({ email: 'opetstudio@gmail.com' }, {})
  expect(response.data.data.login.status).toBe(500)
  expect(response.data.data.login.error).toBe('Invalid password')
  expect(response.data.data.login.access_token).toBe(null)
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
