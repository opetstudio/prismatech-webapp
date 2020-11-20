import React, { Component } from 'react'
// import Navigation from '../Navigation/SwaggerNavigation'
import Navigation from '../Navigation/Navigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import AppActions, { AppSelectors } from '../Redux/AppRedux'
import ReduxPersist from '../Config/ReduxPersist'
import LoginActions, { LoginSelectors } from './Login/redux'
import { IntlProvider } from 'react-intl'
import AppConfig from '../Config/AppConfig'
// import en from 'react-intl/locale-data/en'
// import id from 'react-intl/locale-data/id'
import enTranslationMessages from '../Translations/en.json'
import idTranslationMessages from '../Translations/id.json'
// import enLocaleData from 'react-intl/locale-data/en'
// import idLocaleData from 'react-intl/locale-data/id'

const basePath = AppConfig.basePath
// export const localeData = [
//   enLocaleData,
//   idLocaleData
// ]

// localeData.forEach(locale => addLocaleData(locale))

// addLocaleData([...en])

// console.log('tessss=======window.location.pathname=', window.location.pathname)
if (window.location.pathname === `${basePath}/`) window.open(`${basePath}/login`, '_self', true)
if (window.location.pathname === `${basePath}`) window.open(`${basePath}/login`, '_self', true)

export const appLocales = ['en', 'id']

export const DEFAULT_LOCALE = 'en'

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key]
    return Object.assign(formattedMessages, { [key]: formattedMessage })
  }, {})
}

export const translationMessages = {
  en: enTranslationMessages,
  id: idTranslationMessages
}

class RootContainer extends Component {
  componentDidMount () {
    const { setAuthorizedRouters } = this.props
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    console.log('root')
    setAuthorizedRouters([
      '/merchant/info/:allMerchantId',
      AppConfig.appHomePage,
      '/virtual-account/report', '/bank/info/:sessionToken'
    ])
  }

  render (xmessages) {
    const lang = this.props.lang || 'id'
    let messages = {}
    if (translationMessages.hasOwnProperty(lang)) {
      messages = translationMessages[lang]
    }
    return (
      <IntlProvider locale={lang} messages={messages}>
        <Navigation userPrivileges={this.props.userPrivileges} appPatch={this.props.appPatch} checkLogedStatus={this.props.getLoginStatus} sidemenu={this.props.sidemenu} />
      </IntlProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loginToken: LoginSelectors.sessionToken(state.login),
    lang: AppSelectors.lang(state.app),
    userPrivileges: state.myprofile.user_privileges
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  appPatch: data => dispatch(AppActions.appPatch(data)),
  startup: () => dispatch(StartupActions.startup()),
  // getLoginStatus: query => dispatch(LoginActions.loginCheckStatus(query)),
  setAuthorizedRouters: data => dispatch(LoginActions.setAuthorizedRouters(data))
  // fetchUser: (query) => dispatch(UserActions.userRequest(query))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer)
