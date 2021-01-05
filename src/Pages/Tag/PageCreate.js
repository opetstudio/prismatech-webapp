import React, { Component } from 'react'
import { Create as Createform } from '../../features/TablePagination'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import AppConfig from '../../Config/AppConfig'
import { createService, fields, createPageTitle, redirectAfterCreate } from './Manifest'

const paginationConfig = {
  serviceName: createService,
  fields: fields
}

class Comp extends Component {
  render () {
    const { history } = this.props
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
              formTitle={createPageTitle}
              paginationConfig={paginationConfig}
              redirectAfterCreate={redirectAfterCreate}
              child={(tablepaginationOnChangeForm) => {
                // tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
                return (
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label htmlFor='name'>name</label>
                        <input type='text' className='form-control' id='name' placeholder='Enter name' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'name', fieldValue: e.target.value })} />
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
export default Comp
