import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import TablepaginationActions from '../redux'
import Loader from '../../../Components/Loader/Loader'

function CardBody ({ userPrivileges, errors, serviceName, dataDetail, child, fetchData, id, tablepaginationOnChangeForm, payload, loading }) {
  // console.log('CardBody-======', dataDetail)
  React.useEffect(() => {
    // console.log('React.useEffect-======', dataDetail)
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
        {!_.isEmpty(dataDetail) && child(tablepaginationOnChangeForm, dataDetail, payload, loading, userPrivileges)}
      </>
    )
  }
}

const Updateform = (props) => {
  const history = useHistory()
  const {
    footerCard,
    paginationConfig,
    child,
    tablepaginationOnChangeForm,
    formTitle,
    tablepaginationSubmitForm,
    id,
    dataDetail,
    tablepaginationFetchDataDetail,
    tablepaginationResetForm,
    tablepaginationSetloading,
    payload,
    redirectAfterCreate,
    isNeedValidation,
    onSubmit,
    beforeSubmit,
    errors,
    loading,
    userPrivileges
  } = props
  // const errors = path(['errors', paginationConfig.serviceName], props) || []

  const doFetchData = React.useCallback(({ id }) => {
    console.log('doFetchData====', id)
    tablepaginationFetchDataDetail({ serviceName: paginationConfig.serviceName, id, fields: paginationConfig.fields })
  }, [paginationConfig.serviceName, paginationConfig.fields, tablepaginationFetchDataDetail])

  console.log('payload===>', payload)
  useEffect(() => {
    // window.collapseBoxRefresh()
    // returned function will be called on component unmount
    return () => {
      tablepaginationResetForm({ serviceName: paginationConfig.serviceName })
    }
  }, [tablepaginationResetForm, paginationConfig.serviceName])
  // tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'title', fieldValue: path([paginationConfig.serviceName], dataDetail) })

  return (
    <>
      {/* {
        !_.isEmpty(errors) && (
          <div className='alert alert-danger' role='alert'>
            <ul>
              {errors.map((r, k) => (<li key={k}>{r.message}</li>))}
            </ul>
          </div>
        )
      } */}
      <form
        id={paginationConfig.serviceName}
        // role='form'
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
            tablepaginationSetloading({ serviceName: paginationConfig.serviceName, isLoading: true })
            if (beforeSubmit) {
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
          <div className='card-header' data-card-widget='collapse'>
            <h3 className='card-title'>{formTitle}</h3>
            <div className='card-tools'>
              <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button>
              {/* <button type='button' className='btn btn-tool' data-card-widget='remove'><i className='fas fa-times' /></button> */}
            </div>

          </div>

          <div className='card-body'>
            <CardBody userPrivileges={userPrivileges} errors={errors} serviceName={paginationConfig.serviceName} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm} loading={loading} dataDetail={dataDetail} child={child} fetchData={doFetchData} id={id} />
            {/* {child(tablepaginationOnChangeForm, dataDetail)} */}
          </div>
          <div className='card-footer'>
            {loading && <Loader loading type='rpmerah' />}
            {!loading && footerCard && footerCard({ dataDetail })}
            {!loading && !footerCard &&
              <>
                <button style={{ width: 100 }} type='button' onClick={() => history.goBack()} className='btn bg-gradient-warning'>Cancel</button>
                <button
                  style={{ width: 100, marginLeft: 5 }} type='submit' className='btn bg-gradient-primary'
                >Submit
                </button>
              </>}
          </div>
        </div>
      </form>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  const errors = (state.tablepagination.errors || {})[(ownProps.paginationConfig || {}).serviceName] || []
  const loading = (state.tablepagination.loading || {})[(ownProps.paginationConfig || {}).serviceName] || false
  return {
    loading,
    errors,
    payload: state.tablepagination.payload,
    dataDetail: state.tablepagination.dataDetail,
    userPrivileges: state.myprofile.user_privileges
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tablepaginationSetloading: data => dispatch(TablepaginationActions.tablepaginationSetloading(data)),
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
