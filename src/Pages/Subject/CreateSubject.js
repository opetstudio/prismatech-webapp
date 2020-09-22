import React, { Component } from 'react'
import { Create as Createform } from '../../features/TablePagination'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import moment from 'moment'
import { path } from 'ramda'
import { getAccessToken } from '../../Utils/Utils'

const paginationConfig = {
  serviceName: 'createSubject',
  fields: 'title,_id,start_date,end_date,content1,created_at,updated_at,created_by{full_name},updated_by{full_name}',
  redirectAfterCreate: '/subject/detail/:subject_id'
}

let tablepaginationOnChangeFormFunc = null
class CreateSubject extends Component {
  componentDidMount () {
    const { match } = this.props
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
    tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'course_id', fieldValue: match.params.course_id })
  }

  render () {
    const { match, history, dataDetail } = this.props
    return (
      <ContentWrapper
        pageTitle='Create Subject'
        breadcrumb={[
          { title: 'Home', link: '/home' },
          { title: 'Course', link: '/course', isActive: true },
          { title: 'Course Detail', link: `/course/detail/${match.params.course_id}`, isActive: true },
          { title: 'Create New Subject', link: null, isActive: true }
        ]}
        contentHeaderTitle='Subject'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Createform
              formTitle='Create New Subject'
              paginationConfig={paginationConfig}
              redirectAfterCreate='/subject/detail'
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
                        <label htmlFor='content1'>Short Description</label>
                        <textarea className='textarea' id='content1' placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='start_date'>start date time</label>
                        <input type='text' className='form-control' id='start_date' placeholder='Enter start_date' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='end_date'>end date time</label>
                        <input type='text' className='form-control' id='end_date' placeholder='Enter end_date' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: e.target.value })} />
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

export default CreateSubject
