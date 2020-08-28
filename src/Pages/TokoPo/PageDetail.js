import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import AppActions from '../../Redux/AppRedux'
import { Detail as Detaildata, Table } from '../../features/TablePagination'
import { path } from 'ramda'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import { detailService, fields, deleteService, detailPageTitle, updatePageUrl, redirectAfterDelete } from './Manifest'
// import moment from 'moment'
import Moment from 'moment'
import AppConfig from '../../Config/AppConfig'
import { lp } from '../../Utils/Pages'
const basePath = AppConfig.basePath

function createRow (title, paginationConfig, dataDetail, pathArr) {
  const val = path([paginationConfig.serviceName, pathArr[0]], dataDetail)
  let ddVal = ''
  if (!_.isEmpty(val) && Array.isArray(val)) {
    ddVal = (val.map(v => {
      if (v) return v[pathArr[1]]
      else return '-'
    })).join(', ')
  } else if (!_.isEmpty(val) && typeof val === 'object') {
    ddVal = val[pathArr[1]]
  } else {
    ddVal = val
  }
  return (
    <>
      <dt>{title}</dt>
      <dd>{ddVal || '-'}</dd>
    </>
  )
}

function Comp (props) {
  const { match, history, dataDetail, appPatch } = props
  const paginationConfig = {
    serviceName: detailService,
    serviceDeleteName: deleteService,
    fields: fields
  }

  const title = (lp[window.location.pathname] || {}).title
  if (title) appPatch({ routeActive: window.location.pathname, pageTitle: title })
  else appPatch({ routeActive: window.location.pathname, pageTitle: detailPageTitle })

  // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
  // const courseId = path([paginationConfig.serviceName, 'subject_id', 'course_id', '_id'], dataDetail)
  return (
    <ContentWrapper
      pageTitle={detailPageTitle}
      breadcrumb={[
        { title: 'Home', link: '/home' },
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
                  {createRow('Tindakan', paginationConfig, dataDetail, ['action'])}
                  {createRow('Nama', paginationConfig, dataDetail, ['full_name'])}
                  {createRow('No Telepon', paginationConfig, dataDetail, ['phone_number'])}
                  {createRow('Email', paginationConfig, dataDetail, ['email'])}
                  {createRow('Total Pembayaran', paginationConfig, dataDetail, ['total_amount'])}
                  {createRow('ID Sesi', paginationConfig, dataDetail, ['session_id'])}
                  {createRow('Kode Invoice', paginationConfig, dataDetail, ['invoice_code'])}
                  <dt>Tanggal Transaksi</dt>
                  <dd>{updatedAt}</dd>
                  {/* {createRow('Payment Page Url', paginationConfig, dataDetail, ['payment_page_url'])} */}
                </dl>
              )

            }}
            footerCard={dataDetail => {
              // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
              return (
                <>
                  {/* <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Delete</button> */}
                  {/* <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(updatePageUrl(match.params._id))} type='button' className='btn bg-gradient-primary'>Edit</button> */}
                  <button style={{ width: 100, marginLeft: 5 }} onClick={e => history.goBack()} type='button' className='btn bg-gradient-warning'>Back</button>
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

const mapStateToProps = (state, ownProps) => {
  return {
    dataDetail: state.tablepagination.dataDetail
  }
}
const mapDispatchToProps = dispatch => ({
  appPatch: data => dispatch(AppActions.appPatch(data))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Comp))
