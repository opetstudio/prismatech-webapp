import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import _ from 'lodash'
import { path } from 'ramda'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

const entityName = 'TokoProductVariation'
const entity = 'tokoproductvariation'
const collection = 'toko_product_variation'
const serviceEntity = 'TokoProductVariation'

export const redirectAfterCreate = '/inventory/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/inventory/detail/${id}`)
export const updatePageUrl = (id) => (`/${entity}/update/${id}`)
export const createPageUrl = () => (`/${entity}/create`)
export const createNewButtonLabel = 'Create New ' + entityName
export const createPageTitle = 'Create New ' + entityName
export const listallPageTitle = 'Data Inventaris'
export const detailPageTitle = 'Data Detail Inventaris'
export const updatePageTitle = 'Update ' + entityName
export const updateService = 'update' + serviceEntity
export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
export const listallService = 'getAllTokoProductVariations'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,sku,product_id{_id,name,product_availability,preorder_policy,code,image_id{filename,file_type}},inventories{_id,quantity,created_at,updated_at,created_by{full_name},updated_by{full_name}},created_at,updated_at,created_by{full_name},updated_by{full_name}'
export const getColumns = ({ history, stateParams, formUpdateStock, submitUpdateStock }) => [
  // {
  //   Header: 'Act',
  //   accessor: '_id',
  //   Cell: p => (
  //     <div className='btn-group'>
  //       <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
  //         <span className='sr-only'>Toggle Dropdown</span>
  //       </button>
  //       <div className='dropdown-menu' role='menu'>
  //         <Link className='dropdown-item' to={`${basePath}${redirectAfterCreate}/${p.cell.value}`}>Detail</Link>
  //       </div>
  //     </div>)
  // },
  { Header: 'Kode Produk', accessor: 'product_id.code' },
  { Header: 'Nama Produk', accessor: 'product_id.name' },
  { Header: 'Status produk jika stok habis', accessor: 'product_id.preorder_policy' },
  // {
  //   Header: 'Stok',
  //   accessor: p => {
  //     return <span>{(formUpdateStock.stateStockProduct || {})['' + p.inventories[0]._id]}</span>
  //   }
  // },
  {
    Header: 'Ubah Stok',
    accessor: p => formUpdateStock({ dataDetail: p, stateParams, submitUpdateStock })
    // Cell: p => (
    //   <div className='input-group mb-3'>
    //     <input type='text' className='form-control rounded-0' />
    //     <span className='input-group-append'>
    //       <button type='button' className='btn btn-info btn-flat'>Simpan</button>
    //     </span>
    //   </div>
    // )
  }

  // { Header: 'Nama Lengkap', accessor: 'full_name' },
  // { Header: 'No Telepon', accessor: 'phone_number' },
  // { Header: 'Email', accessor: 'email' },
  // { Header: 'Total Pembayaran', accessor: 'total_amount' },
  // { Header: 'ID Sesi', accessor: 'session_id' },
  // { Header: 'Kode Invoice', accessor: 'invoice_code' },
//   { Header: 'category', accessor: p => (<span>{(_.map(p.category_id, v => v.title) || []).join(', ')}</span>) },
//   { Header: 'toko', accessor: p => (<span>{(_.map(p.toko_id, v => v.name) || []).join(', ')}</span>) },
// { Header: 'picture', accessor: p => (<span>{p.image_id.filename}.{p.image_id.file_type}</span>) },
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
  // {
  //   Header: 'Tanggal Transaksi',
  //   accessor: 'updated_at',
  //   Cell: d => {
  //     let data = Moment(d.cell.value)
  //     if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
  //     else data = ''
  //     return (<span>{`${data}`}</span>)
  //   }
  // },
  // { Header: 'created by', accessor: 'created_by.full_name' }
//   { Header: 'updated by', accessor: 'updated_by.full_name' }
  // { Header: 'created at', accessor: 'created_at' },
  // { Header: 'updated at', accessor: 'updated_at' }
]
