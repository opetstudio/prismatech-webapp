import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
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
      <div className='btn-group'>
        <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
          <span className='sr-only'>Toggle Dropdown</span>
        </button>
        <div className='dropdown-menu' role='menu'>
          <Link className='dropdown-item' to={`${basePath}/course/detail/${p.cell.value}`}>Detail</Link>
        </div>
      </div>)
  },
  { Header: 'code', accessor: 'code' },
  { Header: 'title', accessor: 'title' },
  {
    Header: 'Short Description',
    accessor: 'content1',
    Cell: d => (
      <div dangerouslySetInnerHTML={{ __html: d.cell.value || '' }} />
    )
  },
  {
    Header: 'start_date',
    accessor: 'start_date',
    Cell: d => {
      let data = Moment(d.cell.value)
      if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
      else data = ''
      return (<span>{`${data}`}</span>)
    }
  },
  {
    Header: 'end_date',
    accessor: 'end_date',
    Cell: d => {
      let data = Moment(d.cell.value)
      if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
      else data = ''
      return (<span>{`${data}`}</span>)
    }
  },
  { Header: 'created by', accessor: 'created_by.full_name' }
  // { Header: 'created at', accessor: 'created_at' },
  // { Header: 'updated at', accessor: 'updated_at' }
]
class PageCourse extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: getColumns(props.history)
    }
  }

  render () {
    const { userPrivileges } = this.props
    // getAllPublishedCourses
    const paginationConfig = {
      serviceName: userPrivileges.includes('getAllCourses') ? 'getAllCourses' : 'getAllPublishedCourses',
      fields: '_id,title,code,start_date,end_date,content1,created_at,updated_at,created_by{full_name},updated_by{full_name}'
      // fields: _.join(_.map(columns, 'accessor'), ',')
    }
    console.log('paginationConfig===>', paginationConfig)
    console.log('this.props===>', this.props)
    const { columns } = this.state
    return (
      <ContentWrapper
        pageTitle='Course'
        breadcrumb={[{ title: 'Home', link: '/home' }, { title: 'Course', link: null, isActive: true }]}
        contentHeaderTitle='Course'
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
              cardTitle='Daftar Courses'
              paginationConfig={paginationConfig}
              columns={columns}
              createHref='/course/create'
              createNewButtonLabel='Create New Course'
            />
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    userPrivileges: state.myprofile.user_privileges
  }
}
export default connect(mapStateToProps)(PageCourse)
