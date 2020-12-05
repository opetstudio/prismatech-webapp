import React, { Component } from 'react'
import { path } from 'ramda'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import TablepaginationActions from '../redux'

function CardBody ({ dataDetail, child, fetchData, id }) {
  React.useEffect(() => {
    window.collapseBoxRefresh()
    fetchData({ id })
  }, [fetchData, id])
  return child(dataDetail)
}

function Detaildata (props) {
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
    modalFooter
  } = props
  // const loading = path(['loading', paginationConfig.serviceName], props)
  // const payload = path(['payload', paginationConfig.serviceName], props) || {}
  console.log('updateHref===>', updateHref)
  const doFetchData = React.useCallback(({ id }) => {
    tablepaginationFetchDataDetail({ serviceName: paginationConfig.serviceName, id, fields: paginationConfig.fields, additionalFields: paginationConfig.additionalFields })
  }, [id])

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
          <CardBody dataDetail={dataDetail} child={child} fetchData={doFetchData} id={id} />
          {/* {child(dataDetail)} */}
        </div>
        <div className='card-footer'>
          {footerCard && footerCard(dataDetail)}
          {!footerCard && (
            <>
              <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Delete</button>
              <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(updateHref)} type='button' className='btn bg-gradient-primary'>Edit</button>
              <button style={{ width: 100, marginLeft: 5 }} onClick={e => history.goBack()} type='button' className='btn bg-gradient-warning'>Back</button>
            </>
          )}
        </div>
      </div>
      <div className='modal fade' id='modal-danger'>
        <div className='modal-dialog'>
          <div className='modal-content bg-danger'>
            <div className='modal-header'>
              <h4 className='modal-title'>Danger</h4>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <p>Konfirmasi hapus data.</p>
            </div>
            <div className='modal-footer justify-content-between'>
              {modalFooter && modalFooter(dataDetail, tablepaginationDeleteData)}
              {!modalFooter && (
                <>
                  <button id='buttonCloseModal' type='button' className='btn btn-outline-light' data-dismiss='modal'>Cancel</button>
                  <button type='button' className='btn btn-outline-light' onClick={() => tablepaginationDeleteData({ id, serviceName: paginationConfig.serviceDeleteName, redirectAfterDelete, history })}>Delete</button>
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
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.tablepagination.loading,
    dataDetail: state.tablepagination.dataDetail
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
