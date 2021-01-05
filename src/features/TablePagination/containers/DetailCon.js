import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import TablepaginationActions from '../redux'
import Loader from '../../../Components/Loader/Loader'
import UpdateViewForm from '../components/UpdateViewForm'
import ModalDeleteData from '../components/ModalDeleteData'

function DetailContent ({
  history,
  children,
  userPrivileges,
  errors,
  upsertServiceName,
  detailServiceName,
  deleteServiceName,
  dataDetail,
  child: childFunc,
  fetchData,
  id,
  tablepaginationOnChangeForm,
  tablepaginationDeleteData,
  tablepaginationResetForm,
  payload,
  loading,
  updatePageUrl,
  createPageUrl,
  redirectAfterDelete,
  needToSave,
  activeForm,
  fileArray
}) {
  // console.log('CardBody-======', dataDetail)
  React.useEffect(() => {
    // console.log('React.useEffect-======', dataDetail)
    if (id) fetchData({ id })
  }, [fetchData, id])

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        tablepaginationOnChangeForm,
        tablepaginationResetForm,
        dataDetail,
        payload,
        loading,
        userPrivileges,
        childFunc,
        upsertServiceName,
        detailServiceName,
        id,
        needToSave,
        activeForm,
        fileArray
      })
    }
    return child
  })

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

        {childrenWithProps}
        {id && deleteServiceName && <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Hapus</button>}
        {updatePageUrl && <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(updatePageUrl)} type='button' className='btn bg-gradient-primary'>Ubah</button>}
        {createPageUrl && <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(createPageUrl)} type='button' className='btn bg-gradient-info'>Buat</button>}
        <ModalDeleteData
          tablepaginationDeleteData={tablepaginationDeleteData}
          deleteServiceName={deleteServiceName}
          redirectAfterDelete={redirectAfterDelete}
          history={history}
          id={id}
        />
      </>
    )
  }
}

const Updateform = (props) => {
  const history = useHistory()
  const {
    // footerCard,
    // paginationConfig,
    childFunc,
    tablepaginationOnChangeForm,
    // formTitle,
    // tablepaginationSubmitForm,
    id,
    dataDetail,
    tablepaginationFetchDataDetail,
    tablepaginationResetForm,
    tablepaginationDeleteData,
    // tablepaginationSetloading,
    payload,
    // redirectAfterCreate,
    // isNeedValidation,
    // onSubmit,
    // beforeSubmit,
    errors,
    loading,
    userPrivileges,
    children,
    serviceName,
    detailServiceName,
    upsertServiceName,
    fields,
    updatePageUrl,
    createPageUrl,
    // for delete process
    redirectAfterDelete,
    deleteServiceName,
    needToSave,
    activeForm,
    fileArray
  } = props
  // const errors = path(['errors', paginationConfig.serviceName], props) || []
  // console.log('hhhhhhhhfffff', props)
  const doFetchData = React.useCallback(({ id }) => {
    tablepaginationFetchDataDetail({ serviceName: detailServiceName, id, fields })
  }, [tablepaginationFetchDataDetail, detailServiceName, fields])
  useEffect(() => {
    // window.collapseBoxRefresh()
  //   activeForm: '',
  // activeDetail: ''
    // tablepaginationResetForm({ serviceName: upsertServiceName, activeForm: upsertServiceName, activeDetail: detailServiceName })
    // returned function will be called on component unmount
    return () => {
      tablepaginationResetForm({ serviceName: upsertServiceName })
    }
  }, [tablepaginationResetForm, upsertServiceName])
  
  return (
    <DetailContent
      activeForm={activeForm}
      needToSave={needToSave}
      history={history}
      upsertServiceName={upsertServiceName}
      detailServiceName={detailServiceName}
      deleteServiceName={deleteServiceName}
      userPrivileges={userPrivileges}
      errors={errors}
      serviceName={serviceName}
      payload={payload || {}}
      tablepaginationResetForm={tablepaginationResetForm}
      tablepaginationOnChangeForm={tablepaginationOnChangeForm}
      tablepaginationDeleteData={tablepaginationDeleteData}
      loading={loading}
      dataDetail={dataDetail || {}}
      childFunc={childFunc}
      fetchData={doFetchData}
      id={id}
      updatePageUrl={updatePageUrl}
      createPageUrl={createPageUrl}
      redirectAfterDelete={redirectAfterDelete}
      fileArray={fileArray}
    >
      {children && children}
      {!children && childFunc && <UpdateViewForm />}
    </DetailContent>
  )
}

const mapStateToProps = (state, ownProps) => {
  // const errors = (state.tablepagination.errors || {})[(ownProps.paginationConfig || {}).serviceName] || []
  // const loading = (state.tablepagination.loading || {})[(ownProps.paginationConfig || {}).serviceName] || false

  const errors = (state.tablepagination.errors || {})[ownProps.detailServiceName]
  const loading = (state.tablepagination.loading || {})[ownProps.detailServiceName]
  const dataDetail = (state.tablepagination.dataDetail || {})[ownProps.detailServiceName]
  const payload = (state.tablepagination.payload || {})[ownProps.upsertServiceName]
  const fileArray = (state.tablepagination.fileArray || {})[ownProps.upsertServiceName] || {}

  return {
    fileArray,
    currentFileArray: state.tablepagination.currentFileArray,
    loading,
    errors,
    payload,
    needToSave: state.tablepagination.needToSave,
    activeForm: state.tablepagination.activeForm,
    dataDetail: dataDetail || {},
    userPrivileges: state.myprofile.user_privileges
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tablepaginationSetloading: data => dispatch(TablepaginationActions.tablepaginationSetloading(data)),
    tablepaginationOnChangeForm: data => dispatch(TablepaginationActions.tablepaginationOnChangeForm(data)),
    tablepaginationSubmitForm: data => dispatch(TablepaginationActions.tablepaginationSubmitForm(data)),
    tablepaginationFetchDataDetail: data => dispatch(TablepaginationActions.tablepaginationFetchDataDetail(data)),
    tablepaginationResetForm: data => dispatch(TablepaginationActions.tablepaginationResetForm(data)),
    tablepaginationDeleteData: data => dispatch(TablepaginationActions.tablepaginationDeleteData(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Updateform))
