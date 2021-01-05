import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
// import { path } from 'ramda'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import { Table } from '../../features/TablePagination'
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
          <Link className='dropdown-item' to={`${basePath}/user/detail/${p.cell.value}`}>Detail</Link>
        </div>
      </div>)
  },
  { Header: 'full_name', accessor: 'full_name' },
  { Header: 'email', accessor: 'email' },
  { Header: 'role', accessor: 'role' },
  {
    Header: 'created_at',
    accessor: 'created_at',
    Cell: d => {
      let data = Moment(d.cell.value)
      if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
      else data = ''
      return (<span>{`${data}`}</span>)
    }
  },
  {
    Header: 'updated_at',
    accessor: 'updated_at',
    Cell: d => {
      let data = Moment(d.cell.value)
      if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
      else data = ''
      return (<span>{`${data}`}</span>)
    }
  },
  {
    Header: 'Last Login',
    accessor: 'last_login',
    Cell: d => {
      let data = Moment(d.cell.value)
      if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
      else data = ''
      return (<span>{`${data}`}</span>)
    }
  },
  { Header: 'created by', accessor: 'created_by.full_name' },
  { Header: 'updated by', accessor: 'updated_by.full_name' }
  // { Header: 'created at', accessor: 'created_at' },
  // { Header: 'updated at', accessor: 'updated_at' }
]
class PageUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: getColumns(props.history)
    }
  }

  render () {
    // getAllPublishedCourses
    const paginationConfig = {
      serviceName: 'getAllUsers',
      fields: '_id,full_name,last_login,username,email,role,created_at,updated_at,created_by{full_name},updated_by{full_name}'
      // fields: _.join(_.map(columns, 'accessor'), ',')
    }
    console.log('paginationConfig===>', paginationConfig)
    console.log('this.props===>', this.props)
    const { columns } = this.state
    return (
      <ContentWrapper
        pageTitle='User Management'
        breadcrumb={[{ title: 'Home', link: AppConfig.appHomePage }, { title: 'User', link: null, isActive: true }]}
        contentHeaderTitle='User Management'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            {/* <Filter
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
            /> */}
            <Table
              listallServiceName='getAllUsers'
              fields='_id,full_name,last_login,username,email,role,created_at,updated_at,created_by{full_name},updated_by{full_name}'
              columns={columns}
              cardTitle='Daftar User'
            />
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
export default PageUser
