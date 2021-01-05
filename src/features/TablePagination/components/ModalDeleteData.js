import React, { PureComponent } from 'react'
import { injectIntl, FormattedMessage as T } from 'react-intl'
import { connect } from 'react-redux'
import TablepaginationActions from '../redux'
import Loader from '../../../Components/Loader/Loader'
class ModalDeleteData extends PureComponent {
  render () {
    const {
      tablepaginationDeleteData,
      deleteServiceName,
      redirectAfterDelete,
      history,
      id,
      loading
    } = this.props
    console.log('modalmodalmodalmodalmodal', this.props)
    return (
      <div className='modal fade' id='modal-danger'>
        <div className='modal-dialog'>
          <div className='modal-content bg-danger'>
            <div className='modal-header'>
              <h4 className='modal-title'><T id='label-danger' /></h4>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <p><T id='label-delete-confirmation' /></p>
            </div>
            <div className='modal-footer justify-content-between'>
              {loading && <Loader loading type='rpmerah' />}
              {!loading &&
                <>
                  <button id='buttonCloseModal' type='button' className='btn btn-outline-light' data-dismiss='modal'><T id='label.cancel' /></button>
                  <button type='button' className='btn btn-outline-light' onClick={() => tablepaginationDeleteData({ id, serviceName: deleteServiceName, redirectAfterDelete, history })}><T id='label.delete' /></button>
                </>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(
  (state, ownProps) => ({ loading: (state.tablepagination.loading || {})[ownProps.deleteServiceName] }),
  dispatch => ({ tablepaginationDeleteData: data => dispatch(TablepaginationActions.tablepaginationDeleteData(data)) })
)(injectIntl(ModalDeleteData))
