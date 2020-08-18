
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
        <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
          <span className='sr-only'>Toggle Dropdown</span>
        </button>
        <div className='dropdown-menu' role='menu'>
          <Link className='dropdown-item' to={`${basePath}/grading/detail/${p.cell.value}`}>Detail</Link>
        </div>
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
  { Header: 'Title', accessor: 'title' },
  { Header: 'points', accessor: 'points' }
]
export default class GradingList extends Component {
  render () {
    const { history, courseId } = this.props
    const paginationConfig = {
      serviceName: 'getAllGradingsByCourseId',
      fields: '_id,points,created_at,updated_at,description,title,created_by{full_name},updated_by{full_name}'
      // fields: _.join(_.map(columns, 'accessor'), ',')
    }
    const columns = getColumns(history)
    return (
      <Table
        cardTitle='Daftar Gradings'
        paginationConfig={paginationConfig}
        columns={columns}
        whereCondition={{ course_id: courseId }}
        createHref={`/grading/create/${courseId}`}
        createNewButtonLabel='Create New Grading'
        // cardHeader={() => {
        //   return null
        // }}
        cardFooter={() => {
          return (
            <>
              {/* <button style={{ width: 150 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Reject All</button> */}
              {/* <button style={{ width: 150, marginLeft: 5 }} type='button' className='btn bg-gradient-primary' data-toggle='modal' data-target='#modal-danger'>Approve All</button> */}
            </>
          )
        }}
      />
    )
  }
}
