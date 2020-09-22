import React, { Component } from 'react'
import { Table, Update as Updateform, Combobox } from '../../features/TablePagination'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import Helmet from 'react-helmet'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import AppActions from '../../Redux/AppRedux'
import _ from 'lodash'
import moment from 'moment'
import { path } from 'ramda'
import AppConfig from '../../Config/AppConfig'
import { getAccessToken } from '../../Utils/Utils'
import { lp } from '../../Utils/Pages'
import CategoryManifest from '../Category/Manifest'
import { updatePageTitle, detailPageTitle, detailPageUrl, redirectAfterCreate, fields, updateService, detailService, createNewButtonLabel, getColumns } from './Manifest'

let tablepaginationOnChangeFormFunc = null
const paginationConfig = {
  serviceName: detailService,
  updateServiceName: updateService,
  fields: fields
}

class Comp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      provinces: [],
      cities: [],
      subcities: [],
      error: null
    }
    this.fetchCity = this.fetchCity.bind(this)
    this.fetchSubCity = this.fetchSubCity.bind(this)
  }

  componentDidMount () {
    const { match, appPatch, payload, dataDetail } = this.props
    const title = (lp[window.location.pathname] || {}).title
    if (title) appPatch({ routeActive: window.location.pathname, pageTitle: title })
    else appPatch({ routeActive: window.location.pathname, pageTitle: updatePageTitle })
    // window.singleDatePicker('#start_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
    //   const x = document.getElementById('start_date')
    //   x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
    //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: new Date(par).getTime() })
    // })
    // window.singleDatePicker('#end_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
    //   const x = document.getElementById('end_date')
    //   x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
    //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: new Date(par).getTime() })
    // })
    // window.activateEditor({ hostBackend: process.env.REACT_APP_BACKEND_BASE_URL, at: getAccessToken(), cb: (content) => {
    //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
    // }})
    // tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: match.params.role_id })
    fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/fetchdata-province', { method: 'GET', headers: { key: 'a6d84c88b9fc6cbdf502972c57885da1' } })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: false,
            provinces: ((result || {}).rajaongkir || {}).results || []
          })
          const province = path([paginationConfig.serviceName, 'province'], payload) || path([paginationConfig.serviceName, 'province'], dataDetail) || ''
          this.fetchCity(province)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            error
          })
        }
      )
  }

  fetchCity (provinceId) {
    const { match, appPatch, payload, dataDetail } = this.props
    fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/fetchdata-city?province=' + provinceId, { method: 'GET', headers: { key: 'a6d84c88b9fc6cbdf502972c57885da1' } })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: false,
            cities: ((result || {}).rajaongkir || {}).results || []
          })
          const city = path([paginationConfig.serviceName, 'city'], payload) || path([paginationConfig.serviceName, 'city'], dataDetail) || ''
          this.fetchSubCity(city)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            error
          })
        }
      )
  }

  fetchSubCity (cityId) {
    const { match, appPatch, payload, dataDetail } = this.props
    fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/fetchdata-subcity?city=' + cityId, { method: 'GET', headers: { key: 'a6d84c88b9fc6cbdf502972c57885da1' } })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: false,
            subcities: ((result || {}).rajaongkir || {}).results || []
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            error
          })
        }
      )
  }

  addField (name, title, type, dataDetail, payload, tablepaginationOnChangeForm) {
    return (
      <div className='form-group'>
        <label htmlFor={name}>{title}</label>
        <input type={type} className='form-control' id={name} placeholder={`Enter ${title}`} value={path([paginationConfig.serviceName, name], payload) || path([paginationConfig.serviceName, name], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: name, fieldValue: e.target.value })} />
      </div>
    )
  }

  render () {
    const { match, userPrivileges } = this.props
    const { provinces, cities, subcities } = this.state

    return (
      <ContentWrapper
        pageTitle={updatePageTitle}
        breadcrumb={[
          { title: 'Home', link: '/home' },
          { title: detailPageTitle, link: detailPageUrl(match.params._id), isActive: true },
          { title: updatePageTitle, link: null, isActive: true }
        ]}
        contentHeaderTitle={updatePageTitle}
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Updateform
              id={match.params._id}
              cancelHref={detailPageUrl(match.params._id)}
              formTitle={updatePageTitle}
              paginationConfig={paginationConfig}
              redirectAfterCreate={redirectAfterCreate}
              child={(tablepaginationOnChangeForm, dataDetail, payload) => {
                // console.log('haloooooooo===>', dataDetail)
                // console.log('haloooooooo payload===>', payload)
                tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
                // currentDataDetail = dataDetail
                // if (startDate) startDate.value = path([paginationConfig.serviceName, 'start_date'], currentDataDetail)
                // if (title) title.value = path([paginationConfig.serviceName, 'title'], payload) // || path([paginationConfig.serviceName, 'title'], currentDataDetail)

                // tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'code', fieldValue: path([paginationConfig.serviceName, 'code'], dataDetail) || '' })
                // let startDate = moment(path([paginationConfig.serviceName, 'start_date'], payload) || path([paginationConfig.serviceName, 'start_date'], dataDetail))
                // if (startDate && startDate.isValid()) startDate = startDate.format('YYYY-MM-DD HH:mm:ss')
                // else startDate = ''
                // let endDate = moment(path([paginationConfig.serviceName, 'end_date'], payload) || path([paginationConfig.serviceName, 'end_date'], dataDetail))
                // if (endDate && endDate.isValid()) endDate = endDate.format('YYYY-MM-DD HH:mm:ss')
                // else endDate = ''

                const province = path([paginationConfig.serviceName, 'province'], payload) || path([paginationConfig.serviceName, 'province'], dataDetail) || ''
                const city = path([paginationConfig.serviceName, 'city'], payload) || path([paginationConfig.serviceName, 'city'], dataDetail) || ''
                const subcity = path([paginationConfig.serviceName, 'subcity'], payload) || path([paginationConfig.serviceName, 'subcity'], dataDetail) || ''

                return (
                  <div className='row'>
                    <div className='col-sm-6'>
                      {this.addField('name', 'Nama Toko', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      {userPrivileges.includes('FIELD-TOKO-OWNER-EMAIL') && this.addField('owner_email', 'Email pemilik Toko', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      {/* {this.addField('slug', 'Slug (url)', 'text', dataDetail, payload, tablepaginationOnChangeForm)} */}
                      {this.addField('website', 'Website', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      {this.addField('facebook', 'Facebook', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      {this.addField('instagram', 'Instagram', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      {this.addField('youtube', 'Youtube', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      {this.addField('description', 'Description', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      {this.addField('plink_merchant_id', 'Plink Merchant Id', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      {this.addField('plink_merchant_key_id', 'Plink Merchant Key Id', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      <div className='form-group'>
                        <label htmlFor='province'>Provinsi</label>
                        <select name='province' id='province' class='custom-select' onChange={e => { this.fetchCity(e.target.value); tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'province', fieldValue: e.target.value }) }}>
                          <option value='-'>pilih</option>
                          {provinces.map((v, i) => (<option key={i} value={v.province_id} selected={province === v.province_id}>{v.province}</option>))}
                        </select>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='city'>Kota/Kabupaten</label>
                        <select name='city' id='city' class='custom-select' onChange={e => { this.fetchSubCity(e.target.value); tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'city', fieldValue: e.target.value }) }}>
                          <option value='-'>pilih</option>
                          {cities.map((v, i) => (<option key={i} value={v.city_id} selected={city === v.city_id}>{v.city_name}</option>))}
                        </select>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='subcity'>Kecamatan</label>
                        <select name='subcity' id='subcity' class='custom-select' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'subcity', fieldValue: e.target.value })}>
                          <option value='-'>pilih</option>
                          {subcities.map((v, i) => (<option key={i} value={v.subdistrict_id} selected={subcity === v.subdistrict_id}>{v.subdistrict_name}</option>))}
                        </select>
                      </div>
                    </div>
                  </div>
                )
              }}
            />
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    dataDetail: state.tablepagination.dataDetail,
    payload: state.tablepagination.payload,
    userPrivileges: state.myprofile.user_privileges
  }
}
const mapDispatchToProps = dispatch => ({
  appPatch: data => dispatch(AppActions.appPatch(data))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Comp))
