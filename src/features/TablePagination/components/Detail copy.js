import React from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage as T } from 'react-intl'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import TablepaginationActions from '../redux'
import Loader from '../../../Components/Loader/Loader'

function CardBody ({ errors, dataDetail, child, fetchData, id, loading }) {
  React.useEffect(() => {
    // window.collapseBoxRefresh()
    fetchData({ id })
  }, [fetchData, id])
  if (loading) return <Loader loading type='rpmerah' />
  if (!loading) {
    return (
      <>
        {!_.isEmpty(errors) &&
          <div class='alert alert-danger' role='alert'>
            <ul>
              {errors.map((v, i) => <li key={i}>{v.message}</li>)}
            </ul>
          </div>}
        {!_.isEmpty(dataDetail) && child(dataDetail, loading)}
      </>
    )
  }
}

const Detaildata = React.memo(props => {
  const history = useHistory()
  const {
    paginationConfig,
    child,
    formTitle,
    tablepaginationFetchDataDetail,
    id,
    dataDetail,
    updateHref,
    tablepaginationDeleteData,
    redirectAfterDelete,
    footerCard,
    modalFooter,
    errors,
    loading
  } = props
  // const payload = path(['payload', paginationConfig.serviceName], props) || {}
  console.log('updateHref===>', updateHref)
  const doFetchData = React.useCallback(({ id }) => {
    tablepaginationFetchDataDetail({ serviceName: paginationConfig.serviceName, id, fields: paginationConfig.fields, additionalFields: paginationConfig.additionalFields })
  }, [paginationConfig.additionalFields, paginationConfig.fields, paginationConfig.serviceName, tablepaginationFetchDataDetail])

  return (
    <>
      <div className='card'>
        <div className='card-header' data-card-widget='collapse'>
          <h3 className='card-title'>{formTitle}</h3>
          <div className='card-tools'>
            <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button>
            {/* <button type='button' className='btn btn-tool' data-card-widget='remove'><i className='fas fa-times' /></button> */}
          </div>
        </div>
        <div className='card-body'>
          <CardBody errors={errors} loading={loading} dataDetail={dataDetail} child={child} fetchData={doFetchData} id={id} />
          {/* {child(dataDetail)} */}
        </div>
        <div className='card-footer'>
          {footerCard && footerCard(dataDetail)}
          {!footerCard && (
            <>
              <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'><T id='label.delete' /></button>
              <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(updateHref)} type='button' className='btn bg-gradient-primary'><T id='label.edit' /></button>
              <button style={{ width: 100, marginLeft: 5 }} onClick={e => history.goBack()} type='button' className='btn bg-gradient-warning'><T id='label.back' /></button>
            </>
          )}
        </div>
      </div>
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
              {!loading && modalFooter && modalFooter(dataDetail, tablepaginationDeleteData)}
              {!loading && !modalFooter && (
                <>
                  <button id='buttonCloseModal' type='button' className='btn btn-outline-light' data-dismiss='modal'><T id='label.cancel' /></button>
                  <button type='button' className='btn btn-outline-light' onClick={() => tablepaginationDeleteData({ id, serviceName: paginationConfig.serviceDeleteName, redirectAfterDelete, history })}><T id='label.delete' /></button>
                </>
              )}

            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
      {/* /.modal */}

    </>
  )
})

const mapStateToProps = (state, ownProps) => {
  const errors = (state.tablepagination.errors || {})[(ownProps.paginationConfig || {}).serviceName] || []
  const loading = (state.tablepagination.loading || {})[(ownProps.paginationConfig || {}).serviceName] || false
  return {
    loading: loading,
    dataDetail: state.tablepagination.dataDetail,
    errors: errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tablepaginationFetchDataDetail: data => dispatch(TablepaginationActions.tablepaginationFetchDataDetail(data)),
    tablepaginationDeleteData: data => dispatch(TablepaginationActions.tablepaginationDeleteData(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Detaildata))
