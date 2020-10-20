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

function DetailSubjectUnit (props) {
  const { match, history, dataDetail } = props
  const paginationConfig = {
    serviceName: 'getDetailLmsSubjectUnit',
    serviceDeleteName: 'deleteLmsSubjectUnit',
    fields: '_id,content1,title,points,created_at,updated_at,grading_id{title, points},subject_id{_id, course_id{_id}},created_by{full_name},updated_by{full_name}'
  }
  const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
  const courseId = path([paginationConfig.serviceName, 'subject_id', 'course_id', '_id'], dataDetail)
  return (
    <ContentWrapper
      pageTitle='Subject Unit Detail'
      breadcrumb={[
        { title: 'Home', link: AppConfig.appHomePage },
        { title: 'Course', link: '/course', isActive: true },
        { title: 'Course Detail', link: `/course/detail/${courseId}`, isActive: true },
        { title: 'Subject Detail', link: `/subject/detail/${subjectId}`, isActive: true },
        { title: 'Subject Unit Detail', link: null, isActive: true }
      ]}
      contentHeaderTitle='Subject Unit Detail'
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Detaildata
            id={match.params._id}
            updateHref={`/subject-unit/update/${match.params._id}`}
            formTitle='Subject Unit Detail'
            paginationConfig={paginationConfig}
            child={(dataDetail) => {
              // let startDate = Moment(path([paginationConfig.serviceName, 'start_date'], dataDetail))
              // if (startDate && startDate.isValid()) startDate = startDate.format('YYYY-MM-DD HH:mm:ss')
              // else startDate = ''
              // let endDate = Moment(path([paginationConfig.serviceName, 'end_date'], dataDetail))
              // if (endDate && endDate.isValid()) endDate = endDate.format('YYYY-MM-DD HH:mm:ss')
              // else endDate = ''
              return (
                <dl>
                  <dt>Title</dt>
                  <dd>{path([paginationConfig.serviceName, 'title'], dataDetail) || ''}</dd>
                  <dt>Content</dt>
                  <dd><div dangerouslySetInnerHTML={{ __html: path([paginationConfig.serviceName, 'content1'], dataDetail) || '' }} /></dd>
                  <dt>Grading</dt>
                  <dd>{path([paginationConfig.serviceName, 'grading_id', 'title'], dataDetail) || ''}({path([paginationConfig.serviceName, 'grading_id', 'points'], dataDetail) || ''})</dd>
                  <dt>Points</dt>
                  <dd>{path([paginationConfig.serviceName, 'points'], dataDetail) || ''}</dd>
                  <dt>Created By</dt>
                  <dd>{path([paginationConfig.serviceName, 'created_by', 'full_name'], dataDetail) || ''}</dd>
                  
                </dl>
              )
            }}
            footerCard={dataDetail => {
              const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
              return (
                <>
                  <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Delete</button>
                  <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(`/subject-unit/update/${match.params.course_id}/${subjectId}/${match.params._id}`)} type='button' className='btn bg-gradient-primary'>Edit</button>
                  <button style={{ width: 150, marginLeft: 5 }} onClick={() => history.push(`/subject/detail/${match.params.course_id}/${subjectId}`)} type='button' className='btn bg-gradient-primary'>Subject Detail</button>
                </>
              )
            }}
            modalFooter={(dataDetail, tablepaginationDeleteData) => {
              const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
              return (
                <>
                  <button id='buttonCloseModal' type='button' className='btn btn-outline-light' data-dismiss='modal'>Cancel</button>
                  <button type='button' className='btn btn-outline-light' onClick={() => tablepaginationDeleteData({ id: match.params._id, serviceName: paginationConfig.serviceDeleteName, redirectAfterDelete: `/subject/detail/${subjectId}`, history })}>Delete</button>
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
)(injectIntl(DetailSubjectUnit))

