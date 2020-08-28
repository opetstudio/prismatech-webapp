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
  componentDidMount () {
    const { match } = this.props
    // tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: match.params.role_id })
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
