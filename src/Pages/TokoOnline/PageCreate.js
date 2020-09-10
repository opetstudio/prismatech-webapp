import React, { Component } from 'react'
import { Create as Createform, Combobox } from '../../features/TablePagination'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import moment from 'moment'
import { getAccessToken } from '../../Utils/Utils'
import { path } from 'ramda'
import { connect } from 'react-redux'
import { createService, fields, createPageTitle, redirectAfterCreate } from './Manifest'
import CategoryManifest from '../Category/Manifest'

const paginationConfig = {
  serviceName: createService,
  fields: fields
}

let tablepaginationOnChangeFormFunc = null
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
    const { match } = this.props
    // tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: match.params.role_id })
    fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/fetchdata-province', { method: 'GET', headers: { key: 'a6d84c88b9fc6cbdf502972c57885da1' } })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: false,
            provinces: ((result || {}).rajaongkir || {}).results || []
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

  fetchCity (provinceId) {
    fetch('http://dev.plink.co.id:8081/plink/v1/city?province=' + provinceId, { method: 'GET', headers: { key: 'a6d84c88b9fc6cbdf502972c57885da1' } })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: false,
            cities: ((result || {}).rajaongkir || {}).results || []
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

  fetchSubCity (cityId) {
    fetch('http://dev.plink.co.id:8081/plink/v1/subcity?city=' + cityId, { method: 'GET', headers: { key: 'a6d84c88b9fc6cbdf502972c57885da1' } })
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

  addField (name, title, type, tablepaginationOnChangeForm, placeholder) {
    return (
      <div className='form-group'>
        <label htmlFor={name}>{title}</label>
        <input type={type} className='form-control' id={name} placeholder={placeholder} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: name, fieldValue: e.target.value })} />
      </div>
    )
  }

  render () {
    const { match, history, payload } = this.props
    const { provinces, cities, subcities } = this.state
    console.log('state===>', this.state)
    return (
      <ContentWrapper
        pageTitle={createPageTitle}
        breadcrumb={[{ title: 'Beranda', link: '/home' }, { title: createPageTitle, link: null, isActive: true }]}
        contentHeaderTitle={createPageTitle}
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Createform
              formTitle={createPageTitle}
              paginationConfig={paginationConfig}
              redirectAfterCreate={redirectAfterCreate}
              child={(tablepaginationOnChangeForm) => {
                tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
                return (
                  <div className='row'>
                    <div className='col-sm-6'>
                      {this.addField('name', 'Nama Toko', 'text', tablepaginationOnChangeForm, 'Masukkan Nama Toko')}
                      {/* {this.addField('slug', 'Slug (url)', 'text', tablepaginationOnChangeForm)} */}
                      {this.addField('website', 'Website', 'text', tablepaginationOnChangeForm, 'Masukkan URL Website')}
                      {this.addField('facebook', 'Facebook', 'text', tablepaginationOnChangeForm, 'Masukkan URL Facebook')}
                      {this.addField('instagram', 'URL Instagram', 'text', tablepaginationOnChangeForm, 'Masukkan URL Instagram')}
                      {this.addField('youtube', 'URL Youtube', 'text', tablepaginationOnChangeForm, 'Masukkan URL Youtube')}
                      {this.addField('description', 'Deskripsi Toko', 'text', tablepaginationOnChangeForm, 'Deskripsi Toko')}
                      {this.addField('plink_merchant_id', 'Plink Merchant Id', 'text', tablepaginationOnChangeForm, 'Masukkan Plink Merchant Id')}
                      {this.addField('plink_merchant_key_id', 'Plink Merchant Key Id', 'text', tablepaginationOnChangeForm, 'Masukkan Plink Merchant Key Id')}
                      <div className='form-group'>
                        <label htmlFor='province'>Provinsi</label>
                        <select name='province' id='province' class='custom-select' onChange={e => { this.fetchCity(e.target.value); tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'province', fieldValue: e.target.value }) }}>
                          <option value='-'>pilih</option>
                          {provinces.map((v, i) => (<option key={i} value={v.province_id}>{v.province}</option>))}
                        </select>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='city'>Kota/Kabupaten</label>
                        <select name='city' id='city' class='custom-select' onChange={e => { this.fetchSubCity(e.target.value); tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'city', fieldValue: e.target.value }) }}>
                          <option value='-'>pilih</option>
                          {cities.map((v, i) => (<option key={i} value={v.city_id}>{v.city_name}</option>))}
                        </select>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='subcity'>Kecamatan</label>
                        <select name='subcity' id='subcity' class='custom-select' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'subcity', fieldValue: e.target.value })}>
                          <option value='-'>pilih</option>
                          {subcities.map((v, i) => (<option key={i} value={v.subdistrict_id}>{v.subdistrict_name}</option>))}
                        </select>
                      </div>
                    </div>
                  </div>
                )
              }}
              footerCard={({ tablepaginationSubmitForm, payload }) => {
                return (
                  <>
                    <button style={{ width: 100 }} type='button' className='btn bg-gradient-warning' onClick={e => history.goBack()}>Batal</button>
                    <button
                      style={{ width: 100, marginLeft: 5 }} type='button' className='btn bg-gradient-primary' onClick={(e) => tablepaginationSubmitForm({
                        fields: paginationConfig.fields,
                        payload,
                        serviceName: paginationConfig.serviceName,
                        history,
                        redirectAfterCreate: redirectAfterCreate
                      })}
                    >Kirim
                    </button>
                  </>
                )
              }}
            />
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
// export default CreateTokoProduct

const mapStateToProps = (state, ownProps) => {
  return {
    payload: state.tablepagination.payload
  }
}
export default connect(
  mapStateToProps,
  null
)(Comp)
