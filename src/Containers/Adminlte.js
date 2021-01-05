import React, { Component } from 'react'
import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
import RootContainer from './RootContainer'
import createStore from '../Redux'
// import ReduxPersist from '../Config/ReduxPersist'
// import { ApolloProvider } from '@apollo/react-hooks'
// import ExternalApp from '../../../manifest'
// import ApolloClient from 'apollo-boost'

// const client = new ApolloClient({
//   uri: 'http://localhost:8280/graphql'
// })

// create our store
// export const { store } = createStore()

/**
 * Provides an entry point into our application.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 */
class Adminlte extends Component {
  // createMarkup () {
  //   return {__html: '<div class="ext">Hello!</div>'}
  // }
  render () {
    console.log('translationstranslationstranslationstranslationstranslations=>', this.props.translations)
    // console.log('render')
    // if (ReduxPersist.active) {
    //   return (
    //     <Provider store={store}>
    //       <PersistGate loading={null} persistor={persistor}>
    //         <RootContainer />
    //       </PersistGate>
    //     </Provider>
    //   )
    // }
    return (
      <Provider store={this.props.store}>
        {/* <ApolloProvider client={client}> */}
        <RootContainer translations={this.props.translations} sidemenu={this.props.sidemenu} />
        {/* </ApolloProvider> */}
      </Provider>
    )
    // return (
    //   <Provider store={store}>
    // <div class='wrapper'>
    //   <header class='main-header'>
    //     <a href='index2.html' class='logo'>
    //       <span class='logo-mini'><b>PL</b></span>
    //       <span class='logo-lg'><b>PLink Direct Debet</b></span>
    //     </a>
    //     <nav class='navbar navbar-static-top'>
    //       <a href='/#' class='sidebar-toggle' data-toggle='push-menu' role='button'>
    //         <span class='sr-only'>Toggle navigation</span>
    //       </a>
    //     </nav>
    //   </header>
    // </div>
    //   </Provider>
    // )
  }
}

export default (params) => {
  // console.log('reducerreducerreducerreducerreducerreducer===>', reducer)
  const exApp = params
  const { store } = createStore({ externalApi: exApp.api, externalRedux: exApp.redux, externalSagas: exApp.sagas })
  return <Adminlte translations={exApp.translations} store={store} sidemenu={exApp.sidemenu} />
}
