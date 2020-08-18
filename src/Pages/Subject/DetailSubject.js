import React from 'react'
import { Link } from 'react-router-dom'
import { Detail as Detaildata, Table } from '../../features/TablePagination'
import { path } from 'ramda'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import Moment from 'moment'
import AppConfig from '../../Config/AppConfig'
import AbsensiConfirmation from './components/AbsensiConfirmation'
const basePath = AppConfig.basePath

const getColumns = ({ history, courseId, subjectId }) => [
  {
    Header: 'Act',
    accessor: p => (
      <div className='btn-group'>
        <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
          <span className='sr-only'>Toggle Dropdown</span>
        </button>
        <div className='dropdown-menu' role='menu'>
          <Link className='dropdown-item' to={`${basePath}/subject-unit/detail/${courseId}/${subjectId}/${p._id}`}>Detail</Link>
        </div>
      </div>)
  },
  {
    Header: 'Subject Content',
    accessor: 'content1',
    Cell: d => (
      <div dangerouslySetInnerHTML={{ __html: d.cell.value || '' }} />
    )
  },
  { Header: 'created by', accessor: 'created_by.full_name' }
  // { Header: 'created at', accessor: 'created_at' },
  // { Header: 'updated at', accessor: 'updated_at' }
]

function DetailCourse (props) {
  const { match, history, dataDetail } = props
  const paginationConfig = {
    serviceName: 'getDetailSubject',
    serviceDeleteName: 'deleteSubject',
    fields: 'title,_id,start_date,end_date,content1,created_at,updated_at,course_id{_id},created_by{full_name},updated_by{full_name}'
  }
  const columns = getColumns({ history, courseId: match.params.course_id, subjectId: match.params._id })
  const courseId = path([paginationConfig.serviceName, 'course_id', '_id'], dataDetail)
  return (
    <ContentWrapper
      pageTitle='Detail Subject'
      breadcrumb={[
        { title: 'Home', link: '/home' },
        { title: 'Course', link: '/course', isActive: true },
        { title: 'Course Detail', link: `/course/detail/${courseId}`, isActive: true },
        { title: 'Detail Subject', link: null, isActive: true }
      ]}
      contentHeaderTitle='Detail Subject'
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Detaildata
            id={match.params._id}
            updateHref={`/subject/update/${match.params._id}`}
            formTitle='Detail Subject'
            paginationConfig={paginationConfig}
            child={(dataDetail) => {
              let startDate = Moment(path([paginationConfig.serviceName, 'start_date'], dataDetail))
              if (startDate && startDate.isValid()) startDate = startDate.format('YYYY-MM-DD HH:mm:ss')
              else startDate = ''
              let endDate = Moment(path([paginationConfig.serviceName, 'end_date'], dataDetail))
              if (endDate && endDate.isValid()) endDate = endDate.format('YYYY-MM-DD HH:mm:ss')
              else endDate = ''
              return (
                <dl>
                  <dt>Title</dt>
                  <dd>{path([paginationConfig.serviceName, 'title'], dataDetail) || ''}</dd>
                  <dt>Created By</dt>
                  <dd>{path([paginationConfig.serviceName, 'created_by', 'full_name'], dataDetail) || ''}</dd>
                  <dt>Short Description</dt>
                  <dd><div dangerouslySetInnerHTML={{ __html: path([paginationConfig.serviceName, 'content1'], dataDetail) || '' }} /></dd>
                  <dt>Start Date</dt>
                  <dd>{startDate}</dd>
                  <dt>End Date</dt>
                  <dd>{endDate}</dd>
                </dl>
              )
            }}
            footerCard={dataDetail => {
              const courseId = path([paginationConfig.serviceName, 'course_id', '_id'], dataDetail)
              return (
                <>
                  <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Delete</button>
                  <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(`/subject/update/${match.params.course_id}/${match.params._id}`)} type='button' className='btn bg-gradient-primary'>Edit</button>
                  <button style={{ width: 150, marginLeft: 5 }} onClick={() => history.push(`/course/detail/${courseId}`)} type='button' className='btn bg-gradient-primary'>Course Detail</button>
                </>
              )
            }}
            modalFooter={(dataDetail, tablepaginationDeleteData) => {
              const courseId = path([paginationConfig.serviceName, 'course_id', '_id'], dataDetail)
              return (
                <>
                  <button id='buttonCloseModal' type='button' className='btn btn-outline-light' data-dismiss='modal'>Cancel</button>
                  <button type='button' className='btn btn-outline-light' onClick={() => tablepaginationDeleteData({ id: match.params._id, serviceName: paginationConfig.serviceDeleteName, redirectAfterDelete: `/course/detail/${courseId}`, history })}>Delete</button>
                </>
              )
            }}
          />
          <AbsensiConfirmation />
          <Table
            paginationConfig={{
              serviceName: 'getAllLmsSubjectUnits',
              fields: '_id,content1,created_at,updated_at,created_by{full_name},updated_by{full_name}'
            }}
            whereCondition={{ subject_id: match.params._id }}
            columns={columns}
            createHref={`/subject-unit/create/${courseId}/${match.params._id}`}
            createNewButtonLabel='Add Content'
          />
        </div>
      </div>

    </ContentWrapper>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    dataDetail: state.tablepagination.dataDetail
  }
}
export default connect(
  mapStateToProps,
  null
)(injectIntl(DetailCourse))
