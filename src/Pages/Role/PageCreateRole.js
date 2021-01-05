import React, { Component } from 'react'
import { Create as Createform } from '../../features/TablePagination'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import AppConfig from '../../Config/AppConfig'
const paginationConfig = {
  serviceName: 'createRole',
  fields: 'title,_id,description,created_at,updated_at,created_by{full_name},updated_by{full_name}'
}

class CreateRole extends Component {
  render () {
    return (
      <ContentWrapper
        pageTitle='Create Role'
        breadcrumb={[
          { title: 'Home', link: AppConfig.appHomePage },
          { title: 'Role', link: '/role', isActive: true },
          { title: 'Create Role', link: null, isActive: true }
        ]}
        contentHeaderTitle='Create Role'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Createform
              formTitle='Create Role'
              paginationConfig={paginationConfig}
              redirectAfterCreate='/role/detail'
              child={(tablepaginationOnChangeForm) => {
                return (
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label htmlFor='title'>title</label>
                        <input type='text' className='form-control' id='title' placeholder='Enter title' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'title', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='description'>description</label>
                        <input type='text' className='form-control' id='description' placeholder='Enter description' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'description', fieldValue: e.target.value })} />
                      </div>

                      {/* <div className='form-group'>
                        <label htmlFor='content2'>content2</label>
                        <input type='text' className='form-control' id='content2' placeholder='Enter content 2' value={path([paginationConfig.serviceName, 'content2'], payload) || path([paginationConfig.serviceName, 'content2'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content2', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='content3'>content3</label>
                        <input type='text' className='form-control' id='content3' placeholder='Enter content3' value={path([paginationConfig.serviceName, 'content3'], payload) || path([paginationConfig.serviceName, 'content3'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content3', fieldValue: e.target.value })} />
                      </div> */}
                      {/* <div className='form-group'>
                        <label htmlFor='start_date'>start date</label>
                        <input type='text' className='form-control' id='start_date' placeholder='Enter start_date' value={startDate} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='end_date'>end date</label>
                        <input type='text' className='form-control' id='end_date' placeholder='Enter end_date' value={endDate} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: e.target.value })} />
                      </div> */}
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
export default CreateRole
