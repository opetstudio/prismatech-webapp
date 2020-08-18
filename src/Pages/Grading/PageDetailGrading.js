import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Detail as Detaildata, Table } from '../../features/TablePagination'
import { path } from 'ramda'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
// import moment from 'moment'
import Moment from 'moment'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

function PageDetailGrading (props) {
  const { match, history, dataDetail } = props
  const paginationConfig = {
    serviceName: 'getDetailLmsGrading',
    serviceDeleteName: 'deleteLmsGrading',
    fields: '_id,title,points,description,created_at,updated_at,course_id{_id},created_by{full_name},updated_by{full_name}'
  }
  // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
  // const courseId = path([paginationConfig.serviceName, 'subject_id', 'course_id', '_id'], dataDetail)
  return (
    <ContentWrapper
      pageTitle='Grading Detail'
      breadcrumb={[
        { title: 'Home', link: '/home' },
        // { title: 'Course', link: '/course', isActive: true },
        // { title: 'Course Detail', link: `/course/detail/${courseId}`, isActive: true },
        // { title: 'Subject Detail', link: `/subject/detail/${subjectId}`, isActive: true },
        { title: 'Grading Detail', link: null, isActive: true }
      ]}
      contentHeaderTitle='Grading Detail'
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Detaildata
            id={match.params._id}
            updateHref={`/grading/update/${match.params._id}`}
            formTitle='Grading Detail'
            paginationConfig={paginationConfig}
            child={(dataDetail) => {
              let createdAt = Moment(path([paginationConfig.serviceName, 'created_at'], dataDetail))
              if (createdAt && createdAt.isValid()) createdAt = createdAt.format('YYYY-MM-DD HH:mm:ss')
              else createdAt = ''
              let updatedAt = Moment(path([paginationConfig.serviceName, 'updated_at'], dataDetail))
              if (updatedAt && updatedAt.isValid()) updatedAt = updatedAt.format('YYYY-MM-DD HH:mm:ss')
              else updatedAt = ''
              return (
                <dl>
                  <dt>title</dt>
                  <dd>{path([paginationConfig.serviceName, 'title'], dataDetail) || ''}</dd>
                  <dt>points</dt>
                  <dd>{path([paginationConfig.serviceName, 'points'], dataDetail) || ''}</dd>
                  <dt>description</dt>
                  <dd>{path([paginationConfig.serviceName, 'description'], dataDetail) || ''}</dd>
                  <dt>Updated By</dt>
                  <dd>{path([paginationConfig.serviceName, 'updated_by', 'full_name'], dataDetail) || ''}</dd>
                  <dt>Created By</dt>
                  <dd>{path([paginationConfig.serviceName, 'created_by', 'full_name'], dataDetail) || ''}</dd>
                  <dt>Created By</dt>
                  <dd>{createdAt}</dd>
                  <dt>Updated By</dt>
                  <dd>{updatedAt}</dd>
                  {/* <dt>Content Subject Unit</dt>
                  <dd><div dangerouslySetInnerHTML={{ __html: path([paginationConfig.serviceName, 'content1'], dataDetail) || '' }} /></dd> */}
                </dl>
              )
            }}
            footerCard={dataDetail => {
              const courseId = path([paginationConfig.serviceName, 'course_id', '_id'], dataDetail)
              // const courseId = match.params.course_id
              return (
                <>
                  <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Delete</button>
                  <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(`/grading/update/${match.params._id}`)} type='button' className='btn bg-gradient-primary'>Edit</button>
                  {courseId && <button style={{ width: 150, marginLeft: 5 }} onClick={() => history.push(`/course/detail/${courseId}`)} type='button' className='btn bg-gradient-primary'>Course Detail</button>}
                </>
              )
            }}
            modalFooter={(dataDetail, tablepaginationDeleteData) => {
              // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
              const courseId = path([paginationConfig.serviceName, 'course_id', '_id'], dataDetail)
              return (
                <>
                  <button id='buttonCloseModal' type='button' className='btn btn-outline-light' data-dismiss='modal'>Cancel</button>
                  <button type='button' className='btn btn-outline-light' onClick={() => tablepaginationDeleteData({ id: match.params._id, serviceName: paginationConfig.serviceDeleteName, redirectAfterDelete: `/course/detail/${courseId}`, history })}>Delete</button>
                </>
              )
            }}
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
)(injectIntl(PageDetailGrading))
