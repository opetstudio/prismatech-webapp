import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

const entityName = 'Category'
const entity = 'category'
const collection = 'category'
const serviceEntity = 'Category'

export const redirectAfterCreate = '/' + entity + '/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const updatePageUrl = (id) => (`/${entity}/update/${id}`)
export const createPageUrl = () => (`/${entity}/create`)
export const createNewButtonLabel = 'Buat Kategori Baru'
export const createPageTitle = 'Buat Kategori'
export const listallPageTitle = 'Kategori'
export const detailPageTitle = 'Detail Kategori'
export const updatePageTitle = 'Update ' + entityName
export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
export const updateService = 'update' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,title,toko_id{_id, name},parent_id{_id, title},created_at,updated_at,created_by{full_name},updated_by{full_name}'
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
  { Header: 'Kategori', accessor: 'title' },
  { Header: 'Induk', accessor: 'parent_id.title' },
  {
    Header: 'Tanggal Dibuat',
    accessor: 'created_at',
    Cell: d => {
      let data = Moment(d.cell.value)
      if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
      else data = ''
      return (<span>{`${data}`}</span>)
    }
  },
  {
    Header: 'Tanggal Dirubah',
    accessor: 'updated_at',
    Cell: d => {
      let data = Moment(d.cell.value)
      if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
      else data = ''
      return (<span>{`${data}`}</span>)
    }
  },
  { Header: 'Dibuat Oleh', accessor: 'created_by.full_name' },
  { Header: 'Dirubah Oleh', accessor: 'updated_by.full_name' }
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
