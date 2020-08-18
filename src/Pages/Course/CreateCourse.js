import React, { Component } from 'react'
import { Table, Create as Createform } from '../../features/TablePagination'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import Helmet from 'react-helmet'
import _ from 'lodash'
import moment from 'moment'
import { getAccessToken } from '../../Utils/Utils'

const paginationConfig = {
  serviceName: 'createCourse',
  fields: 'title,_id,code,start_date,end_date,content1,created_at,updated_at,created_by{full_name},updated_by{full_name}',
  redirectAfterCreate: '/course'
}

const columns = [
  { Header: 'code', accessor: 'code' },
  { Header: 'content1', accessor: 'content1' },
  { Header: 'content2', accessor: 'content2' },
  { Header: 'created by', accessor: 'created_by' },
  { Header: 'created at', accessor: 'created_at' },
  { Header: 'updated at', accessor: 'updated_at' }
]
let tablepaginationOnChangeFormFunc = null
class CreateCourse extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    window.singleDatePicker('#start_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
      const x = document.getElementById('start_date')
      x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: new Date(par).getTime() })
    })
    window.singleDatePicker('#end_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
      const x = document.getElementById('end_date')
      x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: new Date(par).getTime() })
    })
    window.activateEditor(getAccessToken(), (content) => {
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
    })
  }

  render () {
    return (
      <>
        <LoginCheck />
        <Helmet>
          <title>Create Course</title>
          <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
        </Helmet>
        <div className='content-wrapper'>
          <ContentHeader
            title='Course'
            breadcrumb={[{ title: 'Home', link: '/home' }, { title: 'Create Course', link: null, isActive: true }]}
          />
          <section className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <Createform
                    formTitle='Create New Course'
                    paginationConfig={paginationConfig}
                    redirectAfterCreate='/course/detail'
                    child={(tablepaginationOnChangeForm) => {
                      console.log('haloooooooo')
                      tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
                      return (
                        <>
                          <div className='row'>
                            <div className='col-sm-6'>
                              <div className='form-group'>
                                <label htmlFor='title'>title</label>
                                <input type='text' className='form-control' id='title' placeholder='Enter title' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'title', fieldValue: e.target.value })} />
                              </div>
                              <div className='form-group'>
                                <label htmlFor='code'>code</label>
                                <input type='text' className='form-control' id='code' placeholder='Enter code' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'code', fieldValue: e.target.value })} />
                              </div>
                              <div className='form-group'>
                                <label htmlFor='content1'>Short Description</label>
                                {/* <input type='text' className='form-control' id='content1' placeholder='Enter content 1' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} /> */}
                                <textarea className='textarea' id='content1' placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} />
                              </div>
                              {/* <div className='form-group'>
                                <label htmlFor='content2'>content2</label>
                                <input type='text' className='form-control' id='content2' placeholder='Enter content 2' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content2', fieldValue: e.target.value })} />
                              </div>
                              <div className='form-group'>
                                <label htmlFor='content3'>content3</label>
                                <input type='text' className='form-control' id='content3' placeholder='Enter content3' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content3', fieldValue: e.target.value })} />
                              </div> */}
                              <div className='form-group'>
                                <label htmlFor='start_date'>start date</label>
                                <input type='text' className='form-control' id='start_date' placeholder='Enter start_date' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: e.target.value })} />
                              </div>
                              <div className='form-group'>
                                <label htmlFor='end_date'>end date</label>
                                <input type='text' className='form-control' id='end_date' placeholder='Enter end_date' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: e.target.value })} />
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    )
  }
}
export default CreateCourse
