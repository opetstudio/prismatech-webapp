import LoginContainer from './src/features/Login/Container'
export default () => {
  return {
    feature: {
      login: {
        PageLogin: LoginContainer
      }
    }
  }
}
