// console.log('process.env===>', process.env)
export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  analyticsTrackerId: '',
  // auth0: {
  //   clientId: cred.AUTH0_CLIENT_ID,
  //   host: cred.AUTH0_HOST
  // },
  backendURL: '',
  basePath: '',
  env: process.env.NODE_ENV,
  minDesktopScreenWidth: 770,
  authHeader: 'Authorization',
  authTokenType: 'Bearer',
  publicToken: 'publicToken',
  sessionToken: 'st',
  loginFlag: 'il',
  sessionData: 'ssst',
  copyright: process.env.REACT_APP_COPYRIGH,
  graphqlPath: process.env.REACT_APP_GRAPHQL_PATH,
  hostBackend: process.env.REACT_APP_BACKEND_BASE_URL,
  baseUrl: process.env.REACT_APP_BASE_URL,
  appName: process.env.REACT_APP_APP_NAME,
  appCode: process.env.REACT_APP_APP_CODE,
  appHomePage: process.env.REACT_APP_HOMEPAGE_PATH,
  currency: process.env.REACT_APP_CURRENCY
}
