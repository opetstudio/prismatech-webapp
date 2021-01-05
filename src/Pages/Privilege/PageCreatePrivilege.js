import React, { Component } from 'react'
import { Create as Createform } from '../../features/TablePagination'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import { path } from 'ramda'
import { connect } from 'react-redux'
import AppConfig from '../../Config/AppConfig'

const paginationConfig = {
  serviceName: 'createPrivilege',
  fields: '_id,title,description,name,entity,created_at,updated_at,created_by{full_name},updated_by{full_name}'
}

let tablepaginationOnChangeFormFunc = null
class CreatePrivilege extends Component {
  componentDidMount () {
    const { match } = this.props
    tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: match.params.role_id })
  }

  render () {
    const { match, history, payload } = this.props
    return (
      <ContentWrapper
        pageTitle='Create New Privilege'
        breadcrumb={[{ title: 'Home', link: AppConfig.appHomePage }, { title: 'Create New Privilege', link: null, isActive: true }]}
        contentHeaderTitle='Create New Privilege'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Createform
              formTitle='Create New Privilege'
              paginationConfig={paginationConfig}
              redirectAfterCreate='/privilege/detail'
              child={(tablepaginationOnChangeForm) => {
                tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
                return (
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label htmlFor='title'>title</label>
                        <input type='text' className='form-control' id='title' placeholder='Enter title' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'title', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='name'>name</label>
                        <input type='text' className='form-control' id='name' placeholder='Enter name' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'name', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='entity'>entity</label>
                        <input type='text' className='form-control' id='entity' placeholder='Enter entity' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'entity', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='description'>description</label>
                        <input type='text' className='form-control' id='description' placeholder='Enter description' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'description', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='role_id'>role id</label>
                        <input type='text' className='form-control' id='role_id' placeholder='Enter role_id' value={path([paginationConfig.serviceName, 'role_id'], payload) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: e.target.value })} />
                      </div>
                    </div>
                  </div>
                )
              }}
              footerCard={({ tablepaginationSubmitForm, payload }) => {
                return (
                  <>
                    <button style={{ width: 100 }} type='button' className='btn bg-gradient-warning' onClick={e => history.goBack()}>Cancel</button>
                    <button style={{ width: 150, marginLeft: 5 }} type='button' className='btn bg-gradient-warning' onClick={e => history.replace(`/role/detail/${match.params.role_id}`)}>Role Detail</button>
                    <button
                      style={{ width: 100, marginLeft: 5 }} type='button' className='btn bg-gradient-primary' onClick={(e) => tablepaginationSubmitForm({
                        fields: paginationConfig.fields,
                        payload,
                        serviceName: paginationConfig.serviceName,
                        history,
                        redirectAfterCreate: `/privilege/detail/${match.params.role_id}`
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
// export default CreatePrivilege

const mapStateToProps = (state, ownProps) => {
  return {
    payload: state.tablepagination.payload
  }
}
export default connect(
  mapStateToProps,
  null
)(CreatePrivilege)
