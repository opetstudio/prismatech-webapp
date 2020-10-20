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
import TokoManifest from '../TokoOnline/Manifest'
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
    // window.activateEditor({ hostBackend: process.env.REACT_APP_BACKEND_BASE_URL, at: getAccessToken(), cb: (content) => {
    //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
    // }})
    // tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: match.params.role_id })
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
    const { match } = this.props

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
                        <Combobox
                          label='Toko'
                          name='toko_id'
                          id='toko_id'
                          maxOptions={50}
                          fetchDataConfig={{
                            serviceName: TokoManifest.listallService,
                            fields: TokoManifest.fields
                          }}
                          optionColumnValue='_id'
                          optionColumnLabel='name'
                          defaultValue={path([paginationConfig.serviceName, 'toko_id'], payload) || path([paginationConfig.serviceName, 'toko_id'], dataDetail) || []}
                          onChange={val => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'toko_id', fieldValue: val })}
                        />
                      </div>
                      {/* {this.addField('user', 'Name', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      {this.addField('website', 'Website', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      {this.addField('facebook', 'Facebook', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      {this.addField('instagram', 'Instagram', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      {this.addField('youtube', 'Youtube', 'text', dataDetail, payload, tablepaginationOnChangeForm)}
                      {this.addField('description', 'Description', 'text', dataDetail, payload, tablepaginationOnChangeForm)} */}
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
