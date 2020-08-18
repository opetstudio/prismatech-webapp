
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table } from '../../../features/TablePagination'
import AppConfig from '../../../Config/AppConfig'
const basePath = AppConfig.basePath

const getColumns = (history) => [
  {
    Header: 'Act',
    accessor: '_id',
    Cell: p => (
      <div className='btn-group'>
        <button type='button' className='btn btn-warning btn-flat' onClick={() => history.push(`${basePath}/user-course-enrollment/detail/${p.cell.value}`)}><i className='fas fa-eye' /></button>
        <button type='button' className='btn btn-danger btn-flat'><i className='fas fa-ban' /></button>
        <button type='button' className='btn btn-success btn-flat'><i className='fas fa-check' /></button>
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
  { Header: 'status', accessor: 'status' },
  { Header: 'Name', accessor: 'user_id.full_name' },
  { Header: 'Email', accessor: 'user_id.email' },
  { Header: 'code', accessor: 'course_id.code' },
  { Header: 'batch', accessor: 'batch' }
]
export default class EnrollmentList extends Component {
  render () {
    const { history, courseId } = this.props
    const paginationConfig = {
      serviceName: 'getAllEnrollmentUserByCourseId',
      fields: '_id,status,created_at,updated_at,batch,course_id{_id, code},user_id{email,full_name},created_by{full_name},updated_by{full_name}'
      // fields: _.join(_.map(columns, 'accessor'), ',')
    }
    const columns = getColumns(history)
    return (
      <Table
        cardTitle='Daftar user yang mendaftar'
        paginationConfig={paginationConfig}
        columns={columns}
        whereCondition={{ course_id: courseId }}
        cardHeader={() => {
          return null
        }}
        cardFooter={() => {
          return (
            <>
              <button style={{ width: 150 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Reject All</button>
              <button style={{ width: 150, marginLeft: 5 }} type='button' className='btn bg-gradient-primary' data-toggle='modal' data-target='#modal-danger'>Approve All</button>
            </>
          )
        }}
      />
    )
  }
}
