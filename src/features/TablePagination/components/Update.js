import React, { Component, useEffect } from 'react'
import { path } from 'ramda'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import TablepaginationActions from '../redux'

function CardBody ({ dataDetail, child, fetchData, id, tablepaginationOnChangeForm, payload }) {
  console.log('CardBody-======', dataDetail)
  React.useEffect(() => {
    console.log('React.useEffect-======', dataDetail)
    fetchData({ id })
  }, [fetchData, id])
  return child(tablepaginationOnChangeForm, dataDetail, payload)
}

function Updateform (props) {
  const history = useHistory()
  const {
    paginationConfig,
    child,
    tablepaginationOnChangeForm,
    formTitle,
    tablepaginationSubmitForm,
    id,
    dataDetail,
    tablepaginationFetchDataDetail,
    tablepaginationResetForm,
    payload,
    redirectAfterCreate,
    isNeedValidation,
    onSubmit,
    beforeSubmit
  } = props
  const loading = path(['loading', paginationConfig.serviceName], props)
  const errors = path(['errors', paginationConfig.serviceName], props) || []

  const doFetchData = React.useCallback(({ id }) => {
    console.log('doFetchData====', id)
    tablepaginationFetchDataDetail({ serviceName: paginationConfig.serviceName, id, fields: paginationConfig.fields })
  }, [])

  console.log('payload===>', payload)
  useEffect(() => {
    window.collapseBoxRefresh()
    // returned function will be called on component unmount
    return () => {
      tablepaginationResetForm({ serviceName: paginationConfig.serviceName })
    }
  }, [])
  // tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'title', fieldValue: path([paginationConfig.serviceName], dataDetail) })

  return (
    <>
      {
        !_.isEmpty(errors) && (
          <div className='alert alert-danger' role='alert'>
            <ul>
              {errors.map((r, k) => (<li key={k}>{r.message}</li>))}
            </ul>
          </div>
        )
      }
      <form
        id={paginationConfig.serviceName}
        role='form'
        onSubmit={(e) => {
          const theForm = document.getElementById(paginationConfig.serviceName)
          if (e) e.preventDefault()
          if (isNeedValidation) {
            if (theForm.checkValidity() === false) {
              e.stopPropagation()
            }
            theForm.classList.add('was-validated')
          }
          if (onSubmit) onSubmit({ tablepaginationSubmitForm, payload })
          else {
            if(beforeSubmit) {
              beforeSubmit((p) => {
                tablepaginationSubmitForm({
                  fields: paginationConfig.fields,
                  payload: { [paginationConfig.serviceName]: { ...payload[paginationConfig.serviceName], ...p } },
                  serviceName: paginationConfig.serviceName,
                  history,
                  redirectAfterCreate: redirectAfterCreate,
                  isUpdate: true,
                  updateServiceName: paginationConfig.updateServiceName,
                  id: id
                })
              })
            } else {
              tablepaginationSubmitForm({
                fields: paginationConfig.fields,
                payload,
                serviceName: paginationConfig.serviceName,
                history,
                redirectAfterCreate: redirectAfterCreate,
                isUpdate: true,
                updateServiceName: paginationConfig.updateServiceName,
                id: id
              })
            }
          }
        }}
      >
        <div className='card'>
          <div className='card-header'>
            <h3 className='card-title'>{formTitle}</h3>
            <div className='card-tools'>
              <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button>
              {/* <button type='button' className='btn btn-tool' data-card-widget='remove'><i className='fas fa-times' /></button> */}
            </div>

          </div>

          <div className='card-body'>
            <CardBody payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm} dataDetail={dataDetail} child={child} fetchData={doFetchData} id={id} />
            {/* {child(tablepaginationOnChangeForm, dataDetail)} */}
          </div>
          <div className='card-footer'>
            <button style={{ width: 100 }} type='button' onClick={() => history.goBack()} className='btn bg-gradient-warning'>Cancel</button>
            <button
              style={{ width: 100, marginLeft: 5 }} type='submit' className='btn bg-gradient-primary'
            >Submit
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.tablepagination.loading,
    errors: state.tablepagination.errors,
    payload: state.tablepagination.payload,
    dataDetail: state.tablepagination.dataDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tablepaginationOnChangeForm: data => dispatch(TablepaginationActions.tablepaginationOnChangeForm(data)),
    tablepaginationSubmitForm: data => dispatch(TablepaginationActions.tablepaginationSubmitForm(data)),
    tablepaginationFetchDataDetail: data => dispatch(TablepaginationActions.tablepaginationFetchDataDetail(data)),
    tablepaginationResetForm: data => dispatch(TablepaginationActions.tablepaginationResetForm(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Updateform))
