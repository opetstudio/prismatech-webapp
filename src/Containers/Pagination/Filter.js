import React from 'react'
import Immutable from 'seamless-immutable'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import PaginationActions, { PaginationSelectors } from './redux'
import { LoginSelectors } from '../../Containers/Login/redux'
import Filter from '../../Components/Pagination/Filter'
import { updateURLParameter } from '../../Utils/Utils'

let firstLoad = true

class TheComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.resetFilter = this.resetFilter.bind(this)
    // this.searchByQuery = this.searchByQuery.bind(this)
    // this.setupGraphqlParameter = this.setupGraphqlParameter.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    const { filter, userMerchantCode } = this.props
    if (firstLoad && !_.isEmpty(Immutable.asMutable(filter, { deep: true })) && !_.isEmpty(userMerchantCode)
    ) {
      this.searchByQuery()
      firstLoad = false
    }
  }

  setupGraphqlParameter (refs) {
    console.log('setupGraphqlParameter====')
    const thisFilter = Immutable.asMutable(this.props.filter, { deep: true })
    const { table, location, page, pageSize } = this.props
    const obj = refs[table]
    const el = obj.querySelectorAll('input')
    const filter = {}
    el.forEach((v, k) => {
      console.log(v.getAttribute('value'))
      filter[v.getAttribute('name')] = v.getAttribute('value')
    })

    const allFilter = { ...filter, ...thisFilter }
    const { search } = location
    const gql = { table, filter: allFilter }
    return gql
  }

  searchByQuery () {
    const thisFilter = Immutable.asMutable(this.props.filter, { deep: true })
    // const { submitFilter, table, columns } = this.props
    const { pageSize, page, table, columns, datasource, userMerchantCode, submitFilterMSG, submitFilter } = this.props
    console.log('okeeeeeee userMerchantCode=', userMerchantCode)
    if (!_.isEmpty(thisFilter)) submitFilter({ datasource, columns, table, page: page, size: pageSize, filter: thisFilter, userMerchantCode })
  }

  handleOnSubmit (refs) {
    const { history, location } = this.props
    const { pathname, search } = location
    const gql = this.setupGraphqlParameter(refs)
    history.replace(updateURLParameter(pathname + search, 'graphql', encodeURIComponent(JSON.stringify(gql))))
    this.searchByQuery()
  }

  resetFilter (refs) {
    // if (e) e.preventDefault()
    const { table, handleOnChange } = this.props
    const obj = refs[table]
    const el = obj.querySelectorAll('input')

    el.forEach((v, k) => {
      const val = v.getAttribute('value')
      const name = v.getAttribute('name')
      const datatype = v.getAttribute('datatype')
      console.log('resetfilter name=' + name + ', val=' + val)
      const isHidden = v.getAttribute('isHidden')
      if (isHidden !== 'true') handleOnChange({ table, field: name, value: '' })
      if (datatype === 'singleDatePicker') handleOnChange({ table, field: name, value: '' })
    })
  }

  downloadData (refs) {
    // (e) => { if (e) e.preventDefault(); requestData({}) }
    const { table, location, page, pageSize } = this.props
    const { pathname, search } = location
    const gql = this.setupGraphqlParameter(refs)
    gql.sorting = ''
    // history.replace(updateURLParameter(pathname + search, 'graphql', JSON.stringify(gql)))
    // this.searchByQuery()
    const gqlJsonString = JSON.stringify(gql)
    const gqlJsonStringUri = encodeURIComponent(gqlJsonString)
    const linkDownload = updateURLParameter(updateURLParameter(updateURLParameter(search, 'graphql', gqlJsonStringUri), 'page', page), 'pageSize', pageSize)
    console.log('linkDownload===>', '/' + linkDownload)

    window.open('/va-report/download' + linkDownload, '_blank')
  }

  render () {
    console.log('render container pagination table filter===', this.props)
    const { pageSize, page, table, columns, datasource, userMerchantCode, submitFilterMSG, children } = this.props
    return (
      <Filter
        submitFilterMSG={submitFilterMSG}
        table={table}
        onSubmitForm={(refs) => this.handleOnSubmit(refs)}
        onResetForm={(refs) => this.resetFilter(refs)}
        onDownload={(refs) => this.downloadData(refs)}
        children={children}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('hufffownProps.table=', ownProps.table)
  return {
    filter: PaginationSelectors.filter(state.pagination, ownProps.table),
    pageSize: PaginationSelectors.size(state.pagination, ownProps.table),
    page: PaginationSelectors.page(state.pagination, ownProps.table),
    submitFilterMSG: PaginationSelectors.submitFilterMSG(state.pagination, ownProps.table),
    userMerchantCode: LoginSelectors.userMerchantCode(state.login)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // transactionReadRequest: query => dispatch(TransactionActions.transactionReadRequest(query))
    submitFilter: query => dispatch(PaginationActions.submitFilter(query)),
    resetFilter: query => dispatch(PaginationActions.resetFilter(query)),
    handleOnChange: query => dispatch(PaginationActions.fieldOnChange(query))
    // handleOnChange: query => dispatch(TransactionActions.handleOnChange(query))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withRouter(TheComponent)))
