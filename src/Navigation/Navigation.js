import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import _ from 'lodash'
// import { HashRouter as Router, Route, withRouter } from 'react-router-dom'

// Import Screens for the Router
// prettier-ignore
import ResponsiveContainer from '../Containers/ResponsiveContainer'
import { pageList, lp } from '../Utils/Pages'

import { loadScript } from '../Utils/Utils'
import AppConfig from '../Config/AppConfig'
const basePath = AppConfig.basePath
const loginPath = basePath + '/login'

// const publicRoutes = ['/login', '/signup']

class App extends Component {
  constructor (props) {
    super(props)
    this.checkLogin(window.location.pathname)
    this.unlisten = this.props.history.listen((location, action) => {
      console.log('halooooooooowwww', window.location.pathname)
      let r = {}
      const pathSplit = (window.location.pathname || '').split('/')
      console.log('pathSplit====>', pathSplit.length)
      if((window.location.pathname).includes('detail') || (window.location.pathname).includes('update') || (window.location.pathname).includes('create')) {
        for(let i in lp) {
          if(i.startsWith(`/${pathSplit[1]}/${pathSplit[2]}`)){ r = lp[i]; break;}
        }
      } else r = lp[window.location.pathname] || {}
      const title = r.title
      // const title = (lp[window.location.pathname] || {}).title
      if (title) this.props.appPatch({ routeActive: window.location.pathname, pageTitle: title })
      this.checkLogin(window.location.pathname)
    })
  }

  checkLogin (pathName) {
    // console.log('checkLogin statussssss')
    // console.log(pathName, 'pathnem', this.props)
    
    if (loginPath === pathName) {
      // console.log('path = ' + pathName + '|no need check status')
    } else {
      // console.log('path = ' + pathName + '|need check status')
      // this.props.checkLogedStatus({})
    }
  }

  componentWillUnmount () {
    this.unlisten()
  }

  componentDidMount () {
    loadScript()
  }

  render () {
    return <div>{this.props.children}</div>
  }
}
const AppContainer = withRouter(App)
class NavigationRouter extends Component {
  render () {
    const { userPrivileges } = this.props
    // console.log('userPrivileges========>', userPrivileges)
    const authorizedRoute = _.filter(pageList, v => (userPrivileges || []).includes(v.path) || v.isPublic)
    // console.log('authorizedRoute===>', authorizedRoute)
    return (
      <Router>
        <AppContainer checkLogedStatus={this.props.checkLogedStatus} appPatch={this.props.appPatch}>
          <ResponsiveContainer sidemenu={this.props.sidemenu} appname='adminlte' is>
            {authorizedRoute.map(r => (
              <Route key={r.path} exact path={`${basePath}${r.path}`} component={r.component} />
            ))}
          </ResponsiveContainer>
        </AppContainer>
      </Router>
    )
  }
}
export default NavigationRouter
