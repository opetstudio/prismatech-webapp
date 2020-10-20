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

const columns = [
  { Header: 'code', accessor: 'code' },
  { Header: 'content1', accessor: 'content1' },
  { Header: 'content2', accessor: 'content2' },
  { Header: 'created by', accessor: 'created_by' },
  { Header: 'created at', accessor: 'created_at' },
  { Header: 'updated at', accessor: 'updated_at' }
]
let tablepaginationOnChangeFormFunc = null
const paginationConfig = {
  serviceName: 'getDetailCourse',
  updateServiceName: 'updateCourse',
  fields: 'title,_id,code,start_date,end_date,content1,created_at,updated_at,created_by{full_name},updated_by{full_name}',
  redirectAfterCreate: '/course'
}

class UpdateCourse extends Component {
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
    window.activateEditor({
      hostBackend: process.env.REACT_APP_BACKEND_BASE_URL,
      at: getAccessToken(),
      cb: (content) => {
        tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
      }
    })
  }

  render () {
    const { match } = this.props
    return (
      <ContentWrapper
        pageTitle='Update Course'
        breadcrumb={[
          { title: 'Home', link: AppConfig.appHomePage },
          { title: 'Course', link: '/course', isActive: true },
          { title: 'Course Detail', link: `/course/detail/${match.params._id}`, isActive: true },
          { title: 'Update Course', link: null, isActive: true }
        ]}
        contentHeaderTitle='Update Course'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Updateform
              id={match.params._id}
              cancelHref={`/course/detail/${match.params._id}`}
              formTitle='Update Course'
              paginationConfig={paginationConfig}
              redirectAfterCreate='/course/detail'
              child={(tablepaginationOnChangeForm, dataDetail, payload) => {
                // console.log('haloooooooo===>', dataDetail)
                // console.log('haloooooooo payload===>', payload)
                tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
                // currentDataDetail = dataDetail
                // if (startDate) startDate.value = path([paginationConfig.serviceName, 'start_date'], currentDataDetail)
                // if (title) title.value = path([paginationConfig.serviceName, 'title'], payload) // || path([paginationConfig.serviceName, 'title'], currentDataDetail)

                // tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'code', fieldValue: path([paginationConfig.serviceName, 'code'], dataDetail) || '' })
                let startDate = moment(path([paginationConfig.serviceName, 'start_date'], payload) || path([paginationConfig.serviceName, 'start_date'], dataDetail))
                if (startDate && startDate.isValid()) startDate = startDate.format('YYYY-MM-DD HH:mm:ss')
                else startDate = ''
                let endDate = moment(path([paginationConfig.serviceName, 'end_date'], payload) || path([paginationConfig.serviceName, 'end_date'], dataDetail))
                if (endDate && endDate.isValid()) endDate = endDate.format('YYYY-MM-DD HH:mm:ss')
                else endDate = ''

                return (
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label htmlFor='title'>title</label>
                        <input type='text' className='form-control' value={path([paginationConfig.serviceName, 'title'], payload) || path([paginationConfig.serviceName, 'title'], dataDetail) || ''} id='title' placeholder='Enter title' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'title', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='code'>code</label>
                        <input type='text' className='form-control' id='code' placeholder='Enter code' value={path([paginationConfig.serviceName, 'code'], payload) || path([paginationConfig.serviceName, 'code'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'code', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='content1'>Short Description</label>
                        <textarea className='textarea' id='content1' placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} value={path([paginationConfig.serviceName, 'content1'], payload) || path([paginationConfig.serviceName, 'content1'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} />
                        {/* <input type='text' className='form-control' id='content1' placeholder='Enter content 1' value={path([paginationConfig.serviceName, 'content1'], payload) || path([paginationConfig.serviceName, 'content1'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} /> */}
                      </div>
                      <div className='form-group'>
                        <label>Status</label>
                        <select className='form-control' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'status', fieldValue: e.target.value })} value={path([paginationConfig.serviceName, 'status'], payload) || path([paginationConfig.serviceName, 'status'], dataDetail)}>
                          <option value='draft'>Draft</option>
                          <option value='publish'>Publish</option>
                        </select>
                      </div>

                      {/* <div className='form-group'>
                        <label htmlFor='content2'>content2</label>
                        <input type='text' className='form-control' id='content2' placeholder='Enter content 2' value={path([paginationConfig.serviceName, 'content2'], payload) || path([paginationConfig.serviceName, 'content2'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content2', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='content3'>content3</label>
                        <input type='text' className='form-control' id='content3' placeholder='Enter content3' value={path([paginationConfig.serviceName, 'content3'], payload) || path([paginationConfig.serviceName, 'content3'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content3', fieldValue: e.target.value })} />
                      </div> */}
                      <div className='form-group'>
                        <label htmlFor='start_date'>start date</label>
                        <input type='text' className='form-control' id='start_date' placeholder='Enter start_date' value={startDate} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='end_date'>end date</label>
                        <input type='text' className='form-control' id='end_date' placeholder='Enter end_date' value={endDate} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: e.target.value })} />
                      </div>
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
export default UpdateCourse
