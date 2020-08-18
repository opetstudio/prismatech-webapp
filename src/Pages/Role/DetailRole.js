import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Table, Detail as Detaildata } from '../../features/TablePagination'
import CourseenrollmentActions from '../../features/CourseEnrollment/redux'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import PrivilegeCheckBox from './PrivilegeCheckBox'
import Helmet from 'react-helmet'
import PrivilegeActions from '../../features/Privilege/redux'
import _ from 'lodash'
import { path } from 'ramda'
// import moment from 'moment'
import Moment from 'moment'
import AppConfig from '../../Config/AppConfig'
// import EnrollmentList from './components/EnrollmentList'
// import InstructorList from './components/InstructorList'
// import ModalEnroll from './components/ModalEnroll'
const paginationConfig = {
  serviceName: 'getDetailRole',
  serviceDeleteName: 'deleteRole',
  fields: '_id,title,description,privilege_id{_id, title, name},created_at,updated_at,created_by{full_name},updated_by{full_name}'
}
const basePath = AppConfig.basePath

// const columns = [
//   { Header: 'code', accessor: 'code' },
//   { Header: 'content1', accessor: 'content1' },
//   { Header: 'content2', accessor: 'content2' },
//   { Header: 'created by', accessor: 'created_by' },
//   { Header: 'created at', accessor: 'created_at' },
//   { Header: 'updated at', accessor: 'updated_at' }
// ]
const priv = {}

const getColumns = ({ history, dataDetail, privilege, setPrivilege }) => [
  {
    Header: 'Act',
    accessor: p => (
      <div className='btn-group'>
        <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
          <span className='sr-only'>Toggle Dropdown</span>
        </button>
        <div className='dropdown-menu' role='menu'>
          <Link className='dropdown-item' to={`${basePath}/privilege/detail/${dataDetail._id}/${p._id}`}>Detail</Link>
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

function DetailRole (props) {
  const { match, history, dataDetail, privilegeCheckbox, privilegeCheckboxSubmit } = props
  // console.log('dataDetail=====>', dataDetail)
  const [privilege, setPrivilege] = useState({})
  const columns = getColumns({ history, dataDetail, privilege, setPrivilege })
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
          breadcrumb={[{ title: 'Home', link: '/home' }, { title: 'Role', link: '/role' }, { title: 'Role Detail', link: null, isActive: true }]}
        />
        <section className='content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12'>
                <Detaildata
                  id={match.params._id}
                  updateHref={`/role/update/${match.params._id}`}
                  redirectAfterDelete='/role'
                  formTitle='Detail Role'
                  paginationConfig={paginationConfig}
                  child={(dataDetail) => {
                    let createdAt = Moment(path([paginationConfig.serviceName, 'created_at'], dataDetail))
                    if (createdAt && createdAt.isValid()) createdAt = createdAt.format('YYYY-MM-DD HH:mm:ss')
                    else createdAt = ''
                    let updatedAt = Moment(path([paginationConfig.serviceName, 'updated_at'], dataDetail))
                    if (updatedAt && updatedAt.isValid()) updatedAt = updatedAt.format('YYYY-MM-DD HH:mm:ss')
                    else updatedAt = ''

                    return (
                      <>
                        <dl>
                          <dt>Title</dt>
                          <dd>{path([paginationConfig.serviceName, 'title'], dataDetail) || ''}</dd>
                          <dt>Description</dt>
                          <dd>{path([paginationConfig.serviceName, 'description'], dataDetail) || ''}</dd>
                          <dt>Updated By</dt>
                          <dd>{path([paginationConfig.serviceName, 'updated_by', 'full_name'], dataDetail) || ''}</dd>
                          <dt>Created By</dt>
                          <dd>{path([paginationConfig.serviceName, 'created_by', 'full_name'], dataDetail) || ''}</dd>
                          <dt>Created At</dt>
                          <dd>{createdAt}</dd>
                          <dt>Updated At</dt>
                          <dd>{updatedAt}</dd>
                        </dl>
                      </>
                    )
                  }}
                  footerCard={(dataDetail) => {
                    return (
                      <>
                        <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Delete</button>
                        <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(`/role/update/${match.params._id}`)} type='button' className='btn bg-gradient-primary'>Edit</button>
                      </>
                    )
                  }}
                />
                {/* <EnrollmentList
                  courseId={match.params._id}
                  history={history}
                />
                <InstructorList /> */}
                <Table
                  paginationConfig={{
                    serviceName: 'getAllPrivileges',
                    fields: '_id,title,entity,description,name,updated_at,created_by{full_name},updated_by{full_name}'
                  }}
                  // whereCondition={{ role_id: match.params._id }}
                  columns={columns}
                  // createHref={`/privilege/create/${match.params._id}`}
                  // createNewButtonLabel='Set Privileges'
                  cardHeader={() => {
                    return (
                      <>
                        <button type='button' className='btn btn-info' onClick={() => history.push(`/privilege/create/${match.params._id}`)}><i className='fas fa-plus' /> Create New Privilege</button>
                        <button type='button' style={{ marginLeft: 5 }} className='btn btn-warning' onClick={() => privilegeCheckboxSubmit({ privilegeIdsObj: privilegeCheckbox[match.params._id] || {}, roleId: match.params._id })}><i className='fas fa-plus' /> Submit Privilege </button>
                      </>
                    )
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <ModalEnroll
        courseenrollmentSubmitEnrollmentRequest={courseenrollmentSubmitEnrollmentRequest}
        courseId={match.params._id}
      /> */}
    </>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.courseenrollment.loading,
    userPrivileges: state.myprofile,
    privilegeCheckbox: state.privilege.checkbox,
    dataDetail: state.tablepagination.dataDetail[paginationConfig.serviceName] || []
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
