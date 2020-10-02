import React, { Component } from 'react'
import { Create as Createform, Multiselect } from '../../features/TablePagination'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import moment from 'moment'
import { getAccessToken } from '../../Utils/Utils'
import { path } from 'ramda'
import { lp } from '../../Utils/Pages'
import { connect } from 'react-redux'
import AppActions from '../../Redux/AppRedux'
import { createService, fields, createPageTitle, redirectAfterCreate } from './Manifest'
import TokoManifest from '../TokoOnline/Manifest'
import AppConfig from '../../Config/AppConfig'

const paginationConfig = {
  serviceName: createService,
  fields: fields
}

let tablepaginationOnChangeFormFunc = null
class Comp extends Component {
  componentDidMount () {
    const { match, appPatch } = this.props
    const title = (lp[window.location.pathname] || {}).title
    if (title) appPatch({ routeActive: window.location.pathname, pageTitle: title })
    else appPatch({ routeActive: window.location.pathname, pageTitle: createPageTitle })
    tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'toko_id', fieldValue: match.params.toko_id })
  }

  addField (name, title, type, tablepaginationOnChangeForm, defaultValue) {
    return (
      <div className='form-group'>
        {type !== 'hidden' && <label htmlFor={name}>{title}</label>}
        {defaultValue && <input type={type} className='form-control' id={name} placeholder={`Masukkan ${title}`} value={defaultValue} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: name, fieldValue: e.target.value })} />}
        {!defaultValue && <input type={type} className='form-control' id={name} placeholder={`Masukkan ${title}`} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: name, fieldValue: e.target.value })} />}
      </div>
    )
  }

  render () {
    const { match, history, payload } = this.props
    return (
      <ContentWrapper
        pageTitle={createPageTitle}
        breadcrumb={[{ title: 'Home', link: AppConfig.appHomePage }, { title: createPageTitle, link: null, isActive: true }]}
        contentHeaderTitle={createPageTitle}
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Createform
              formTitle='Add new team members'
              paginationConfig={paginationConfig}
              redirectAfterCreate={redirectAfterCreate(match.params.toko_id)}
              child={(tablepaginationOnChangeForm) => {
                tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
                return (
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        {/* <Multiselect
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
                          defaultValue=''
                          onChange={val => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'toko_id', fieldValue: val })}
                        /> */}
                      </div>
                      {this.addField('toko_id', 'Toko Id', 'hidden', tablepaginationOnChangeForm, path([paginationConfig.serviceName, 'toko_id'], payload) || '')}
                      {this.addField('email', 'Email Pengguna', 'email', tablepaginationOnChangeForm)}
                      {/* {this.addField('name', 'Name', 'text', tablepaginationOnChangeForm)}
                      {this.addField('website', 'Website', 'text', tablepaginationOnChangeForm)}
                      {this.addField('facebook', 'Facebook', 'text', tablepaginationOnChangeForm)}
                      {this.addField('instagram', 'Instagram', 'text', tablepaginationOnChangeForm)}
                      {this.addField('youtube', 'Youtube', 'text', tablepaginationOnChangeForm)}
                      {this.addField('description', 'Description', 'text', tablepaginationOnChangeForm)} */}
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
                        redirectAfterCreate: redirectAfterCreate(match.params.toko_id)
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
const mapDispatchToProps = dispatch => ({
  appPatch: data => dispatch(AppActions.appPatch(data))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comp)
