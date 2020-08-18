import React, { Component } from 'react'
import { Create as Createform, Combobox } from '../../features/TablePagination'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import moment from 'moment'
import { getAccessToken } from '../../Utils/Utils'

const paginationConfig = {
  serviceName: 'createLmsSubjectUnit',
  fields: '_id,start_date,end_date,content1,created_at,updated_at,created_by{full_name},updated_by{full_name}'
}

let tablepaginationOnChangeFormFunc = null
class CreateSubjectUnit extends Component {
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
    window.activateEditor(getAccessToken(), (content) => {
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
    })
    tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'subject_id', fieldValue: match.params.subject_id })
  }

  render () {
    const { match, history } = this.props
    return (
      <ContentWrapper
        pageTitle='Create Subject Content'
        breadcrumb={[{ title: 'Home', link: '/home' }, { title: 'Create Subject Content', link: null, isActive: true }]}
        contentHeaderTitle='Create Subject Content'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Createform
              formTitle='Create New Content'
              paginationConfig={paginationConfig}
              redirectAfterCreate='/subject-unit/detail'
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
                        <label htmlFor='content1'>Content</label>
                        <textarea className='textarea' id='content1' placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='grading_id'>Grading Code</label>
                        {/* <input type='text' className='form-control' id='grading_id' placeholder='Enter grading code' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'grading_id', fieldValue: e.target.value })} /> */}
                        <Combobox
                          name='grading_id'
                          id='grading_id'
                          maxOptions={10}
                          fetchDataConfig={{
                            serviceName: 'getAllGradingsByCourseId',
                            fields: '_id,points,created_at,updated_at,description,title,created_by{full_name},updated_by{full_name}',
                            whereCondition: { course_id: match.params.course_id }
                          }}
                          optionColumnValue='_id'
                          optionColumnLabel='title'
                          defaultValue=''
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='points'>Points</label>
                        <input type='number' className='form-control' id='points' placeholder='Enter points. ex: 20' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'points', fieldValue: e.target.value })} />
                      </div>
                    </div>
                  </div>
                )
              }}
              footerCard={({ tablepaginationSubmitForm, payload }) => {
                return (
                  <>
                    <button style={{ width: 100 }} type='button' className='btn bg-gradient-warning' onClick={e => history.goBack()}>Cancel</button>
                    <button style={{ width: 150, marginLeft: 5 }} type='button' className='btn bg-gradient-warning' onClick={e => history.replace(`/subject/detail/${match.params.course_id}/${match.params.subject_id}`)}>Subject Detail</button>
                    <button
                      style={{ width: 100, marginLeft: 5 }} type='button' className='btn bg-gradient-primary' onClick={(e) => tablepaginationSubmitForm({
                        fields: paginationConfig.fields,
                        payload,
                        serviceName: paginationConfig.serviceName,
                        history,
                        redirectAfterCreate: '/subject-unit/detail'
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
export default CreateSubjectUnit
