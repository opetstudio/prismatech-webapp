import React, { useEffect } from 'react'
import { Table, Update as Updateform, Multiselect } from '../../features/TablePagination'
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
import TagManifest from '../Tag/Manifest'
import CategoryManifest from '../Category/Manifest'
import TokoOnlineManifest from '../TokoOnline/Manifest'
import { updatePageTitle, detailPageTitle, detailPageUrl, redirectAfterCreate, fields, updateService, detailService, createNewButtonLabel, getColumns } from './Manifest'

let tablepaginationOnChangeFormFunc = null
const paginationConfig = {
  serviceName: detailService,
  updateServiceName: updateService,
  fields: fields
}

function Comp (props) {
  const { match, appPatch } = props
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
  const [stateProductAvailability, setStateProductAvailability] = React.useState('')
  const [statePreorderPolicy, setStatePreorderPolicy] = React.useState('')
  const [stateEstimatedDeliveryUnitTimeInstock, setStateEstimatedDeliveryUnitTimeInstock] = React.useState('')
  const [stateEstimatedDeliveryUnitTimePreorder, setStateEstimatedDeliveryUnitTimePreorder] = React.useState('')

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
  //   // Update the document title using the browser API
  //   document.title = `You clicked ${count} times`;
    window.activateEditor({
      hostBackend: process.env.REACT_APP_BACKEND_BASE_URL,
      at: getAccessToken(),
      cb: (content) => {
        tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
      }
    })
  })

  const loading = path(['loading', paginationConfig.serviceName], props)

  return (
    <ContentWrapper
      pageTitle={updatePageTitle}
      breadcrumb={[
        { title: 'Home', link: AppConfig.appHomePage },
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
            isNeedValidation
            child={(tablepaginationOnChangeForm, dataDetail, payload) => {
              console.log('loading======>', loading)
              console.log('serviceName===>', paginationConfig.serviceName)
              // if (!(typeof loading === 'undefined' || loading === 'undefined' || loading)) {
              //   console.log('jangan render')
              //   return null
              // }
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
              const isNeedOngkirValue = path([paginationConfig.serviceName, 'isneed_shipping'], payload) || path([paginationConfig.serviceName, 'isneed_shipping'], dataDetail) || ''
              const productAvailability = path([paginationConfig.serviceName, 'product_availability'], payload) || path([paginationConfig.serviceName, 'product_availability'], dataDetail) || ''
              const preorderPolicy = path([paginationConfig.serviceName, 'preorder_policy'], payload) || path([paginationConfig.serviceName, 'preorder_policy'], dataDetail) || ''
              const estimatedDeliveryUnitTimeInstock = path([paginationConfig.serviceName, 'estimated_delivery_unit_time_instock'], payload) || path([paginationConfig.serviceName, 'estimated_delivery_unit_time_instock'], dataDetail) || ''
              const estimatedDeliveryUnitTimePreorder = path([paginationConfig.serviceName, 'estimated_delivery_unit_time_preorder'], payload) || path([paginationConfig.serviceName, 'estimated_delivery_unit_time_preorder'], dataDetail) || ''

              setStateProductAvailability(productAvailability)
              setStatePreorderPolicy(preorderPolicy)
              setStateEstimatedDeliveryUnitTimeInstock(estimatedDeliveryUnitTimeInstock)
              setStateEstimatedDeliveryUnitTimePreorder(estimatedDeliveryUnitTimePreorder)

              return (
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label htmlFor='title'>name</label>
                      <input type='text' className='form-control' id='name' placeholder='Enter name' value={path([paginationConfig.serviceName, 'name'], payload) || path([paginationConfig.serviceName, 'name'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'name', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='code'>code</label>
                      <input type='text' className='form-control' id='code' placeholder='Enter name' value={path([paginationConfig.serviceName, 'code'], payload) || path([paginationConfig.serviceName, 'code'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'code', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='price'>price</label>
                      <input type='number' className='form-control' id='price' placeholder='Enter price' value={path([paginationConfig.serviceName, 'price'], payload) || path([paginationConfig.serviceName, 'price'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'price', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='weight'>Berat (Kg)</label>
                      <input type='number' className='form-control' id='weight' placeholder='Enter weight' value={path([paginationConfig.serviceName, 'weight'], payload) || path([paginationConfig.serviceName, 'weight'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'weight', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='parent_id'>Butuh Ongkir?</label>
                      <select name='isneed_shipping' id='isneed_shipping' class='custom-select' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'isneed_shipping', fieldValue: e.target.value })}>
                        <option key='-'>pilih</option>
                        <option value='Y' selected={isNeedOngkirValue === 'Y'}>Butuh</option>
                        <option value='N' selected={isNeedOngkirValue === 'N'}>Tidak Butuh</option>
                      </select>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='description'>Short Description</label>
                      <input type='text' className='form-control' id='description' placeholder='Enter description' value={path([paginationConfig.serviceName, 'description'], payload) || path([paginationConfig.serviceName, 'description'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'description', fieldValue: e.target.value })} />
                    </div>
                    {!(typeof loading === 'undefined' || loading === 'undefined' || loading) &&
                      <div className='form-group'>
                        <label htmlFor='content1'>Long Description</label>
                        <textarea className='textarea' id='content1' placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} value={path([paginationConfig.serviceName, 'content1'], payload) || path([paginationConfig.serviceName, 'content1'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} />
                        {/* <input type='text' className='form-control' id='content1' placeholder='Enter content 1' value={path([paginationConfig.serviceName, 'content1'], payload) || path([paginationConfig.serviceName, 'content1'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} /> */}
                      </div>}
                    {!(typeof loading === 'undefined' || loading === 'undefined' || loading) &&
                      <Multiselect
                        isAutocomplete
                        label='Toko Online'
                        name='toko_id'
                        id='toko_id'
                        maxOptions={50}
                        fetchDataConfig={{
                          serviceName: TokoOnlineManifest.listallService,
                          fields: TokoOnlineManifest.fields
                        }}
                        optionColumnValue='_id'
                        optionColumnLabel='name'
                        defaultValue={path([paginationConfig.serviceName, 'toko_id'], payload) || path([paginationConfig.serviceName, 'toko_id'], dataDetail) || []}
                        onChange={val => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'toko_id', fieldValue: val })}
                      />}
                    {!(typeof loading === 'undefined' || loading === 'undefined' || loading) &&
                      <Multiselect
                        isAutocomplete
                        label='Category'
                        name='category_id'
                        id='category_id'
                        maxOptions={50}
                        fetchDataConfig={{
                          serviceName: CategoryManifest.listallService,
                          fields: CategoryManifest.fields
                        }}
                        optionColumnValue='_id'
                        optionColumnLabel='title'
                        defaultValue={path([paginationConfig.serviceName, 'category_id'], payload) || path([paginationConfig.serviceName, 'category_id'], dataDetail) || []}
                        onChange={val => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'category_id', fieldValue: val })}
                      />}
                    {!(typeof loading === 'undefined' || loading === 'undefined' || loading) &&
                      <Multiselect
                        isCreatableSelect
                        isAutocomplete
                        label='Tagging'
                        name='tag_id'
                        id='tag_id'
                        maxOptions={50}
                        fetchDataConfig={{
                          serviceName: TagManifest.listallService,
                          fields: TagManifest.fields
                        }}
                        optionColumnValue='_id'
                        optionColumnLabel='name'
                        defaultValue={path([paginationConfig.serviceName, 'tag_id'], payload) || path([paginationConfig.serviceName, 'tag_id'], dataDetail) || []}
                        onChange={val => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'tag_id', fieldValue: val })}
                      />}
                    <div className='form-group'>
                      <label for='fileUploadInput'>Unggah Gambar</label>
                      <div className='input-group' style={{ zIndex: 0 }}>
                        <div className='custom-file'>
                          <input
                            type='file' className='custom-file-input' id='fileUploadInput' onChange={() => window.onClickUploadFile({
                              hostBackend: process.env.REACT_APP_BACKEND_BASE_URL,
                              at: getAccessToken(),
                              cb: imageId => {
                                tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'image_id', fieldValue: imageId })
                              }
                            })}
                          />
                          <label id='fileUploadLabel' className='custom-file-label' htmlFor='fileUploadInput'>{path([paginationConfig.serviceName, 'image_id', '_id'], payload) || path([paginationConfig.serviceName, 'image_id', '_id'], dataDetail) || ''}</label>
                        </div>
                        {/* <div
                          className='input-group-append' onClick={() => window.onClickUploadFile(getAccessToken(), imageId => {
                            tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'image_id', fieldValue: imageId })
                          })}
                        >
                          <span className='input-group-text'>Upload</span>
                        </div> */}
                      </div>
                      <hr />
                      <img width='100%' id='uploadImageDisplayPreview' src={`${AppConfig.hostBackend}/renderfile/${path([paginationConfig.serviceName, 'image_id', 'filename'], dataDetail) || ''}.${path([paginationConfig.serviceName, 'image_id', 'file_type'], dataDetail) || ''}`} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='product_availability'>Ketersediaan Produk</label>
                      <select
                        name='product_availability'
                        id='product_availability' class='custom-select' onChange={e => {
                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'product_availability', fieldValue: e.target.value })
                          setStateProductAvailability(productAvailability)
                        }}
                      >
                        <option key='-'>pilih</option>
                        <option value='always_ready' selected={productAvailability === 'always_ready'}>Selalu ada stok</option>
                        <option value='use_stock' selected={productAvailability === 'use_stock'}>Gunakan stok</option>
                      </select>
                    </div>

                    <div className='form-group'>
                      <label htmlFor='instock_label'>Label ketika stok masih ada</label>
                      <input type='text' className='form-control' id='instock_label' placeholder='contoh: Ada stok' value={path([paginationConfig.serviceName, 'instock_label'], payload) || path([paginationConfig.serviceName, 'instock_label'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'instock_label', fieldValue: e.target.value })} />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='estimated_delivery_time_instock'>Setelah customer melakukan pembayaran, produk akan dikirim dalam:</label>
                      <div className='form-row'>
                        <input type='number' className='form-control' id='estimated_delivery_time_instock' placeholder='Masukan jumlah waktu' value={path([paginationConfig.serviceName, 'estimated_delivery_time_instock'], payload) || path([paginationConfig.serviceName, 'estimated_delivery_time_instock'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_time_instock', fieldValue: e.target.value })} />
                        <div className='col-sm-10'>
                          <div class='d-inline form-check'>
                            <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_jam' defaultValue='hour' checked={estimatedDeliveryUnitTimeInstock === 'hour'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                            <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_jam'>Jam </label>
                          </div>
                          <div class='d-inline form-check' style={{ marginLeft: 10 }}>
                            <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_hari' defaultValue='day' checked={estimatedDeliveryUnitTimeInstock === 'day'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                            <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_hari'>Hari </label>
                          </div>
                          <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                            <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_minggu' defaultValue='week' checked={estimatedDeliveryUnitTimeInstock === 'week'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                            <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_minggu'>Minggu </label>
                          </div>
                          <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                            <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_bulan' defaultValue='month' checked={estimatedDeliveryUnitTimeInstock === 'month'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                            <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_bulan'>Bulan </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {
                      stateProductAvailability === 'use_stock' &&
                        <>
                          <div className='form-group'>
                            <label htmlFor='stock_amount'>Jumlah Stok</label>
                            <input type='number' className='form-control' id='stock_amount' placeholder='Masukan jumlah stok' value={path([paginationConfig.serviceName, 'stock_amount'], payload) || path([paginationConfig.serviceName, 'stock_amount'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'stock_amount', fieldValue: e.target.value })} />
                          </div>
                          <div className='form-group'>
                            <label htmlFor='preorder_policy'>Status produk jika stok habis</label>
                            <select
                              name='preorder_policy' id='preorder_policy' class='custom-select' onChange={e => {
                                tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'preorder_policy', fieldValue: e.target.value })
                                setStatePreorderPolicy(preorderPolicy)
                              }}
                            >
                              <option key='-'>pilih</option>
                              <option value='preorder' selected={preorderPolicy === 'preorder'}>Pre-Order</option>
                              <option value='unavailable' selected={preorderPolicy === 'unavailable'}>Unavailable</option>
                            </select>
                          </div>
                          {statePreorderPolicy === 'preorder' &&
                            <div className='form-group'>
                              <label htmlFor='estimated_delivery_time_preorder'>Produk Pre-order biasanya dikirimkan dalam:</label>
                              <input type='number' className='form-control' id='estimated_delivery_time_preorder' placeholder='Masukan jumlah waktu' value={path([paginationConfig.serviceName, 'estimated_delivery_time_preorder'], payload) || path([paginationConfig.serviceName, 'estimated_delivery_time_preorder'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_time_preorder', fieldValue: e.target.value })} />
                              <div className='form-row'>
                                {/* <input type='number' className='form-control' id='estimated_delivery_time_instock' placeholder='Masukan jumlah waktu' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_time_instock', fieldValue: e.target.value })} /> */}
                                <div className='col-sm-10'>
                                  <div class='d-inline form-check'>
                                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_jam' defaultValue='hour' checked={estimatedDeliveryUnitTimePreorder === 'hour'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_jam'>Jam </label>
                                  </div>
                                  <div class='d-inline form-check' style={{ marginLeft: 10 }}>
                                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_hari' defaultValue='day' checked={estimatedDeliveryUnitTimePreorder === 'day'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_hari'>Hari </label>
                                  </div>
                                  <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_minggu' defaultValue='week' checked={estimatedDeliveryUnitTimePreorder === 'week'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_minggu'>Minggu </label>
                                  </div>
                                  <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_bulan' defaultValue='month' checked={estimatedDeliveryUnitTimePreorder === 'month'} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_bulan'>Bulan </label>
                                  </div>
                                </div>
                              </div>
                            </div>}
                        </>
                    }

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
const mapStateToProps = (state, ownProps) => {
  return {
    dataDetail: state.tablepagination.dataDetail,
    loading: state.tablepagination.loading
  }
}
const mapDispatchToProps = dispatch => ({
  appPatch: data => dispatch(AppActions.appPatch(data))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Comp))
