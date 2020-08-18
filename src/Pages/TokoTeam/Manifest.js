import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import {path} from 'ramda'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

const entityName = 'TokoTeam'
const entity = 'tokoteam'
const collection = 'toko_team'
const serviceEntity = 'TokoTeam'

export const redirectAfterCreate = (tokoId) => ('/' + entity + '/detail/' + tokoId)
export const redirectAfterDelete = (tokoId) => ('/tokoonline/detail/' + tokoId)
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const updatePageUrl = (id) => (`/${entity}/update/${id}`)
export const createPageUrl = () => (`/${entity}/create`)
export const createNewButtonLabel = 'Create New ' + entityName
export const createPageTitle = 'Add a team member'
export const listallPageTitle = entityName + 's'
export const detailPageTitle = entityName + ' Detail'
export const updatePageTitle = 'Update ' + entityName
export const updateService = 'update' + serviceEntity
export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,user_id{_id, full_name, email},toko_id{_id, name},role_id{_id, title},created_at,updated_at,created_by{full_name},updated_by{full_name}'
export const getColumns = ({ history, tokoId }) => [
  {
    Header: 'Act',
    accessor: '_id',
    Cell: p => (
      <div className='btn-group'>
        <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
          <span className='sr-only'>Toggle Dropdown</span>
        </button>
        <div className='dropdown-menu' role='menu'>
          <Link className='dropdown-item' to={`${basePath}${redirectAfterCreate(tokoId)}/${p.cell.value}`}>Detail</Link>
        </div>
      </div>)
  },
  { Header: 'name', accessor: 'user_id.full_name' },
  { Header: 'email', accessor: 'user_id.email' },
  // { Header: 'name', accessor: 'toko_id.name' },
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
  { Header: 'created by', accessor: 'created_by.full_name' }
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
