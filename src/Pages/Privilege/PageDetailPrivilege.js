import React from 'react'
import { injectIntl } from 'react-intl'
import { Detail } from '../../features/TablePagination'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import Moment from 'moment'
import AppConfig from '../../Config/AppConfig'

const DetailContent = (props) => {
  const {
    dataDetail
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
        <dt>Entity</dt>
        <dd>{dataDetail.entity}</dd>
        <dt>title</dt>
        <dd>{dataDetail.title}</dd>
        <dt>name</dt>
        <dd>{dataDetail.name}</dd>
        <dt>description</dt>
        <dd>{dataDetail.description}</dd>
        <dt>Diperbaharui Oleh</dt>
        <dd>{(dataDetail.updated_by || {}).full_name || ''}</dd>
        <dt>Dibuat Oleh</dt>
        <dd>{(dataDetail.created_by || {}).full_name || ''}</dd>
        <dt>Tanggal Pembuatan</dt>
        <dd>{createdAt}</dd>
        <dt>Tanggal Diperbaharui</dt>
        <dd>{updatedAt}</dd>
      </dl>
    </>
  )
}

function PageDetailPrivilege (props) {
  const { match, history } = props
  return (
    <ContentWrapper
      pageTitle='Privilege Detail'
      breadcrumb={[
        { title: 'Home', link: AppConfig.appHomePage },
        // { title: 'Course', link: '/course', isActive: true },
        // { title: 'Course Detail', link: `/course/detail/${courseId}`, isActive: true },
        // { title: 'Subject Detail', link: `/subject/detail/${subjectId}`, isActive: true },
        { title: 'Privilege', link: '/privilege', isActive: true },
        { title: 'Privilege Detail', link: null, isActive: true }
      ]}
      contentHeaderTitle='Privilege Detail'
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Detail
            id={match.params._id}
            detailServiceName='getDetailPrivilege'
            deleteServiceName='deletePrivilege'
            fields='_id,title,name,description,entity,created_at,updated_at,created_by{full_name},updated_by{full_name}'
            formTitle='Privilege Detail'
            redirectAfterDelete='/privilege'
            updatePageUrl={`/privilege/upsert/${match.params._id}`}
          >
            <DetailContent history={history} match={match} />
          </Detail>
        </div>
      </div>
    </ContentWrapper>
  )
}
export default injectIntl(PageDetailPrivilege)
