import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Table, Detail as Detaildata } from '../../features/TablePagination'
import CourseenrollmentActions from '../../features/CourseEnrollment/redux'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
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
  serviceName: 'getDetailUser',
  serviceDeleteName: 'deleteRole',
  fields: '_id,full_name,created_at,updated_at,created_by{full_name},updated_by{full_name}'
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
function DetailUser (props) {
  const { match, history, dataDetail, privilegeCheckbox, privilegeCheckboxSubmit } = props
  // console.log('dataDetail=====>', dataDetail)
  const [privilege, setPrivilege] = useState({})
  return (
    <>
      <LoginCheck />
      <Helmet>
        <title>Detail User</title>
        <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
      </Helmet>
      <div className='content-wrapper'>
        <ContentHeader
          title='Detail User'
          breadcrumb={[{ title: 'Home', link: AppConfig.appHomePage }, { title: 'User', link: '/user' }, { title: 'User Detail', link: null, isActive: true }]}
        />
        <section className='content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12'>
                <Detaildata
                  id={match.params._id}
                  updateHref={`/detail/user/${match.params._id}`}
                  redirectAfterDelete='/user'
                  formTitle='Detail User'
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
                          <dt>Name</dt>
                          <dd>{path([paginationConfig.serviceName, 'full_name'], dataDetail) || ''}</dd>
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
                        {/* <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Delete</button> */}
                        {/* <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(`/role/update/${match.params._id}`)} type='button' className='btn bg-gradient-primary'>Edit</button> */}
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
)(injectIntl(DetailUser))
