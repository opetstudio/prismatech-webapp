import React, { Component } from 'react'
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

class Comp extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    const { match, appPatch } = this.props
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
    // window.activateEditor(getAccessToken(), (content) => {
    //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
    // })
    // tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: match.params.role_id })
    window.activateEditor(getAccessToken(), (content) => {
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
    })
  }

  render () {
    const { match } = this.props

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
                        <label htmlFor='description'>Short Description</label>
                        <input type='text' className='form-control' id='description' placeholder='Enter description' value={path([paginationConfig.serviceName, 'description'], payload) || path([paginationConfig.serviceName, 'description'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'description', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='content1'>Long Description</label>
                        <textarea className='textarea' id='content1' placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} value={path([paginationConfig.serviceName, 'content1'], payload) || path([paginationConfig.serviceName, 'content1'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} />
                        {/* <input type='text' className='form-control' id='content1' placeholder='Enter content 1' value={path([paginationConfig.serviceName, 'content1'], payload) || path([paginationConfig.serviceName, 'content1'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} /> */}
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
                        defaultValue={path([paginationConfig.serviceName, 'toko_id'], payload) || path([paginationConfig.serviceName, 'toko_id'], dataDetail) || []}
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
                        defaultValue={path([paginationConfig.serviceName, 'category_id'], payload) || path([paginationConfig.serviceName, 'category_id'], dataDetail) || []}
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
                        defaultValue={path([paginationConfig.serviceName, 'tag_id'], payload) || path([paginationConfig.serviceName, 'tag_id'], dataDetail) || []}
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
                      </div>
                      <hr />
                      <img width='100%' id='uploadImageDisplayPreview' src={`${AppConfig.hostBackend}/renderfile/${path([paginationConfig.serviceName, 'image_id', 'filename'], dataDetail) || ''}.${path([paginationConfig.serviceName, 'image_id', 'file_type'], dataDetail) || ''}`} />
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
