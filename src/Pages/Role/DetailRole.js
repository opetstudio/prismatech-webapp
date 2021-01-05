import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import { Detail, Table } from '../../features/TablePagination'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import PrivilegeCheckBox from './PrivilegeCheckBox'
import Helmet from 'react-helmet'
import PrivilegeActions from '../../features/Privilege/redux'
import { path } from 'ramda'
import Moment from 'moment'
import AppConfig from '../../Config/AppConfig'
// import ManifestPrivilege from '../Privilege/Manifest'
// import EnrollmentList from './components/EnrollmentList'
// import InstructorList from './components/InstructorList'
// import ModalEnroll from './components/ModalEnroll'
const basePath = AppConfig.basePath

// const columns = [
//   { Header: 'code', accessor: 'code' },
//   { Header: 'content1', accessor: 'content1' },
//   { Header: 'content2', accessor: 'content2' },
//   { Header: 'created by', accessor: 'created_by' },
//   { Header: 'created at', accessor: 'created_at' },
//   { Header: 'updated at', accessor: 'updated_at' }
// ]
// const priv = {}

const getColumns = ({ history, dataDetail, privilege, setPrivilege }) => [
  {
    Header: 'Act',
    accessor: p => (
      <div className='btn-group'>
        <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
          <span className='sr-only'>Toggle Dropdown</span>
        </button>
        <div className='dropdown-menu' role='menu'>
          <Link className='dropdown-item' to={`${basePath}/privilege/detail/${p._id}`}>Detail</Link>
        </div>
      </div>)
  },
  // { Header: 'code', accessor: 'code' },
  { Header: 'entity', accessor: 'entity' },
  { Header: 'description', accessor: 'description' },
  { Header: 'title', accessor: 'title' },
  // { Header: 'name', accessor: 'name' },
  { Header: 'created by', accessor: 'created_by.full_name' },
  {
    Header: 'Set',
    accessor: p => {
      // const thePriv = _.find(dataDetail.privilege_id, { name: p.cell.value })
      // console.log('thePriv====>', thePriv)
      // if (!_.isEmpty(thePriv)) {
      //   priv[p.cell.value] = true
      //   console.log(`set ${p.cell.value} menjadi true`)
      // }
      // setPrivilege({ ...privilege, [p.cell.value]: true })
      // console.log(`privvvv====>${p.cell.value}===>${priv[p.cell.value]}`)
      const v = path(['_id'], p)
      const label = path(['name'], p)
      return (
        <div className='form-check'>
          <PrivilegeCheckBox roleId={dataDetail._id} privilegeId={v} rolePrivilegeIds={dataDetail.privilege_id} />
          {/* <input type='checkbox' className='form-check-input' id='exampleCheck1' onChange={(e) => {}} checked={priv[p.cell.value] ? true : false } onClick={(e) => { priv[p.cell.value] = e.target.checked }} /> */}
          <label className='form-check-label' htmlFor='exampleCheck1'>{label}</label>
        </div>)
    }
  }
]

const DetailContent = (props) => {
  const {
    dataDetail,
    history,
    privilege, setPrivilege, privilegeCheckboxSubmit, privilegeCheckbox
  } = props
  let createdAt = Moment(dataDetail.created_at || 0)
  if (createdAt && createdAt.isValid()) createdAt = createdAt.format('YYYY-MM-DD HH:mm:ss')
  else createdAt = ''
  let updatedAt = Moment(dataDetail.updated_at || 0)
  if (updatedAt && updatedAt.isValid()) updatedAt = updatedAt.format('YYYY-MM-DD HH:mm:ss')
  else updatedAt = ''
  return (
    <>
      <dl>
        <dt>Judul</dt>
        <dd>{dataDetail.title}</dd>
        <dt>Description</dt>
        <dd>{dataDetail.description}</dd>
        <dt>Description</dt>
        <dd>{(_.map(dataDetail.privilege_id || [], (v, k) => v.name) || []).join(', ')}</dd>
        <dt>Diperbaharui Oleh</dt>
        <dd>{(dataDetail.updated_by || {}).full_name || ''}</dd>
        <dt>Dibuat Oleh</dt>
        <dd>{(dataDetail.created_by || {}).full_name || ''}</dd>
        <dt>Tanggal Pembuatan</dt>
        <dd>{createdAt}</dd>
        <dt>Tanggal Diperbaharui</dt>
        <dd>{updatedAt}</dd>
      </dl>
      <Table
        listallServiceName='getAllPrivileges'
        fields='_id,title,entity,description,name,updated_at,created_by{full_name},updated_by{full_name}'
        columns={getColumns({ history, dataDetail, privilege, setPrivilege })}
        // createHref={upsertPageUrl()}
        // createNewButtonLabel={createNewButtonLabel}
        cardTitle='Daftar Privileges'
        cardHeader={() => {
          return (
            <>
              <button type='button' className='btn btn-info' onClick={() => history.push(`/privilege/upsert?role_id=${dataDetail._id}`)}><i className='fas fa-plus' /> Create New Privilege</button>
              <button type='button' style={{ marginLeft: 5 }} className='btn btn-warning' onClick={() => privilegeCheckboxSubmit({ privilegeIdsObj: privilegeCheckbox[dataDetail._id] || {}, roleId: dataDetail._id })}><i className='fas fa-plus' /> Submit Privilege </button>
            </>
          )
        }}
      />
    </>
  )
}

function DetailRole (props) {
  const { history, match, privilegeCheckbox, privilegeCheckboxSubmit } = props
  // console.log('dataDetail=====>', dataDetail)
  const [privilege, setPrivilege] = useState({})
  // const columns = getColumns({ history, dataDetail, privilege, setPrivilege })
  return (
    <>
      <LoginCheck />
      <Helmet>
        <title>Detail Role</title>
        <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
      </Helmet>
      <div className='content-wrapper'>
        <ContentHeader
          title='Detail Role'
          breadcrumb={[{ title: 'Home', link: AppConfig.appHomePage }, { title: 'Role', link: '/role' }, { title: 'Role Detail', link: null, isActive: true }]}
        />
        <section className='content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12'>
                <Detail
                  detailServiceName='getDetailRole'
                  deleteServiceName='deleteRole'
                  fields='_id,title,description,privilege_id{_id, title, name},created_at,updated_at,created_by{full_name},updated_by{full_name}'
                  id={match.params._id}
                  formTitle='Detail Role'
                  redirectAfterDelete='/role'
                  updatePageUrl={`/role/upsert/${match.params._id}`}
                  createPageUrl='/role/upsert'
                >
                  <DetailContent
                    privilegeCheckbox={privilegeCheckbox}
                    setPrivilege={setPrivilege}
                    privilege={privilege}
                    history={history}
                    privilegeCheckboxSubmit={privilegeCheckboxSubmit}
                  />
                </Detail>
              </div>
            </div>
          </div>
        </section>
      </div>

    </>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    // loading: state.courseenrollment.loading,
    userPrivileges: state.myprofile,
    privilegeCheckbox: state.privilege.checkbox
    // dataDetail: state.tablepagination.dataDetail[paginationConfig.serviceName] || []
  }
}
const mapDispatchToProps = dispatch => {
  return {
    privilegeCheckboxSubmit: data => dispatch(PrivilegeActions.privilegeCheckboxSubmit(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DetailRole))
