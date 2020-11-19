// import LoginContainer from './src/features/Login/Container'
import LoginPage from './src/features/Login/PageLogin'
import createStore from './src/Redux'

const { store } = createStore()
export default () => {
  return {
    store,
    feature: {
      login: {
        PageLogin: LoginPage
      }
    }
  }
}
