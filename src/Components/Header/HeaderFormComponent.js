import React, { Component } from 'react'
// import moment from 'moment'
import { useHistory } from 'react-router-dom'
// import Clock from 'react-live-clock'
// import { isNullOrUndefined } from 'util'
import { connect } from 'react-redux'

import { injectIntl } from 'react-intl'
import TablepaginationActions from '../../features/TablePagination/redux'
// import AppConfig from '../../Config/AppConfig'
// import {Images} from '../../Themes'
// import AppConfig from '../../Config/AppConfig'
// import { getAccessToken, getUserPrivName } from '../../Utils/Utils'

// const useravatar = Images.useravatar
class HeaderComponent extends Component {
  render () {
    // const timezone = moment.tz.guess()
    // const relates = this.props.relates
    const { history, payload, fileArray, serviceName, tablepaginationResetForm, tablepaginationSubmitForm } = this.props
    return (
      <nav className='fixed-top bg-light main-header navbar navbar-expand navbar-white navbar-light'>
        <span className='navbar-brand'>Simpan perubahan?</span>
        <form className='form-inline navbar-nav ml-auto'>
          {/* <form className="form-inline navbar-nav ml-auto"> */}
          {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
          <button style={{ marginRight: 5 }} className='btn btn-outline-success' type='button' onClick={() => tablepaginationResetForm({ serviceName, exceptDefaultFormValue: true })}>Batal</button>
          <button
            className='btn btn-outline-secondary' type='button' onClick={() => {
              tablepaginationSubmitForm({
                payload,
                serviceName,
                history,
                fileArray
              })
            }}
          >Simpan
          </button>
        </form>
      </nav>
    )
  }
}
export default connect(
  (state, ownProps) => {
    var serviceName = state.tablepagination.activeForm
    var payload = (state.tablepagination.payload || {})[serviceName] || {}
    var fileArray = (state.tablepagination.fileArray || {})[serviceName] || {}
    return { serviceName, payload, fileArray }
  },
  dispatch => ({ tablepaginationSubmitForm: data => dispatch(TablepaginationActions.tablepaginationSubmitForm(data)) })
)(injectIntl((props) => {
  var history = useHistory()
  return <HeaderComponent history={history} {...props} />
}))
