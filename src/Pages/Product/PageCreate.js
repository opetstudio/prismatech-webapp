import React, { Component } from 'react'
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

const paginationConfig = {
  serviceName: createService,
  fields: fields
}

let tablepaginationOnChangeFormFunc = null
class Comp extends Component {
  componentDidMount () {
    const { match } = this.props
    // tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: match.params.role_id })
    window.activateEditor({
      hostBackend: process.env.REACT_APP_BACKEND_BASE_URL,
      at: getAccessToken(),
      cb: (content) => {
        tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
      }
    })
  }

  render () {
    const { match, history, payload } = this.props
    return (
      <ContentWrapper
        pageTitle='Buat Produk'
        breadcrumb={[{ title: 'Beranda', link: '/home' }, { title: 'Buat Produk Baru', link: null, isActive: true }]}
        contentHeaderTitle='Buat Produk'
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
                        <select name='isneed_shipping' id='isneed_shipping' class='custom-select' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'isneed_shipping', fieldValue: e.target.value })}>
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
                        <label for='fileUploadInput'>Unggah Dokumen</label>
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
                            <label id='fileUploadLabel' className='custom-file-label' htmlFor='fileUploadInput'>Pilih Dokumen</label>
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
