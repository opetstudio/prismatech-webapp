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
    window.activateEditor(getAccessToken(), (content) => {
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
    })
  }

  render () {
    const { match, history, payload } = this.props
    return (
      <ContentWrapper
        pageTitle={createPageTitle}
        breadcrumb={[{ title: 'Home', link: '/home' }, { title: createPageTitle, link: null, isActive: true }]}
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
                      <div className='form-group'>
                        <label htmlFor='title'>name</label>
                        <input type='text' className='form-control' id='name' placeholder='Enter name' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'name', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='name'>code</label>
                        <input type='text' className='form-control' id='code' placeholder='Enter name' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'code', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='entity'>price</label>
                        <input type='number' className='form-control' id='price' placeholder='Enter price' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'price', fieldValue: e.target.value })} />
                      </div>
                      
                      <div className='form-group'>
                        <label htmlFor='description'>Short Description</label>
                        <input type='text' className='form-control' id='description' placeholder='Enter description' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'description', fieldValue: e.target.value })} />
                      </div>

                      <div className='form-group'>
                        <label htmlFor='content1'>Long Description</label>
                        {/* <input type='text' className='form-control' id='content1' placeholder='Enter content 1' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} /> */}
                        <textarea className='textarea' id='content1' placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} />
                      </div>
                      
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
                        defaultValue={[]}
                        onChange={val => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'toko_id', fieldValue: val })}
                      />
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
                        defaultValue={[]}
                        onChange={val => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'category_id', fieldValue: val })}
                      />
                      
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
                        defaultValue={[]}
                        onChange={val => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'tag_id', fieldValue: val })}
                      />
                      <div className='form-group'>
                        <label for='fileUploadInput'>File input</label>
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
                            <label id='fileUploadLabel' className='custom-file-label' htmlFor='fileUploadInput'>Choose file</label>
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
                    <button style={{ width: 100 }} type='button' className='btn bg-gradient-warning' onClick={e => history.goBack()}>Cancel</button>
                    <button
                      style={{ width: 100, marginLeft: 5 }} type='button' className='btn bg-gradient-primary' onClick={(e) => tablepaginationSubmitForm({
                        fields: paginationConfig.fields,
                        payload,
                        serviceName: paginationConfig.serviceName,
                        history,
                        redirectAfterCreate: redirectAfterCreate
                      })}
                    >Submit
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
