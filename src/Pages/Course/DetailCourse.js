import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Table, Detail as Detaildata } from '../../features/TablePagination'
import CourseenrollmentActions from '../../features/CourseEnrollment/redux'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import Helmet from 'react-helmet'
import _ from 'lodash'
import { path } from 'ramda'
// import moment from 'moment'
import Moment from 'moment'
import AppConfig from '../../Config/AppConfig'
import EnrollmentList from './components/EnrollmentList'
import InstructorList from './components/InstructorList'
import GradingList from './components/GradingList'
import ModalEnroll from './components/ModalEnroll'
const basePath = AppConfig.basePath

// const columns = [
//   { Header: 'code', accessor: 'code' },
//   { Header: 'content1', accessor: 'content1' },
//   { Header: 'content2', accessor: 'content2' },
//   { Header: 'created by', accessor: 'created_by' },
//   { Header: 'created at', accessor: 'created_at' },
//   { Header: 'updated at', accessor: 'updated_at' }
// ]

const getColumns = ({ history, courseId }) => [
  {
    Header: 'Act',
    accessor: '_id',
    Cell: p => (
      <div className='btn-group'>
        <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
          <span className='sr-only'>Toggle Dropdown</span>
        </button>
        <div className='dropdown-menu' role='menu'>
          <Link className='dropdown-item' to={`${basePath}/subject/detail/${courseId}/${p.cell.value}`}>Detail</Link>
        </div>
      </div>)
  },
  // { Header: 'code', accessor: 'code' },
  { Header: 'title', accessor: 'title' },
  {
    Header: 'Short Description',
    accessor: 'content1',
    Cell: d => (
      <div dangerouslySetInnerHTML={{ __html: d.cell.value || '' }} />
    )
  },
  {
    Header: 'start_date',
    accessor: 'start_date',
    Cell: d => {
      let data = Moment(d.cell.value)
      if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
      else data = ''
      return (<span>{`${data}`}</span>)
    }
  },
  {
    Header: 'end_date',
    accessor: 'end_date',
    Cell: d => {
      let data = Moment(d.cell.value)
      if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
      else data = ''
      return (<span>{`${data}`}</span>)
    }
  },
  { Header: 'created by', accessor: 'created_by.full_name' }
  // { Header: 'created at', accessor: 'created_at' },
  // { Header: 'updated at', accessor: 'updated_at' }
]

function DetailCourse (props) {
  const { match, history, courseenrollmentSubmitEnrollmentRequest } = props
  const paginationConfig = {
    serviceName: 'getDetailCourse',
    serviceDeleteName: 'deleteCourse',
    fields: 'title,_id,status,code,start_date,end_date,content1,created_at,updated_at,created_by{full_name},updated_by{full_name}',
    additionalFields: ['is_enrolled']
  }
  const columns = getColumns({ history, courseId: match.params._id })
  return (
    <>
      <LoginCheck />
      <Helmet>
        <title>Detail Course</title>
        <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
      </Helmet>
      <div className='content-wrapper'>
        <ContentHeader
          title='Course'
          breadcrumb={[{ title: 'Home', link: '/home' }, { title: 'Course', link: '/course' }, { title: 'Course Detail', link: null, isActive: true }]}
        />
        <section className='content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12'>
                <Detaildata
                  id={match.params._id}
                  updateHref={`/course/update/${match.params._id}`}
                  redirectAfterDelete='/course'
                  formTitle='Detail Course'
                  paginationConfig={paginationConfig}
                  child={(dataDetail) => {
                    let startDate = Moment(path([paginationConfig.serviceName, 'start_date'], dataDetail))
                    if (startDate && startDate.isValid()) startDate = startDate.format('YYYY-MM-DD HH:mm:ss')
                    else startDate = ''
                    let endDate = Moment(path([paginationConfig.serviceName, 'end_date'], dataDetail))
                    if (endDate && endDate.isValid()) endDate = endDate.format('YYYY-MM-DD HH:mm:ss')
                    else endDate = ''

                    return (
                      <>
                        <dl>
                          <dt>Code</dt>
                          <dd>{path([paginationConfig.serviceName, 'code'], dataDetail) || ''}</dd>
                          <dt>Title</dt>
                          <dd>{path([paginationConfig.serviceName, 'title'], dataDetail) || ''}</dd>
                          <dt>Created By</dt>
                          <dd>{path([paginationConfig.serviceName, 'created_by', 'full_name'], dataDetail) || ''}</dd>
                          <dt>Short Description</dt>
                          <dd><div dangerouslySetInnerHTML={{ __html: path([paginationConfig.serviceName, 'content1'], dataDetail) || '' }} /></dd>
                          <dt>Status</dt>
                          <dd>{path([paginationConfig.serviceName, 'status'], dataDetail) || ''}</dd>
                          <dt>Start Date</dt>
                          <dd>{startDate}</dd>
                          <dt>End Date</dt>
                          <dd>{endDate}</dd>
                        </dl>
                      </>
                    )
                  }}
                  footerCard={(dataDetail) => {
                    // console.log('footerCard dataDetail===>', dataDetail)
                    const isEnrolled = path([paginationConfig.serviceName, 'is_enrolled'], dataDetail) || ''
                    return (
                      <>
                        <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Delete</button>
                        <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(`/course/update/${match.params._id}`)} type='button' className='btn bg-gradient-primary'>Edit</button>
                        {/* <button style={{ width: 100, marginLeft: 5 }} type='button' className='btn bg-gradient-success'>Publish</button> */}
                        <button style={{ width: 100, marginLeft: 5 }} type='button' className='btn bg-gradient-success' data-toggle='modal' data-target='#modal-enrollment' disabled={isEnrolled}>{`${isEnrolled ? 'Enrolled' : 'Enroll'}`}</button>
                        {isEnrolled && <button style={{ width: 150, marginLeft: 5 }} type='button' className='btn bg-gradient-success'>Virtual Class</button>}
                      </>
                    )
                  }}
                />
                <EnrollmentList
                  courseId={match.params._id}
                  history={history}
                />
                <InstructorList
                  courseId={match.params._id}
                  history={history}
                />
                <GradingList
                  courseId={match.params._id}
                  history={history}
                />
                <Table
                  paginationConfig={{
                    serviceName: 'getAllSubjects',
                    fields: '_id,title,start_date,end_date,content1,created_at,updated_at,created_by{full_name},updated_by{full_name}'
                  }}
                  cardTitle='Daftar Subjects'
                  whereCondition={{ course_id: match.params._id }}
                  columns={columns}
                  createHref={`/subject/create/${match.params._id}`}
                  createNewButtonLabel='Create New Subject'
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <ModalEnroll
        courseenrollmentSubmitEnrollmentRequest={courseenrollmentSubmitEnrollmentRequest}
        courseId={match.params._id}
      />
    </>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.courseenrollment.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    courseenrollmentSubmitEnrollmentRequest: data => dispatch(CourseenrollmentActions.courseenrollmentSubmitEnrollmentRequest(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DetailCourse))
