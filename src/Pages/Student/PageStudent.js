import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import { path } from 'ramda'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import ContentHeader from '../../Components/ContentHeader'
import LoginCheck from '../../Containers/Login/LoginCheck'
import { Table, Filter } from '../../features/TablePagination'
import _ from 'lodash'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath


const getColumns = (history) => [
  {
    Header: 'Act',
    accessor: '_id',
    Cell: p => (
      <div class='btn-group'>
        <button type='button' class='btn btn-warning btn-flat' onClick={() => history.push(`${basePath}/user-course-enrollment/detail/${p.cell.value}`)}><i class='fas fa-eye' /></button>
        {/* <button type='button' class='btn btn-danger btn-flat'><i class='fas fa-ban' /></button>
        <button type='button' class='btn btn-success btn-flat'><i class='fas fa-check' /></button> */}
      </div>
    //   <div className='btn-group'>
    //     <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
    //       <span className='sr-only'>Toggle Dropdown</span>
    //     </button>
    //     <div className='dropdown-menu' role='menu'>
    //       <Link className='dropdown-item' to={`${basePath}/user-course-enrollment/detail/${p.cell.value}`}>Detail</Link>
    //       <Link className='dropdown-item' to={`${basePath}/user-course-enrollment/detail/${p.cell.value}`}>Approve</Link>
    //       <Link className='dropdown-item' to={`${basePath}/user-course-enrollment/detail/${p.cell.value}`}>Reject</Link>
    //     </div>
    //   </div>
    )
  },
  // { Header: 'status', accessor: 'status' },
  { Header: 'Name', accessor: 'user_id.full_name' },
  { Header: 'Email', accessor: 'user_id.email' }
  // { Header: 'code', accessor: 'course_id.code' },
  // { Header: 'batch', accessor: 'batch' }
]
class PageStudent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: getColumns(props.history)
    }
  }

  render () {
    const paginationConfig = {
      serviceName: 'getAllEnrollmentUserByFilter',
      fields: '_id,status,created_at,updated_at,batch,course_id{_id, code},user_id{email,full_name},created_by{full_name},updated_by{full_name}'
      // fields: _.join(_.map(columns, 'accessor'), ',')
    }
    const { columns } = this.state
    return (
      <ContentWrapper
        pageTitle='Student'
        breadcrumb={[{ title: 'Home', link: AppConfig.appHomePage }, { title: 'Student', link: null, isActive: true }]}
        contentHeaderTitle='Student'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Filter
              paginationConfig={paginationConfig}
              child={(tablepaginationOnChangeFilter, filter) => (
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label htmlFor='string_to_search'>Search</label>
                      <input type='text' className='form-control' value={path(['string_to_search'], filter) || ''} id='string_to_search' placeholder='Enter some text' onChange={e => tablepaginationOnChangeFilter({ serviceName: paginationConfig.serviceName, fieldName: 'string_to_search', fieldValue: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}
            />
            <Table
              cardTitle='Daftar user yang mendaftar'
              paginationConfig={paginationConfig}
              columns={columns}
              distinct='user_id'
              // whereCondition={{ course_id: [courseId] }}
              cardHeader={() => {
                return null
              }}
            />
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
export default PageStudent
