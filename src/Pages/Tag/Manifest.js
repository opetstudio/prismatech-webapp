import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

const entityName = 'Tag'
const entity = 'tag'
const serviceEntity = 'Tag'

export const redirectAfterCreate = '/' + entity + '/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const updatePageUrl = (id) => (`/${entity}/update/${id}`)
export const createPageUrl = () => (`/${entity}/create`)
export const createNewButtonLabel = 'Create New ' + entityName
export const createPageTitle = 'Create New ' + entityName
export const listallPageTitle = entityName + 's'
export const detailPageTitle = entityName + ' Detail'
export const updatePageTitle = 'Update ' + entityName
export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
export const updateService = 'update' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,name,created_at,updated_at,created_by{full_name},updated_by{full_name}'
export const getColumns = (history) => [
  {
    Header: 'Act',
    accessor: '_id',
    Cell: p => (
      <div className='btn-group'>
        <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
          <span className='sr-only'>Toggle Dropdown</span>
        </button>
        <div className='dropdown-menu' role='menu'>
          <Link className='dropdown-item' to={`${basePath}${redirectAfterCreate}/${p.cell.value}`}>Detail</Link>
        </div>
      </div>)
  },
  { Header: 'name', accessor: 'name' },
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
export default {
  redirectAfterCreate,
  redirectAfterDelete,
  detailPageUrl,
  updatePageUrl,
  createPageUrl,
  createNewButtonLabel,
  createPageTitle,
  listallPageTitle,
  detailPageTitle,
  updatePageTitle,
  createService,
  detailService,
  updateService,
  listallService,
  deleteService,
  fields,
  getColumns
}