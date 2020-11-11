import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import { path } from 'ramda'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import ContentHeader from '../../Components/ContentHeader'
import LoginCheck from '../../Containers/Login/LoginCheck'
import { Table, Filter } from '../../features/TablePagination'
import AppConfig from '../../Config/AppConfig'
import { listallService, fields, listallPageTitle, createPageUrl, createNewButtonLabel, getColumns } from './Manifest'

function Comp (props) {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     columns: getColumns({ history: props.history })
  //   }
  // }

  const [stateStockProduct, setStateStockProduct] = React.useState({})

  // render () {
  const paginationConfig = {
    serviceName: listallService,
    fields: fields
  }
  // const { columns } = this.state
  console.log('renderrrrr table')
  const columns = getColumns({ history: props.history, stateStockProduct, setStateStockProduct })
  return (
    <ContentWrapper
      pageTitle={listallPageTitle}
      breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: listallPageTitle, link: null, isActive: true }]}
      contentHeaderTitle={listallPageTitle}
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          {/* <Filter
              paginationConfig={paginationConfig}
              child={(tablepaginationOnChangeFilter, filter) => (
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label htmlFor='string_to_search'>Cari</label>
                      <input type='text' className='form-control' value={path(['string_to_search'], filter) || ''} id='string_to_search' placeholder='' onChange={e => tablepaginationOnChangeFilter({ serviceName: paginationConfig.serviceName, fieldName: 'string_to_search', fieldValue: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}
            /> */}
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
  // }
}
const mapStateToProps = (state, ownProps) => {
  return {
    userPrivileges: state.myprofile.user_privileges
  }
}
export default connect(mapStateToProps)(Comp)
