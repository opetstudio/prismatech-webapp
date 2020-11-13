import React, { useEffect } from 'react'
import { Create as Createform, Combobox, Multiselect } from '../../features/TablePagination'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import moment from 'moment'
import { getAccessToken } from '../../Utils/Utils'
import { path } from 'ramda'
import { connect } from 'react-redux'
import { createService, fields, createPageTitle, redirectAfterCreate } from './Manifest'
import CategoryManifest from '../Category/Manifest'
import TokoOnlineManifest from '../TokoOnline/Manifest'
import TagManifest from '../Tag/Manifest'
import AppConfig from '../../Config/AppConfig'

const paginationConfig = {
  serviceName: createService,
  fields: fields
}

let tablepaginationOnChangeFormFunc = null
function Comp (props) {
  // componentDidMount () {
  const { match, history, payload } = props
  // tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: match.params.role_id })
  const [stateProductAvailability, setStateProductAvailability] = React.useState('')
  const [statePreorderPolicy, setStatePreorderPolicy] = React.useState('')
  useEffect(() => {
    window.activateEditor({
      hostBackend: process.env.REACT_APP_BACKEND_BASE_URL,
      at: getAccessToken(),
      cb: (content) => {
        tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
      }
    })
  })

  return (
    <ContentWrapper
      pageTitle='Buat Produk'
      breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: 'Buat Produk Baru', link: null, isActive: true }]}
      contentHeaderTitle='Buat Produk'
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Createform
            formTitle={createPageTitle}
            paginationConfig={paginationConfig}
            redirectAfterCreate={redirectAfterCreate}
            isNeedValidation
            onSubmit={({ tablepaginationSubmitForm, payload }) => {
              tablepaginationSubmitForm({
                fields: paginationConfig.fields,
                payload,
                serviceName: paginationConfig.serviceName,
                history,
                redirectAfterCreate: redirectAfterCreate
              })
            }}
            child={(tablepaginationOnChangeForm) => {
              tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
              return (
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label htmlFor='title'>Nama</label>
                      <input type='text' className='form-control' id='name' placeholder='Enter name' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'name', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='name'>Kode</label>
                      <input type='text' className='form-control' id='code' placeholder='Enter name' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'code', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='entity'>Harga</label>
                      <input type='number' className='form-control' id='price' placeholder='Enter price' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'price', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='weight'>Berat (Kg)</label>
                      <input type='number' className='form-control' id='weight' placeholder='Enter weight' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'weight', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='parent_id'>Butuh Ongkir?</label>
                      <select
                        name='isneed_shipping'
                        id='isneed_shipping'
                        class='custom-select'
                        onChange={e => {
                          const weightField = document.getElementById('weight')
                          if (e.target.value === 'Y') weightField.setAttribute('required', true)
                          else weightField.removeAttribute('required')
                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'isneed_shipping', fieldValue: e.target.value })
                        }}
                      >
                        <option key='-'>pilih</option>
                        <option value='Y'>Butuh</option>
                        <option value='N'>Tidak Butuh</option>
                      </select>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='description'>Deskripsi Singkat</label>
                      <input type='text' className='form-control' id='description' placeholder='Enter description' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'description', fieldValue: e.target.value })} />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='content1'>Deskripsi Lengkap</label>
                      {/* <input type='text' className='form-control' id='content1' placeholder='Enter content 1' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} /> */}
                      <textarea className='textarea' id='content1' placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} />
                    </div>

                    <Multiselect
                      isAutocomplete
                      label='Pilih Beberapa Toko'
                      name='toko_id'
                      id='toko_id'
                      maxOptions={50}
                      fetchDataConfig={{
                        serviceName: TokoOnlineManifest.listallService,
                        fields: TokoOnlineManifest.fields
                      }}
                      optionColumnValue='_id'
                      optionColumnLabel='name'
                      defaultValue={[]}
                      onChange={val => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'toko_id', fieldValue: val })}
                    />
                    <Multiselect
                      isAutocomplete
                      label='Pilih Beberapa Kategori'
                      name='category_id'
                      id='category_id'
                      maxOptions={50}
                      fetchDataConfig={{
                        serviceName: CategoryManifest.listallService,
                        fields: CategoryManifest.fields
                      }}
                      optionColumnValue='_id'
                      optionColumnLabel='title'
                      defaultValue={[]}
                      onChange={val => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'category_id', fieldValue: val })}
                    />

                    <Multiselect
                      isCreatableSelect
                      isAutocomplete
                      label='Pilih Beberapa Tag'
                      name='tag_id'
                      id='tag_id'
                      maxOptions={50}
                      fetchDataConfig={{
                        serviceName: TagManifest.listallService,
                        fields: TagManifest.fields
                      }}
                      optionColumnValue='_id'
                      optionColumnLabel='name'
                      defaultValue={[]}
                      onChange={val => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'tag_id', fieldValue: val })}
                    />
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
                          <label id='fileUploadLabel' className='custom-file-label' htmlFor='fileUploadInput'>Pilih Gambar</label>
                        </div>
                        {/* <div
                            className='input-group-append'
                            id='fileUploadButtonUpload'
                            onClick={() => window.onClickUploadFile(getAccessToken(), imageId => {
                              tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'image_id', fieldValue: imageId })
                            })}
                          >
                            <span className='input-group-text'>Upload</span>
                          </div> */}
                      </div>
                      <img width='100%' id='uploadImageDisplayPreview' src='/static/media/logo512.260d5758.png' />
                      {/* <input type='file' className='form-control' id='image_id' placeholder='Enter Image Id' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'image_id', fieldValue: e.target.value })} /> */}
                    </div>
                    <div className='form-group'>
                      <label htmlFor='product_availability'>Ketersediaan Produk</label>
                      <select
                        name='product_availability'
                        id='product_availability' class='custom-select' onChange={e => {
                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'product_availability', fieldValue: e.target.value })
                          setStateProductAvailability(e.target.value)
                        }}
                        defaultValue='always_ready'
                      >
                        <option value='always_ready'>Selalu ada stok</option>
                        <option value='use_stock'>Gunakan stok</option>
                      </select>
                    </div>

                    <div className='form-group'>
                      <label htmlFor='instock_label'>Label ketika stok masih ada</label>
                      <input type='text' className='form-control' id='instock_label' placeholder='contoh: Ada stok' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'instock_label', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='estimated_delivery_time_instock'>Setelah customer melakukan pembayaran, produk akan dikirim dalam:</label>
                      <div className='form-row'>
                        <input type='number' className='form-control' id='estimated_delivery_time_instock' placeholder='Masukan jumlah waktu' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_time_instock', fieldValue: e.target.value })} />
                        <div className='col-sm-10'>
                          <div class='d-inline form-check'>
                            <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_jam' defaultValue='hour' checked onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                            <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_jam'>Jam </label>
                          </div>
                          <div class='d-inline form-check' style={{ marginLeft: 10 }}>
                            <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_hari' defaultValue='day' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                            <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_hari'>Hari </label>
                          </div>
                          <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                            <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_minggu' defaultValue='week' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                            <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_minggu'>Minggu </label>
                          </div>
                          <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                            <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_instock' id='estimated_delivery_unit_time_instock_bulan' defaultValue='month' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_instock', fieldValue: e.target.value })} />
                            <label className='form-check-label' htmlFor='estimated_delivery_unit_time_instock_bulan'>Bulan </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className='form-group'>
                      <label htmlFor='parent_id'>Butuh Ongkir?</label>
                      <select
                        name='isneed_shipping'
                        id='isneed_shipping'
                        class='custom-select'
                        onChange={e => {
                          const weightField = document.getElementById('weight')
                          if (e.target.value === 'Y') weightField.setAttribute('required', true)
                          else weightField.removeAttribute('required')
                          tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'isneed_shipping', fieldValue: e.target.value })
                        }}
                      >
                        <option key='-'>pilih</option>
                        <option value='Y'>Butuh</option>
                        <option value='N'>Tidak Butuh</option>
                      </select>
                    </div> */}

                    {
                      stateProductAvailability === 'use_stock' &&
                        <>
                          <div className='form-group'>
                            <label htmlFor='stock_amount'>Jumlah Stok</label>
                            <input type='number' className='form-control' id='stock_amount' placeholder='Masukan jumlah stok' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'stock_amount', fieldValue: e.target.value })} />
                          </div>
                          <div className='form-group'>
                            <label htmlFor='preorder_policy'>Status produk jika stok habis</label>
                            <select
                              name='preorder_policy' id='preorder_policy' class='custom-select' onChange={e => {
                                tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'preorder_policy', fieldValue: e.target.value })
                                setStatePreorderPolicy(e.target.value)
                              }}
                              defaultValue='unavailable'
                            >
                              <option value='unavailable'>Unavailable</option>
                              <option value='preorder'>Pre-Order</option>
                            </select>
                          </div>
                          {statePreorderPolicy === 'preorder' &&
                            <div className='form-group'>
                              <label htmlFor='estimated_delivery_time_preorder'>Produk Pre-order biasanya dikirimkan dalam:</label>
                              <input type='number' className='form-control' id='estimated_delivery_time_preorder' placeholder='Masukan jumlah waktu' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_time_preorder', fieldValue: e.target.value })} />
                              <div className='form-row'>
                                {/* <input type='number' className='form-control' id='estimated_delivery_time_instock' placeholder='Masukan jumlah waktu' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_time_instock', fieldValue: e.target.value })} /> */}
                                <div className='col-sm-10'>
                                  <div class='d-inline form-check'>
                                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_jam' defaultValue='hour' checked onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_jam'>Jam </label>
                                  </div>
                                  <div class='d-inline form-check' style={{ marginLeft: 10 }}>
                                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_hari' defaultValue='day' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_hari'>Hari </label>
                                  </div>
                                  <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_minggu' defaultValue='week' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
                                    <label className='form-check-label' htmlFor='estimated_delivery_unit_time_preorder_minggu'>Minggu </label>
                                  </div>
                                  <div className='d-inline form-check' style={{ marginLeft: 10 }}>
                                    <input className='form-check-input' type='radio' name='estimated_delivery_unit_time_preorder' id='estimated_delivery_unit_time_preorder_bulan' defaultValue='month' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'estimated_delivery_unit_time_preorder', fieldValue: e.target.value })} />
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
            footerCard={({ tablepaginationSubmitForm, payload }) => {
              return (
                <>
                  <button style={{ width: 100 }} type='button' className='btn bg-gradient-warning' onClick={e => history.goBack()}>Batal</button>
                  <button
                    style={{ width: 100, marginLeft: 5 }} type='submit' className='btn bg-gradient-primary'
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
