import React, { Component } from 'react'
import { Table, Update as Updateform, Combobox } from '../../features/TablePagination'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import Helmet from 'react-helmet'
import _ from 'lodash'
import moment from 'moment'
import { path } from 'ramda'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import { getAccessToken } from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'

const paginationConfig = {
  serviceName: 'getDetailLmsSubjectUnit',
  updateServiceName: 'updateLmsSubjectUnit',
  fields: '_id,content1,points,title,created_at,updated_at,grading_id{_id},subject_id{_id},created_by{full_name},updated_by{full_name}',
  redirectAfterCreate: '/course/detail/'
}
let tablepaginationOnChangeFormFunc = null
class UpdateSubjectUnit extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
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
        pageTitle='Update Subject Unit'
        breadcrumb={[{ title: 'Home', link: AppConfig.appHomePage }, { title: 'Update Subject Unit', link: null, isActive: true }]}
        contentHeaderTitle='Update Subject Unit'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Updateform
              id={match.params._id}
              // cancelHref={`/course/detail/${match.params._id}`}
              formTitle='Update Subject Unit'
              paginationConfig={paginationConfig}
              redirectAfterCreate={`/subject-unit/detail/${match.params.course_id}/${match.params.subject_id}`}
              child={(tablepaginationOnChangeForm, dataDetail, payload) => {
                tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
                return (
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label htmlFor='title'>title</label>
                        <input type='text' className='form-control' id='title' placeholder='Enter title' value={path([paginationConfig.serviceName, 'title'], payload) || path([paginationConfig.serviceName, 'title'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'title', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='content1'>Content</label>
                        <textarea className='textarea' id='content1' placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} value={path([paginationConfig.serviceName, 'content1'], payload) || path([paginationConfig.serviceName, 'content1'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} />
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
                          defaultValue={path([paginationConfig.serviceName, 'grading_id'], payload) || path([paginationConfig.serviceName, 'grading_id', '_id'], dataDetail)}
                          onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'grading_id', fieldValue: e.target.value })}
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='points'>Points</label>
                        <input type='number' className='form-control' id='points' placeholder='Enter points. ex: 20' value={path([paginationConfig.serviceName, 'points'], payload) || path([paginationConfig.serviceName, 'points'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'points', fieldValue: e.target.value })} />
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
export default UpdateSubjectUnit
