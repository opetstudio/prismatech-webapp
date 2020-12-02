import React, { Component } from 'react'
import { Table, Update as Updateform } from '../../features/TablePagination'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import Helmet from 'react-helmet'
import _ from 'lodash'
import moment from 'moment'
import { path } from 'ramda'
import { getAccessToken } from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'

let tablepaginationOnChangeFormFunc = null
const paginationConfig = {
  serviceName: 'getDetailPrivilege',
  updateServiceName: 'updatePrivilege',
  fields: '_id,title,description,name,entity,created_at,updated_at,created_by{full_name},updated_by{full_name}'
}

class PageUpdateGrading extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    const { match } = this.props
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
    // window.activateEditor({ hostBackend: AppConfig.hostBackend, at: getAccessToken(), cb: (content) => {
    //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
    // }})
    tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: match.params.role_id })
  }

  render () {
    const { match } = this.props
    return (
      <ContentWrapper
        pageTitle='Update Privilege'
        breadcrumb={[
          { title: 'Home', link: AppConfig.appHomePage },
          { title: 'Privilege Detail', link: `/privilege/detail/${match.params.role_id}/${match.params._id}`, isActive: true },
          { title: 'Update Privilege', link: null, isActive: true }
        ]}
        contentHeaderTitle='Update Privilege'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Updateform
              id={match.params._id}
              cancelHref={`/privilege/detail/${match.params.role_id}/${match.params._id}`}
              formTitle='Update Privilege'
              paginationConfig={paginationConfig}
              redirectAfterCreate={`/privilege/detail/${match.params.role_id}`}
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
                        <label htmlFor='title'>title</label>
                        <input type='text' className='form-control' value={path([paginationConfig.serviceName, 'title'], payload) || path([paginationConfig.serviceName, 'title'], dataDetail) || ''} id='title' placeholder='Enter title' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'title', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='name'>name</label>
                        <input type='text' className='form-control' id='name' placeholder='Enter name' value={path([paginationConfig.serviceName, 'name'], payload) || path([paginationConfig.serviceName, 'name'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'name', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='entity'>entity</label>
                        <input type='text' className='form-control' id='entity' placeholder='Enter entity' value={path([paginationConfig.serviceName, 'entity'], payload) || path([paginationConfig.serviceName, 'entity'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'entity', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='description'>description</label>
                        <input type='text' className='form-control' id='description' placeholder='Enter description' value={path([paginationConfig.serviceName, 'description'], payload) || path([paginationConfig.serviceName, 'description'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'description', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='role_id'>role id</label>
                        <input type='text' className='form-control' id='role_id' placeholder='Enter role_id' value={path([paginationConfig.serviceName, 'role_id'], payload) || path([paginationConfig.serviceName, 'role_id'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: e.target.value })} />
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
export default PageUpdateGrading
