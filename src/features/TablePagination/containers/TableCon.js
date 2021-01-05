import React, { useEffect } from 'react'
import { useTable, usePagination } from 'react-table'
// import _ from 'lodash'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
// import { isImmutable } from 'seamless-immutable'
import TablepaginationActions from '../redux'
// import Loader from '../../../Components/Loader/Loader'
import TableViewTable from '../components/TableViewTable'

// import TableNavComp from './TableNavComp'
import config from '../config'

function ListAllContent (props) {
  const { whereCondition, filter, children, fetchData, errors, columns, data, loading, pageCount: controlledPageCount } = props
  //   console.log('data=====>', data)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: config.defaultPageIndex, pageSize: config.defaultPageSize },
    manualPagination: true,
    pageCount: controlledPageCount
  },
  usePagination
  )
  useEffect(() => {
    console.log('fetchDatafetchDatafetchDatafetchDatafetchData', filter)
    fetchData({
      pageSize,
      pageIndex,
      filter,
      whereCondition
    })
  }, [fetchData, pageIndex, pageSize, filter, whereCondition])
  const childrenWithProps = React.Children.map(children, child => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        columns,
        loading,
        errors,
        data,
        headerGroups,
        getTableProps,
        getTableBodyProps,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageIndex,
        pageOptions,
        gotoPage,
        pageCount,
        previousPage,
        nextPage,
        pageSize,
        setPageSize
      })
    }
    return child
  })
  return (
    <>
      {childrenWithProps}
    </>
  )
}
function ReactTable (props) {
  const {
    pageIndex,
    pageSize,
    pageCount,
    loading,
    data,
    distinct,
    whereCondition,
    history,
    fields,
    filter,
    tablepaginationFetchData,
    listallServiceName,
    columns,
    children
  } = props
  console.log('malmmmmm')
  const fetchData = React.useCallback(({ pageSize, pageIndex, filter, whereCondition }) => {
    console.log('whereConditionwhereConditionwhereCondition=>', whereCondition)
    let whereCond = ''
    if (typeof whereCondition === 'string') whereCond = JSON.parse(whereCondition || '{}')
    else whereCond = whereCondition
    console.log('whereConditionwhereConditionwhereCondition=>', whereCond)
    for (var param in whereCond) {
      console.log('paramssss=>' + param + '====>' + whereCond[param])
      if (!whereCond[param]) {
        // jika salah satu dari parameter where condition nya kosong, maka jangan dihit
        return null
      }
    }
    if (!tablepaginationFetchData) return
    tablepaginationFetchData({
      serviceName: listallServiceName,
      pageSize: pageSize || config.defaultPageSize,
      pageIndex: pageIndex || config.defaultPageIndex,
      filter,
      // filter: Immutable.asMutable(filter || {}, { deep: true }),
      fields,
      history,
      whereCondition: whereCond,
      distinct
    })
  }, [distinct, fields, history, listallServiceName, tablepaginationFetchData])
  // if (!isImmutable(filter)) return null
  return (
    <ListAllContent
      columns={columns}
      data={data || []}
      fetchData={fetchData}
      loading={loading}
      filter={filter}
      pageCount={pageCount}
      pageSize={pageSize}
      pageIndex={pageIndex}
      whereCondition={whereCondition}
    >
      {children && children}
      {!children && <TableViewTable />}
    </ListAllContent>
  )
}
const mapStateToProps = (state, ownProps) => {
  const errors = (state.tablepagination.errors || {})[ownProps.listallServiceName]
  const loading = (state.tablepagination.loading || {})[ownProps.listallServiceName]
  const data = (state.tablepagination.data || {})[ownProps.listallServiceName]
  const pageCount = (state.tablepagination.pageCount || {})[ownProps.listallServiceName]
  const filter = (state.tablepagination.filter || {})[ownProps.listallServiceName]
  const props = {
    data,
    filter,
    loading: loading,
    pageCount,
    pageSize: state.tablepagination.pageSize,
    pageIndex: state.tablepagination.pageIndex,
    errors
  }
  return props
}
const mapDispatchToProps = dispatch => {
  return {
    tablepaginationFetchData: data => dispatch(TablepaginationActions.tablepaginationFetchData(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ReactTable))
