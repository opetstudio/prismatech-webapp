import React from 'react'
import { injectIntl } from 'react-intl'
import { Detail as Detaildata } from '../../features/TablePagination'
import { path } from 'ramda'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import { detailService, fields, deleteService, detailPageTitle, updatePageUrl, redirectAfterDelete } from './Manifest'
import Moment from 'moment'
import AppConfig from '../../Config/AppConfig'

function Comp (props) {
  const { match, history } = props
  const paginationConfig = {
    serviceName: detailService,
    serviceDeleteName: deleteService,
    fields: fields
  }
  // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
  // const courseId = path([paginationConfig.serviceName, 'subject_id', 'course_id', '_id'], dataDetail)
  return (
    <ContentWrapper
      pageTitle={detailPageTitle}
      breadcrumb={[
        { title: 'Home', link: AppConfig.appHomePage },
        // { title: 'Course', link: '/course', isActive: true },
        // { title: 'Course Detail', link: `/course/detail/${courseId}`, isActive: true },
        // { title: 'Subject Detail', link: `/subject/detail/${subjectId}`, isActive: true },
        { title: detailPageTitle, link: null, isActive: true }
      ]}
      contentHeaderTitle={detailPageTitle}
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Detaildata
            id={match.params._id}
            updateHref={updatePageUrl(match.params._id)}
            formTitle={detailPageTitle}
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
                  <dt>Name</dt>
                  <dd>{path([paginationConfig.serviceName, 'name'], dataDetail) || ''}</dd>
                  <dt>Updated By</dt>
                  <dd>{path([paginationConfig.serviceName, 'updated_by', 'full_name'], dataDetail) || ''}</dd>
                  <dt>Created By</dt>
                  <dd>{path([paginationConfig.serviceName, 'created_by', 'full_name'], dataDetail) || ''}</dd>
                  <dt>Created By</dt>
                  <dd>{createdAt}</dd>
                  <dt>Updated By</dt>
                  <dd>{updatedAt}</dd>
                </dl>
              )

            }}
            footerCard={dataDetail => {
              // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
              return (
                <>
                  <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Delete</button>
                  <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(updatePageUrl(match.params._id))} type='button' className='btn bg-gradient-primary'>Edit</button>
                </>
              )
            }}
            modalFooter={(dataDetail, tablepaginationDeleteData) => {
              // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
              return (
                <>
                  <button id='buttonCloseModal' type='button' className='btn btn-outline-light' data-dismiss='modal'>Cancel</button>
                  <button type='button' className='btn btn-outline-light' onClick={() => tablepaginationDeleteData({ id: match.params._id, serviceName: paginationConfig.serviceDeleteName, redirectAfterDelete: redirectAfterDelete, history })}>Delete</button>
                </>
              )
            }}
          />
        </div>
      </div>

    </ContentWrapper>
  )
}
export default injectIntl(Comp)
