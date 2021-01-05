import React, { Component, useRef, useMemo } from 'react'
import qs from 'qs'
import { Detail, Multiselect } from '../../features/TablePagination'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
// import { path } from 'ramda'
import AppConfig from '../../Config/AppConfig'

export const useComponentWillMount = (func) => {
  const willMount = useRef(true)

  if (willMount.current) func()

  willMount.current = false
}
// const useComponentDidMount = func => useEffect(func, [])

// or
// export const useComponentWillMount = (func) => {
//   useMemo(func, [])
// }

const FormUpdate = (props) => {
  const {
    tablepaginationResetForm,
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName,
    id,
    roleId
  } = props
  // useComponentWillMount(() => tablepaginationResetForm({ serviceName: upsertServiceName }))
  // componentWillMount
  // useMemo(() => tablepaginationResetForm({ isInitialReset: true, serviceName: upsertServiceName }), [upsertServiceName, tablepaginationResetForm])
  React.useEffect(() => {
    const defaultFormValue = {}
    if (id) defaultFormValue._id = id
    if (roleId) defaultFormValue.role_id = [roleId]
    tablepaginationResetForm({ isInitialReset: true, serviceName: upsertServiceName, defaultFormValue })
    // if (id) tablepaginationResetForm({ isInitialReset: true, serviceName: upsertServiceName, defaultFormValue: { _id: id } })
    // if (id) tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: '_id', fieldValue: '' + id, resetValue: '' + id })
    // if (roleId) tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'role_id', fieldValue: [roleId], resetValue: [roleId] })
    // }
    // if (roleId && id) tablepaginationResetForm({ serviceName: upsertServiceName, defaultValueForm: { role_id: [roleId], _id: id } })
  }, [tablepaginationOnChangeForm, upsertServiceName, id, roleId])
  return (
    <div className='row'>
      <div className='col-sm-6'>
        <div className='form-group'>
          <label htmlFor='title'>title</label>
          <input type='text' className='form-control' value={typeof payload.title !== 'undefined' ? payload.title : dataDetail.title || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'title', fieldValue: e.target.value })} />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>name</label>
          <input type='text' className='form-control' value={typeof payload.name !== 'undefined' ? payload.name : dataDetail.name || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'name', fieldValue: e.target.value })} />
        </div>
        <div className='form-group'>
          <label htmlFor='entity'>entity</label>
          <input type='text' className='form-control' value={typeof payload.entity !== 'undefined' ? payload.entity : dataDetail.entity || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'entity', fieldValue: e.target.value })} />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>description</label>
          <input type='text' className='form-control' value={typeof payload.description !== 'undefined' ? payload.description : dataDetail.description || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'description', fieldValue: e.target.value })} />
        </div>
        {/* <div className='form-group'>
          <label htmlFor='role_id'>role id</label>
          <input type='text' className='form-control' value={typeof payload.role_id !== 'undefined' ? payload.role_id : (dataDetail.role_id || {})._id || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'role_id', fieldValue: e.target.value })} />
        </div> */}
        <div className='form-group'>
          <label htmlFor='role_id'>Pilih Beberapa Role</label>
          <br />
          <Multiselect
            className='form-control'
            label='pilih Beberapa Role'
            labelButton='Pilih'
            labelColumn='Pilih'
            optionColumnValue='_id'
            optionColumnLabel='title'
            payloadValue={payload.role_id}
            defaultValueOriginal={dataDetail.role_id}
            getColumns={({ onChange }) => []}
            listallServiceName='getAllRoles'
            fields='_id,title'
            onChange={({ val }) => { tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'role_id', fieldValue: val }) }}
          />
        </div>

        {/* <div className='form-group'>
          <label htmlFor='content2'>content2</label>
          <input type='text' className='form-control' id='content2' placeholder='Enter content 2' value={path([paginationConfig.serviceName, 'content2'], payload) || path([paginationConfig.serviceName, 'content2'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content2', fieldValue: e.target.value })} />
        </div>
        <div className='form-group'>
          <label htmlFor='content3'>content3</label>
          <input type='text' className='form-control' id='content3' placeholder='Enter content3' value={path([paginationConfig.serviceName, 'content3'], payload) || path([paginationConfig.serviceName, 'content3'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content3', fieldValue: e.target.value })} />
        </div> */}
        {/* <div className='form-group'>
          <label htmlFor='start_date'>start date</label>
          <input type='text' className='form-control' id='start_date' placeholder='Enter start_date' value={startDate} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: e.target.value })} />
        </div>
        <div className='form-group'>
          <label htmlFor='end_date'>end date</label>
          <input type='text' className='form-control' id='end_date' placeholder='Enter end_date' value={endDate} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: e.target.value })} />
        </div> */}
      </div>
    </div>
  )
}

class PageUpdateGrading extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    // const { match } = this.props
    // window.singleDatePicker('#start_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
    //   const x = document.getElementById('start_date')
    //   x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
    //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: new Date(par).getTime() })
    // })
    // window.singleDatePicker('#end_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
    //   const x = document.getElementById('end_date')
    //   x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
    //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: new Date(par).getTime() })
    // })
    // window.activateEditor({ hostBackend: AppConfig.hostBackend, at: getAccessToken(), cb: (content) => {
    //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
    // }})
    // tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: match.params.role_id })
  }

  render () {
    const { location, match } = this.props
    const queryParams = qs.parse(location.search, { ignoreQueryPrefix: true }) || {}
    // console.log('okeeeee=====', qs.parse(location.search, { ignoreQueryPrefix: true }).role_id)
    return (
      <ContentWrapper
        pageTitle='Update Privilege'
        breadcrumb={[
          { title: 'Home', link: AppConfig.appHomePage },
          { title: 'Privilege', link: '/privilege', isActive: true },
          { title: 'Form Privilege', link: null, isActive: true }
        ]}
        contentHeaderTitle='Update Privilege'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Detail
              id={match.params._id}
              detailServiceName='getDetailPrivilege'
              upsertServiceName='upsertPrivilege'
              fields='_id,role_id{_id, title},title,description,name,entity,created_at,updated_at,created_by{full_name},updated_by{full_name}'
              formTitle='Form Privilege'
              redirectAfterDelete='/privilege'
            >
              <FormUpdate roleId={queryParams.role_id} match={match} />
            </Detail>
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
export default PageUpdateGrading
