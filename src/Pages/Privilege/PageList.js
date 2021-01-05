import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import { Table, Filter } from '../../features/TablePagination'
import { listallService, fields, listallPageTitle, upsertPageUrl, createNewButtonLabel, getColumns } from './Manifest'
import AppConfig from '../../Config/AppConfig'
class Comp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: getColumns(props.history)
    }
  }

  render () {
    const paginationConfig = {
      serviceName: listallService,
      fields: fields
    }
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
              serviceName={paginationConfig.serviceName}
              child={(tablepaginationOnChangeFilter, filter = {}) => (
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label htmlFor='string_to_search'>Cari</label>
                      <input type='text' className='form-control' value={filter.string_to_search || ''} id='string_to_search' placeholder='' onChange={e => tablepaginationOnChangeFilter({ serviceName: paginationConfig.serviceName, fieldName: 'string_to_search', fieldValue: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}
            />
            <Table
              listallServiceName={paginationConfig.serviceName}
              fields={paginationConfig.fields}
              columns={columns}
              createHref={upsertPageUrl()}
              createNewButtonLabel={createNewButtonLabel}
              cardTitle={listallPageTitle}
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
