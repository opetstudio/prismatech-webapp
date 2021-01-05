import React, { Component } from 'react'
import { Detail, Multiselect } from '../../features/TablePagination'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import AppConfig from '../../Config/AppConfig'

const FormUpdate = (props) => {
  const {
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName,
    tablepaginationResetForm,
    id
  } = props
  // useMemo(() => tablepaginationResetForm({ serviceName: upsertServiceName }), [upsertServiceName, tablepaginationResetForm])
  React.useEffect(() => {
    // if (id) tablepaginationResetForm({ isInitialReset: true, serviceName: upsertServiceName, defaultFormValue: { _id: id } })
    const defaultFormValue = {}
    if (id) defaultFormValue._id = id
    tablepaginationResetForm({ isInitialReset: true, serviceName: upsertServiceName, defaultFormValue })
  }, [tablepaginationResetForm, upsertServiceName, id])
  return (
    <div className='row'>
      <div className='col-sm-6'>
        <div className='form-group'>
          <label htmlFor='title'>title</label>
          <input type='text' className='form-control' value={typeof payload.title !== 'undefined' ? payload.title : dataDetail.title || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'title', fieldValue: e.target.value })} />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>description</label>
          <input type='text' className='form-control' id='description' placeholder='Enter description' value={typeof payload.description !== 'undefined' ? payload.description : dataDetail.description || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'description', fieldValue: e.target.value })} />
        </div>
        <div className='form-group'>
          <label htmlFor='toko_id'>Pilih Beberapa Privileges</label>
          <br />
          <Multiselect
            className='form-control'
            label='pilih Beberapa Privileges'
            labelButton='Pilih'
            labelColumn='Pilih'
            optionColumnValue='_id'
            optionColumnLabel='name'
            payloadValue={payload.privilege_id}
            defaultValueOriginal={dataDetail.privilege_id}
            getColumns={({ onChange }) => []}
            listallServiceName='getAllPrivileges'
            fields='_id,title,entity,description,name,updated_at,created_by{full_name},updated_by{full_name}'
            onChange={({ val }) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'privilege_id', fieldValue: val })}
          />
        </div>
      </div>
    </div>
  )
}
class UpdateRole extends Component {
  render () {
    console.log('dipoooooo')
    const { match } = this.props
    return (
      <ContentWrapper
        pageTitle='Update Role'
        breadcrumb={[
          { title: 'Home', link: AppConfig.appHomePage },
          { title: 'Role', link: '/role', isActive: true },
          // { title: 'Role Detail', link: `/role/detail/${match.params._id}`, isActive: true },
          { title: 'Update Role', link: null, isActive: true }
        ]}
        contentHeaderTitle='Update Role'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Detail
              id={match.params._id}
              detailServiceName='getDetailRole'
              upsertServiceName='upsertRole'
              fields='privilege_id{_id,title,name},title,_id,description,created_at,updated_at,created_by{full_name},updated_by{full_name}'
              formTitle='Update Role'
              redirectAfterDelete='/role'
            >
              <FormUpdate />
            </Detail>
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
export default UpdateRole
