import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { path } from 'ramda'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import ContentHeader from '../../Components/ContentHeader'
import LoginCheck from '../../Containers/Login/LoginCheck'
import { Table, Filter } from '../../features/TablePagination'
import AppConfig from '../../Config/AppConfig'
import { listallService, fields, listallPageTitle, createPageUrl, createNewButtonLabel, getColumns } from './Manifest'

let tablepaginationOnChangeFilterFunc = null
const paginationConfig = {
  serviceName: listallService,
  fields: fields
}
class Comp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: getColumns(props.history)
    }
  }

  componentDidMount () {
    window.singleDatePicker('#filter_start_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
      const x = document.getElementById('filter_start_date')
      x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
      tablepaginationOnChangeFilterFunc({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: new Date(par).getTime() })
    })
    window.singleDatePicker('#filter_end_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
      const x = document.getElementById('filter_start_date')
      x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
      tablepaginationOnChangeFilterFunc({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: new Date(par).getTime() })
    })
  }

  render () {
    const { columns } = this.state
    return (
      <ContentWrapper
        pageTitle={listallPageTitle}
        breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: listallPageTitle, link: null, isActive: true }]}
        contentHeaderTitle={listallPageTitle}
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Filter
              paginationConfig={paginationConfig}
              child={(tablepaginationOnChangeFilter, filter) => {
                console.log('filter========>', filter)
                tablepaginationOnChangeFilterFunc = tablepaginationOnChangeFilter
                return (
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label htmlFor='string_to_search'>Cari</label>
                        <input type='text' className='form-control' value={path(['string_to_search'], filter) || ''} id='string_to_search' placeholder='' onChange={e => tablepaginationOnChangeFilter({ serviceName: paginationConfig.serviceName, fieldName: 'string_to_search', fieldValue: e.target.value })} />
                      </div>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label htmlFor='updated_at'>Tanggal Transaksi Dari</label>
                            <input id='filter_start_date' type='text' className='form-control' placeholder='' />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label htmlFor='updated_at'>Tanggal Transaksi Sampai</label>
                            <input id='filter_end_date' type='text' className='form-control' placeholder='' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }}
            />
            <Table
              paginationConfig={paginationConfig}
              columns={columns}
              // createHref={createPageUrl()}
              createNewButtonLabel={createNewButtonLabel}
            />
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    userPrivileges: state.myprofile.user_privileges
  }
}
export default connect(mapStateToProps)(Comp)
