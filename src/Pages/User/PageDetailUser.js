import React from 'react'
import { injectIntl } from 'react-intl'
import { Detail } from '../../features/TablePagination'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import Helmet from 'react-helmet'
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
        <dt>Name</dt>
        <dd>{dataDetail.full_name}</dd>
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
function DetailUser (props) {
  const { match, history } = props
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
                <Detail
                  id={match.params._id}
                  detailServiceName='getDetailUser'
                  fields='_id,full_name,created_at,updated_at,created_by{full_name},updated_by{full_name}'
                  formTitle='Detail User'
                  // updatePageUrl={`/detail/user/${match.params._id}`}
                >
                  <DetailContent history={history} match={match} />
                </Detail>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
export default injectIntl(DetailUser)
