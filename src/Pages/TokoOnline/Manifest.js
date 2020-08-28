import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import {path} from 'ramda'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

const entityName = 'Plink Market'
const entity = 'tokoonline'
const collection = 'toko_toko_product'
const serviceEntity = 'TokoTokoOnline'

export const redirectAfterCreate = '/' + entity + '/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const updatePageUrl = (id) => (`/${entity}/update/${id}`)
export const createPageUrl = () => (`/${entity}/create`)
export const createNewButtonLabel = 'Buat Toko Baru'
export const createPageTitle = 'Buat Toko Baru'
export const listallPageTitle = entityName
export const detailPageTitle = entityName + ' Detail'
export const updatePageTitle = 'Update ' + entityName
export const updateService = 'update' + serviceEntity
export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,name,slug,plink_merchant_id,plink_merchant_key_id,status,website,facebook,instagram,youtube,description,created_at,updated_at,owner{full_name},created_by{full_name},updated_by{full_name}'
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
  { Header: 'Nama', accessor: 'name' },
  { Header: 'website', accessor: 'website' },
  { Header: 'facebook', accessor: 'facebook' },
  { Header: 'instagram', accessor: 'instagram' },
  { Header: 'youtube', accessor: 'youtube' },
  { Header: 'status', accessor: 'status' },
  {
    Header: 'Tanggal Diperbaharui',
    accessor: 'updated_at',
    Cell: d => {
      let data = Moment(d.cell.value)
      if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
      else data = ''
      return (<span>{`${data}`}</span>)
    }
  },
  { Header: 'Pemilik', accessor: 'owner.full_name' }
//   { Header: 'updated by', accessor: 'updated_by.full_name' }
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
