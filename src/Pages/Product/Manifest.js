import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import _ from 'lodash'
import {path} from 'ramda'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

const entityName = 'Product'
const entity = 'product'
const collection = 'toko_product'
const serviceEntity = 'TokoProduct'

export const redirectAfterCreate = '/' + entity + '/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const updatePageUrl = (id) => (`/${entity}/update/${id}`)
export const createPageUrl = () => (`/${entity}/create`)
export const createNewButtonLabel = 'Buat Produk Baru'
export const createPageTitle = 'Buat Produk Baru'
export const listallPageTitle = entityName + 's'
export const detailPageTitle = entityName + ' Detail'
export const updatePageTitle = 'Update ' + entityName
export const updateService = 'update' + serviceEntity
export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,content1,estimated_delivery_unit_time_instock,estimated_delivery_unit_time_preorder,estimated_delivery_time_instock,estimated_delivery_time_preorder,instock_label,preorder_policy,product_availability,stock_amount,weight,isneed_shipping,name,code,description,price,tag_id{_id, name},toko_id{_id, name},category_id{_id, title},image_id{_id, filename, filenameorigin, file_type},created_at,updated_at,created_by{full_name},updated_by{full_name}'
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
  { Header: 'Kode', accessor: 'code' },
  { Header: 'Harga', accessor: 'price' },
  { Header: 'Kategori', accessor: p => (<span>{(_.map(p.category_id, v => v.title) || []).join(', ')}</span>) },
  { Header: 'Toko', accessor: p => (<span>{(_.map(p.toko_id, v => v.name) || []).join(', ')}</span>) },
{ Header: 'Gambar', accessor: p => (<span>{(p.image_id || {}).filename}.{(p.image_id || {}).file_type}</span>) },
//   {
//     Header: 'created_at',
//     accessor: 'created_at',
//     Cell: d => {
//       let data = Moment(d.cell.value)
//       if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
//       else data = ''
//       return (<span>{`${data}`}</span>)
//     }
//   },
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
  { Header: 'Dibuat Oleh', accessor: 'created_by.full_name' }
//   { Header: 'updated by', accessor: 'updated_by.full_name' }
  // { Header: 'created at', accessor: 'created_at' },
  // { Header: 'updated at', accessor: 'updated_at' }
]
