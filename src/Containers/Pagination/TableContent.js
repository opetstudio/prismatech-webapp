import React from 'react'
import { connect } from 'react-redux'
import { path } from 'ramda'
import Immutable from 'seamless-immutable'
import { injectIntl } from 'react-intl'
import PaginationActions, { PaginationSelectors } from './redux'
import TableContent from '../../Components/Pagination/TableContent'
import { generateSha256 } from '../../Utils/Utils'
import { LoginSelectors } from '../../Containers/Login/redux'

let hashBefore = ''

class TheComponent extends React.PureComponent {
  componentDidMount () {
    // const { datasource, columns, pageSize, page, submitFilterMSG, totalPages, rows, table, filter, onSubmit } = this.props
    // onSubmit({ datasource, columns, table, page, size: pageSize, filter: Immutable.asMutable(filter, { deep: true }) })
  }

  handleFetchData (state, instance) {
    console.log('fetchData state:', state)
    const { datasource, columns, submitFilterMSG, table, filter, submitFilter, userMerchantCode } = this.props
    const loading = path(['ir'], submitFilterMSG)

    if (loading) {
      // console.log('still fetching')
      return
    }
    const data = {
      pageSize: state.pageSize,
      page: state.page,
      sorted: state.sorted,
      filtered: state.filtered
    }

    const dataString = JSON.stringify(data)
    const hash = generateSha256(dataString)
    if (hashBefore === hash) return
    hashBefore = hash

    const thisFilter = Immutable.asMutable(filter, { deep: true })

    const graphqlParameter = { datasource, columns, table, page: state.page, size: state.pageSize, sorted: state.sorted, filtered: state.filtered, filter: thisFilter, userMerchantCode }

    console.log('graphqlParameter====>', graphqlParameter)
    submitFilter(graphqlParameter)
  }

  render () {
    console.log('render container pagination table content===')
    const { columns, pageSize, page, submitFilterMSG, totalPages, rows } = this.props
    const loading = path(['ir'], submitFilterMSG)
    // console.log('render react table propssssss ==>', this.props)
    return (
      <TableContent
        columns={columns}
        pageSize={pageSize}
        page={page}
        loading={loading}
        pages={totalPages}
        data={rows}
        onFetchData={this.handleFetchData.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    filter: PaginationSelectors.filter(state.pagination, ownProps.table),
    pageSize: PaginationSelectors.size(state.pagination, ownProps.table),
    page: PaginationSelectors.page(state.pagination, ownProps.table),
    totalPages: PaginationSelectors.totalPages(state.pagination, ownProps.table),
    rows: PaginationSelectors.rows(state.pagination, ownProps.table),
    submitFilterMSG: PaginationSelectors.submitFilterMSG(state.pagination, ownProps.table),
    userMerchantCode: LoginSelectors.userMerchantCode(state.login)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // transactionReadRequest: query => dispatch(TransactionActions.transactionReadRequest(query))
    submitFilter: query => dispatch(PaginationActions.submitFilter(query)),
    resetFilter: query => dispatch(PaginationActions.resetFilter(query))
    // handleOnChange: query => dispatch(TransactionActions.handleOnChange(query))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))
