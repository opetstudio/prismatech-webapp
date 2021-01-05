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
          <Link className='dropdown-item' to={`${basePath}/role/detail/${p.cell.value}`}>Detail</Link>
        </div>
      </div>)
  },
  { Header: 'title', accessor: 'title' },
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
  { Header: 'created by', accessor: 'created_by.full_name' },
  { Header: 'updated by', accessor: 'updated_by.full_name' }
  // { Header: 'created at', accessor: 'created_at' },
  // { Header: 'updated at', accessor: 'updated_at' }
]
class PageRole extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: getColumns(props.history)
    }
  }

  render () {
    const { columns } = this.state
    return (
      <ContentWrapper
        pageTitle='Role'
        breadcrumb={[{ title: 'Home', link: AppConfig.appHomePage }, { title: 'Role', link: null, isActive: true }]}
        contentHeaderTitle='Role'
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
              listallServiceName='getAllRoles'
              fields='_id,title,privilege_id{title, name},created_at,updated_at,created_by{full_name},updated_by{full_name}'
              columns={columns}
              createHref='/role/upsert'
              createNewButtonLabel='Create New Role'
              cardTitle='Role'
            />
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
export default PageRole
