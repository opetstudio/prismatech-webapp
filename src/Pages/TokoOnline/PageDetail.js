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
import TokoTeamManifest from '../TokoTeam/Manifest'
// import moment from 'moment'
import Moment from 'moment'
import AppConfig from '../../Config/AppConfig'
import { lp } from '../../Utils/Pages'
const basePath = AppConfig.basePath

function createRow (title, paginationConfig, dataDetail, pathArr) {
  return (
    <>
      <dt>{title}</dt>
      <dd>{path([paginationConfig.serviceName, ...pathArr], dataDetail) || '-'}</dd>
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
  const [provinceRequest, setProvinceRequest] = React.useState({
    isLoaded: false,
    isRequest: false,
    error: '',
    provinces: [],
    cities: [],
    cityCount: 0
  })
  const [cityItemName, setCityItemName] = React.useState('')
  const [provinceItemName, setProvinceItemName] = React.useState('')

  const title = (lp[window.location.pathname] || {}).title
  if (title) appPatch({ routeActive: window.location.pathname, pageTitle: title })
  else appPatch({ routeActive: window.location.pathname, pageTitle: detailPageTitle })

  const province = path([paginationConfig.serviceName, 'province'], dataDetail) || ''
  const city = path([paginationConfig.serviceName, 'city'], dataDetail) || ''
  console.log('province====>', province)
  console.log('city====>', city)
  React.useEffect(() => {
    if (province) {
      fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/fetchdata-province', { method: 'GET', headers: { key: 'a6d84c88b9fc6cbdf502972c57885da1' } })
        .then(res => res.json())
        .then(
          (result) => {
            const provinceItem = _.find(((result || {}).rajaongkir || {}).results || [], { province_id: '' + province }) || {}
            setProvinceItemName(provinceItem.province)
            fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/fetchdata-city?province=' + province, { method: 'GET', headers: { key: 'a6d84c88b9fc6cbdf502972c57885da1' } })
              .then(res => res.json())
              .then(
                (result) => {
                  const cityItem = _.find(((result || {}).rajaongkir || {}).results || [], { city_id: city }) || {}
                  setCityItemName(cityItem.city_name)
                }
              )
          }
        )
    }
  }, [province])
  return (
    <ContentWrapper
      pageTitle={detailPageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
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
              let status = path([paginationConfig.serviceName, 'status'], dataDetail)

              if (status === 'active') status = 'Aktif'
              else if (status === 'inactive') status = 'Tidak Aktif'
              else status = '-'

              return (
                <dl>
                  {createRow('Id Toko', paginationConfig, dataDetail, ['_id'])}
                  {createRow('Nama Toko', paginationConfig, dataDetail, ['name'])}
                  {createRow('Slug', paginationConfig, dataDetail, ['slug'])}
                  {createRow('Pemilik', paginationConfig, dataDetail, ['owner', 'full_name'])}
                  {createRow('Website', paginationConfig, dataDetail, ['website'])}
                  {createRow('Facebook', paginationConfig, dataDetail, ['facebook'])}
                  {createRow('Instagram', paginationConfig, dataDetail, ['instagram'])}
                  {createRow('Youtube', paginationConfig, dataDetail, ['youtube'])}
                  {createRow('Deskripsi', paginationConfig, dataDetail, ['description'])}
                  <dt>Provinsi</dt>
                  <dd>{provinceItemName}</dd>
                  <dt>Kota/Kabupaten</dt>
                  <dd>{cityItemName}</dd>
                  {/* <RenderCity cities={provinceRequest.cities} city={city} /> */}
                  <dt>Status</dt>
                  <dd>{status}</dd>
                  {createRow('Plink Merchant Id', paginationConfig, dataDetail, ['plink_merchant_id'])}
                  {createRow('Plink Merchant Key Id', paginationConfig, dataDetail, ['plink_merchant_key_id'])}
                </dl>
              )
            }}
            footerCard={dataDetail => {
              // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
              return (
                <>
                  <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Hapus</button>
                  <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(updatePageUrl(match.params._id))} type='button' className='btn bg-gradient-primary'>Rubah</button>
                  <button style={{ width: 100, marginLeft: 5 }} onClick={e => history.goBack()} type='button' className='btn bg-gradient-warning'>Kembali</button>
                </>
              )
            }}
            modalFooter={(dataDetail, tablepaginationDeleteData) => {
              // const subjectId = path([paginationConfig.serviceName, 'subject_id', '_id'], dataDetail)
              return (
                <>
                  <button id='buttonCloseModal' type='button' className='btn btn-outline-light' data-dismiss='modal'>Batal</button>
                  <button type='button' className='btn btn-outline-light' onClick={() => tablepaginationDeleteData({ id: match.params._id, serviceName: paginationConfig.serviceDeleteName, redirectAfterDelete: redirectAfterDelete, history })}>Hapus</button>
                </>
              )
            }}
          />
          <Table
            cardTitle='Anggota Tim'
            paginationConfig={{ serviceName: 'getAllTokoTeamsByTokoId', fields: TokoTeamManifest.fields }}
            columns={TokoTeamManifest.getColumns({ history, tokoId: match.params._id })}
            createHref={`${TokoTeamManifest.createPageUrl()}/${match.params._id}`}
            createNewButtonLabel='Tambah anggota tim'
            whereCondition={{ toko_id: match.params._id }}
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
