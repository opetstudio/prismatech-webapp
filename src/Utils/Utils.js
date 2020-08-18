import React from 'react'
import namor from 'namor'
import AppConfig from '../Config/AppConfig'
import Moment from 'moment'
import { merge, path } from 'ramda'
// import AES from 'crypto-js/aes'
// import EncUtf8 from 'crypto-js/enc-utf8'
// import Chance from 'chance'

const basePath = AppConfig.basePath

var AES = require('crypto-js/aes')
var hmacSha256 = require('crypto-js/hmac-sha256')
var sha256 = require('crypto-js/sha256')
var EncUtf8 = require('crypto-js/enc-utf8')

const userPriv = {
  500: 'Bank',
  400: 'Customer',
  310: 'Merchant Support',
  300: 'Merchant Admin',
  210: 'Institution Support',
  200: 'Institution Admin',
  100: 'Operator'
}
const nativeScript = (bUrl) => [
  // '/bower_components/jquery/dist/jquery.min.js',
  // '/bower_components/bootstrap/dist/js/bootstrap.min.js',
  // '/bower_components/select2/dist/js/select2.full.min.js',
  // '/bower_components/fastclick/lib/fastclick.js',
  // '/dist/js/adminlte.min.js'
  // '/bower_components/jquery-sparkline/dist/jquery.sparkline.min.js',
  // '/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js',
  // '/plugins/jvectormap/jquery-jvectormap-world-mill-en.js',
  // '/bower_components/jquery-slimscroll/jquery.slimscroll.min.js',
  // '/bower_components/chart.js/Chart.js',
  // '/plugins/iCheck/icheck.min.js',
  // `${bUrl}/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js`,
  `${bUrl}/native-script.js`
]

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  // const statusChance = Math.random()
  // const chance = new Chance()
  const _id = Date().now()
  return {
    _id,
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100)
    // status:
    //   statusChance > 0.66
    //     ? 'relationship'
    //     : statusChance > 0.33
    //       ? 'complicated'
    //       : 'single'
  }
}

export function makeData (len = 5553) {
  return range(len).map(d => {
    return {
      ...newPerson()
      // children: range(10).map(newPerson)
    }
  })
}

