import React, { Component } from 'react'
import { Create as Createform } from '../../features/TablePagination'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import moment from 'moment'
import { getAccessToken } from '../../Utils/Utils'
import { path } from 'ramda'
import { connect } from 'react-redux'
import AppConfig from '../../Config/AppConfig'

const paginationConfig = {
  serviceName: 'createLmsGrading',
  fields: '_id,title,description,points,created_at,updated_at,created_by{full_name},updated_by{full_name}'
}

let tablepaginationOnChangeFormFunc = null
class PageCreateGrading extends Component {
  componentDidMount () {
    const { match } = this.props
    tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'course_id', fieldValue: match.params.course_id })
  }

  render () {
    const { match, history, payload } = this.props
    return (
      <ContentWrapper
        pageTitle='Create New Grading'
        breadcrumb={[{ title: 'Home', link: AppConfig.appHomePage }, { title: 'Create New Grading', link: null, isActive: true }]}
        contentHeaderTitle='Create New Grading'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Createform
              formTitle='Create New Grading'
              paginationConfig={paginationConfig}
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
                        <label htmlFor='points'>points</label>
                        <input type='number' className='form-control' id='points' placeholder='Enter points' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'points', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='description'>description</label>
                        <input type='text' className='form-control' id='description' placeholder='Enter description' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'description', fieldValue: e.target.value })} />
                      </div>
                    </div>
                  </div>
                )
              }}
              footerCard={({ tablepaginationSubmitForm, payload }) => {
                return (
                  <>
                    <button style={{ width: 100 }} type='button' className='btn bg-gradient-warning' onClick={e => history.goBack()}>Cancel</button>
                    <button style={{ width: 150, marginLeft: 5 }} type='button' className='btn bg-gradient-warning' onClick={e => history.replace(`/course/detail/${match.params.course_id}`)}>Course Detail</button>
                    <button
                      style={{ width: 100, marginLeft: 5 }} type='button' className='btn bg-gradient-primary' onClick={(e) => tablepaginationSubmitForm({
                        fields: paginationConfig.fields,
                        payload,
                        serviceName: paginationConfig.serviceName,
                        history,
                        redirectAfterCreate: '/grading/detail'
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
)(PageCreateGrading)
