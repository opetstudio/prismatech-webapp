import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

const entityName = 'Privilege'
const entity = 'privilege'
const serviceEntity = 'Privilege'

export const redirectAfterCreate = '/' + entity + '/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const upsertPageUrl = (id) => (`/${entity}/upsert${id ? '/' + id : ''}`)
export const listallPageUrl = () => (`/${entity}`)
export const createNewButtonLabel = 'Buat Privilege Baru'
export const createPageTitle = 'Buat Privilege'
export const listallPageTitle = 'Privilege'
export const detailPageTitle = 'Detail Privilege'
export const upsertPageTitle = 'Form ' + entityName
// export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
// export const updateService = 'update' + serviceEntity
export const upsertService = 'upsert' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,role_id{_id, title},title,name,description,entity,created_at,updated_at,created_by{full_name},updated_by{full_name}'
export const getColumns = (history) => [
  {
    Header: ' ',
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
  { Header: 'Title', accessor: 'title' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Description', accessor: 'description' },
  {
    Header: 'Role',
    accessor: 'role_id',
    Cell: d => {
      // let data = Moment(d.cell.value)
      // if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
      // else data = ''
      const role = (_.map(d.cell.value || [], (v, k) => v.title) || []).join(', ')
      return (<span>{`${role}`}</span>)
    }
  }
  // {
  //   Header: 'Tanggal Dibuat',
  //   accessor: 'created_at',
  //   Cell: d => {
  //     let data = Moment(d.cell.value)
  //     if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
  //     else data = ''
  //     return (<span>{`${data}`}</span>)
  //   }
  // },
  // {
  //   Header: 'Tanggal Dirubah',
  //   accessor: 'updated_at',
  //   Cell: d => {
  //     let data = Moment(d.cell.value)
  //     if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
  //     else data = ''
  //     return (<span>{`${data}`}</span>)
  //   }
  // },
  // { Header: 'Dibuat Oleh', accessor: 'created_by.full_name' },
  // { Header: 'Dirubah Oleh', accessor: 'updated_by.full_name' }
  // { Header: 'created at', accessor: 'created_at' },
  // { Header: 'updated at', accessor: 'updated_at' }
]
export default {
  redirectAfterCreate,
  redirectAfterDelete,
  detailPageUrl,
  upsertPageUrl,
  // createPageUrl,
  createNewButtonLabel,
  createPageTitle,
  listallPageTitle,
  detailPageTitle,
  // updatePageTitle,
  // createService,
  detailService,
  // updateService,
  listallService,
  deleteService,
  upsertService,
  fields,
  getColumns,
  listallPageUrl
}