export const Logo = () => (
  <div
    style={{
      margin: '1rem auto',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    For more examples, visit {''}
    <br />
    <a href='https://github.com/react-tools/react-table' target='_blank'>
      <img
        src='https://github.com/react-tools/media/raw/master/logo-react-table.png'
        style={{ width: '150px', margin: '.5em auto .3em' }}
      />
    </a>
  </div>
)

export const Tips = () => (
  <div style={{ textAlign: 'center' }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>
)

export const loadScript = cb => {
  let bUrl = basePath
  var url = window.location.href
  var arr = url.split('/')
  var result = arr[0] + '//' + arr[2]
  // console.log('result====>', result)
  if (result === 'http://localhost:3000') bUrl = ''
  // window.recallDatePicker((start, end) => { console.log('start====>', start) })
  window.collapseBoxRefresh()
  window.pageReconReport()
  // nativeScript(bUrl).map(str => {
  //   var element = document.querySelector('[src=\'' + str + '\']')
  //   if (element) element.parentNode.removeChild(element)
  //   let script = document.createElement('script')
  //   script.src = str
  //   // script.async = true
  //   script.async = false
  //   document.body.appendChild(script)
  // })
}
export const loadScriptRecallDatePicker = cb => {
  window.recallDatePicker(cb)
}


export const getAccessToken = (accessTokenState) => {
  // console.log('getAccessToken')
  const sessionToken = getSession(AppConfig.sessionToken)
  accessTokenState = accessTokenState || sessionToken
  // const ok = true
  // dont encrypt
  // if (ok) return accessTokenState
  return accessTokenState

  // lakukan encrypt accessTokenState dengan RSA algoritma
  // publicToken sebagai secretKey nya
  // encryptedAccessToken = RSA(accessTokenState, publicToken)
  // encryptedBody = AES(body, encryptedAccessToken)

  // if (!publicToken || !sessionToken) return ''
  // const ciphertext = AES.encrypt(publicToken, sessionToken)
  // const plaintext = ciphertext.toString(EncUtf8)
  // const plaintext = ciphertext.toString(EncUtf8)
  // const test = aesjs.utils.utf8.toBytes('asdfadsfd')
  // const test = sha256(publicToken)
  // console.log('getAccessToken test=', test)
  // console.log('getAccessToken sha256=', test)
  // console.log('getAccessToken plaintext=', plaintext)
  // console.log('getAccessToken ciphertext=', ciphertext)
  // console.log('getAccessToken publicToken=', publicToken)
  // console.log('getAccessToken sessionToken=', sessionToken)
  // return ciphertext
  // return AES.decrypt(ciphertext.toString(), sessionToken)
}
export const decryptAt = (msg, key) => {
  console.log('decryptAt')
  const publicToken = window.sessionStorage.getItem(AppConfig.publicToken)
  const sessionToken = window.sessionStorage.getItem(AppConfig.sessionToken)
  if (!publicToken || !sessionToken) return ''
  const str = AES.decrypt(msg, sessionToken)
  var plaintext = str.toString(EncUtf8)
  return plaintext
}
export const getUserPrivName = (uPriv) => {
  return userPriv[uPriv]
}
export const isLoggedIn = (isLoggedInState) => {
  // console.log('isLoggedIn isLoggedInState1===>', isLoggedInState)
  const loginFlag = getSession(AppConfig.loginFlag)
  // isLoggedInState = isLoggedInState || loginFlag || false
  isLoggedInState = loginFlag || false
  if ((isLoggedInState === 'true' || isLoggedInState === true)) isLoggedInState = true
  else isLoggedInState = false
  // console.log('isLoggedIn isLoggedInState2===>', isLoggedInState)
  return isLoggedInState
}
export const generateHmac = (msg) => {
  return hmacSha256(msg, process.env.REACT_APP_BACKEND_BASE_URL).toString()
}
export const generateSha256 = (msg) => {
  return sha256(msg).toString()
}
export const getUserColumn = () => {
  return [{
    id: 'userId',
    Header: 'User Id',
    accessor: 'userId' // String-based value accessors!
  }, {
    id: 'userFullname', // Required because our accessor is not a string
    Header: 'Full Name',
    accessor: d => d.userFullname, // Custom value accessors!,
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    id: 'email',
    Header: props => <span>Email</span>, // Custom header components!
    accessor: 'email'
    // accessor: 'friend.age'
  },
  // {
  //   Header: 'Group',
  //   accessor: 'consUsernameMerchant'
  // },
  {
    Header: 'Phone Number',
    accessor: 'mobile'
  }, {
    Header: 'Address',
    accessor: 'address'
  }, {
    Header: 'isLogin',
    accessor: 'isLogin'
  },
  {
    Header: 'Action',
    accessor: 'userId'
  }
  ]
}
export const getTransactionColumn = () => {
  return [{
    id: 'mercRefNo',
    Header: 'Merchant Ref. Number',
    accessor: 'mercRefNo' // String-based value accessors!
  },
  {
    id: 'ecommRefNo',
    Header: 'Mbdd Ref. Number',
    accessor: 'ecommRefNo' // String-based value accessors!
  },
  // {
  //   id: 'pymtMethodCd',
  //   Header: 'Method',
  //   accessor: 'pymtMethodCd',
  //   Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  // },
  {
    id: 'coCcyAmt', // Required because our accessor is not a string
    Header: 'Amount',
    accessor: d => d.coCcyAmt, // Custom value accessors!,
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    id: 'createdDt',
    Header: props => <span>Created Date Time</span>, // Custom header components!
    accessor: d => Moment(d.createdDt).format('YYYY-MM-DD HH:mm')
    // accessor: 'friend.age'
  },
  {
    Header: 'Merchant User Id',
    accessor: 'consUsernameMerchant'
  },
  {
    Header: 'Source Of Fund',
    accessor: 'issuerCode'
  },
  {
    Header: 'Status',
    accessor: 'paySts'
  }]
}
export const setSession = (newSession, cb) => {
  const encryptedCurrentSession = window.localStorage.getItem(AppConfig.sessionData)
  let currentSessionJson = {}
  if (encryptedCurrentSession) {
    // decrypt
    var bytes = AES.decrypt(encryptedCurrentSession, 'prismalink2019')
    var decryptedData = bytes.toString(EncUtf8)
    currentSessionJson = JSON.parse(decryptedData)
    currentSessionJson = merge(currentSessionJson, newSession)
  }
  // console.log('currentSessionJson1==>', currentSessionJson)
  var ciphertext = AES.encrypt(JSON.stringify(currentSessionJson), 'prismalink2019')
  var encryptedData = ciphertext.toString()
  window.localStorage.setItem(AppConfig.sessionData, encryptedData)
  if (cb) cb()
}
export const getSession = (parameter) => {
  const encryptedCurrentSession = window.localStorage.getItem(AppConfig.sessionData)
  // console.log('encryptedCurrentSession=', encryptedCurrentSession)
  let currentSessionJson = {}
  if (encryptedCurrentSession) {
    // decrypt
    var bytes = AES.decrypt(encryptedCurrentSession, 'prismalink2019')
    var decryptedData = bytes.toString(EncUtf8)
    // console.log('decryptedData=', decryptedData)
    currentSessionJson = JSON.parse(decryptedData)
  }
  const sessionValue = path([parameter], currentSessionJson) || ''
  // console.log('getSession parameter=', parameter)
  // console.log('getSession sessionValue=', sessionValue)
  return sessionValue
}
export const destroySession=() =>{
  window.localStorage.clear() 
  console.log("session destroyed")
}
export const updateURLParameter = (url, param, paramVal) => {
  var newAdditionalURL = ''
  var tempArray = url.split('?')
  var baseURL = tempArray[0]
  var additionalURL = tempArray[1]
  var temp = ''
  if (additionalURL) {
    tempArray = additionalURL.split('&')
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split('=')[0] !== param) {
        newAdditionalURL += temp + tempArray[i]
        temp = '&'
      }
    }
  }

  var rowsTxt = temp + '' + param + '=' + paramVal
  return baseURL + '?' + newAdditionalURL + rowsTxt
}
