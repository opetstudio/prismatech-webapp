import React, { PureComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { injectIntl, FormattedMessage as T } from 'react-intl'
// import TablepaginationActions from '../redux'
// import Immutable from 'seamless-immutable'
// import config from '../config'
import TableCon from '../containers/TableCon'
// import Loader from 'react-spinners/ClipLoader'
// import Loader from '../../../Components/Loader/Loader'
// const Table = React.memo(props => {
// // function Table (props) {
//   const { errors, columns, data, fetchData, loading, pageCount: controlledPageCount, filter, whereCondition } = props
//   console.log('render table =====>', props)
//   console.log('dataaa=====>', data)
//   console.log('filter=====>', filter)
//   console.log('TablewhereCondition==-----===>', whereCondition)
//   // Use the state and functions returned from useTable to build your UI
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     page,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state: { pageIndex, pageSize }
//   } = useTable({
//     columns,
//     data,
//     initialState: { pageIndex: config.defaultPageIndex, pageSize: config.defaultPageSize },
//     manualPagination: true,
//     pageCount: controlledPageCount
//   },
//   usePagination
//   )

//   // fetchData({ pageIndex, pageSize })

//   // Listen for changes in pagination and use the state to fetch our new data
//   React.useEffect(() => {
//     console.log('react====effect========whereCondition', whereCondition)
//     console.log('react====effect========pageIndex', pageIndex)
//     console.log('react====effect========pageSize', pageSize)
//     console.log('react====effect========filter', filter)
//     // console.log('react effect========pageIndex=', pageIndex)
//     // console.log('react effect========pageSize=', pageSize)
//     fetchData({ pageIndex, pageSize, filter, whereCondition })
//   }, [fetchData, pageIndex, pageSize, whereCondition, filter])
//   // React.useEffect(() => {
//   console.log('react effect=xxxxx=======TablewhereCondition2=====', data)
//   // console.log('react effect========pageIndex=', pageIndex)
//   // console.log('react effect========pageSize=', pageSize)
//   // fetchData({ pageIndex, pageSize, filter, whereCondition })
//   // fetchData({ pageIndex, pageSize, filter, whereCondition })
//   // }, [whereCondition])

//   // Render the UI for your table
//   return (
//     <>
//       {/* <Styles> */}
//       <div className='table-responsive'>
//         {loading && <Loader loading type='rpmerah' />}
//         {!loading && !_.isEmpty(errors) && <div class='alert alert-danger' role='alert'><ul>{errors.map((v, i) => <li key={i}>{v.message}</li>)}</ul></div>}
//         {!loading &&
//           <table className='table m-0 table-striped table-sm' {...getTableProps()}>
//             <thead>
//               {headerGroups.map((headerGroup, i) => (
//                 <tr key={i} {...headerGroup.getHeaderGroupProps()}>
//                   {headerGroup.headers.map((column, j) => (
//                     <th key={j} {...column.getHeaderProps()}>
//                       {column.render('Header')}
//                       {/* Add a sort direction indicator */}
//                       <span>
//                         {column.isSorted
//                           ? column.isSortedDesc
//                             ? ' 🔽'
//                             : ' 🔼'
//                           : ''}
//                       </span>
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {page.map((row, i) => {
//                 prepareRow(row)
//                 return (
//                   <tr key={i} {...row.getRowProps()}>
//                     {row.cells.map((cell, j) => {
//                       return <td key={j} {...cell.getCellProps()} className='align-middle'>{cell.render('Cell')}</td>
//                     })}
//                   </tr>
//                 )
//               })}
//               <tr>
//                 {/* {loading && (<td colSpan={columns.length}>Loading...</td>)}
//                     {!loading && (<td colSpan={columns.length}>Showing {page.length} of ~ {count} results</td>)} */}
//                 {/* {!loading && <td colSpan={columns.length}>Showing {page.length} of ~ {count} results  Showing {page.length} of ~{controlledPageCount * pageSize}{' '} results  </td>} */}
//               </tr>
//             </tbody>
//           </table>}
//       </div>
//       <div className='dataTables_paginate paging_simple_numbers' id='example1_paginate' style={{ marginLeft: 10, marginTop: 10 }}>
//         <ul className='pagination'>
//           <li className={`paginate_button page-item previous ${!canPreviousPage ? 'disabled' : ''}`} id='example1_previous'>
//             <a href='/#' aria-controls='example1' data-dt-idx={0} tabIndex={0} className='page-link' onClick={() => gotoPage(0)}>{'<<'}</a>
//           </li>
//           <li className={`paginate_button page-item ${!canPreviousPage ? 'disabled' : ''}`}><Link aria-controls='example1' data-dt-idx={3} tabIndex={0} className='page-link' onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</Link></li>
//           <li className={`paginate_button page-item ${!canNextPage ? 'disabled' : ''}`}><Link aria-controls='example1' data-dt-idx={4} tabIndex={0} className='page-link' onClick={() => nextPage()}>{'>'}</Link></li>
//           <li className={`paginate_button page-item next ${!canNextPage ? 'disabled' : ''}`} id='example1_next'>
//             <Link aria-controls='example1' data-dt-idx={7} tabIndex={0} className='page-link' onClick={() => gotoPage(pageCount - 1)}>{'>>'}</Link>
//           </li>
//           <li className='paginate_button page-item'>
//             <Link className='page-link'>{pageIndex + 1}/{pageOptions.length}</Link>
//           </li>
//           {/* <li className=''>
//               <div>
//                 | Go to page:{' '}
//                 <input
//                   type='number'
//                   defaultValue={pageIndex + 1}
//                   onChange={e => {
//                     const page = e.target.value ? Number(e.target.value) - 1 : 0
//                     gotoPage(page)
//                   }}
//                   style={{ width: '100px' }}
//                 />
//               </div>
//             </li> */}
//           <li className='paginate_button page-item'>
//             <select
//               style={{ height: 38 }}
//               className='page-link'
//               value={pageSize}
//               onChange={e => {
//                 setPageSize(Number(e.target.value))
//               }}
//             >
//               {[10, 20, 30, 40, 50].map(pageSize => (
//                 <option key={pageSize} value={pageSize}>
//               Tampilkan {pageSize}
//                 </option>
//               ))}
//             </select>
//           </li>
//         </ul>
//       </div>
//       {/* </Styles> */}
//     </>
//   )
// // }
// })

// const _gotoCreateForm = useCallback(() => {
//   console.log('tessss')
// }, [])
// const App = React.memo(props => {
//   const {
//     columns,
//     createHref,
//     tablepaginationFetchData,
//     createNewButtonLabel,
//     whereCondition,
//     cardHeader,
//     tableMenus,
//     cardTitle,
//     cardFooter,
//     distinct,
//     errors,
//     loading,
//     data,
//     count,
//     pageCount,
//     filter
//   } = props
//   const paginationConfig = props.paginationConfig || {}
//   var history = useHistory()
//   // const data = path(['data', paginationConfig.serviceName], props) || []
//   // const count = path(['count', paginationConfig.serviceName], props) || []
//   // const pageCount = path(['pageCount', paginationConfig.serviceName], props) || []

//   // console.log('App begeeeeeeiinnn')
//   // const filter = Immutable.asMutable(path(['filter', paginationConfig.serviceName], props) || {}, { deep: true })

//   const doFetchData = React.useCallback(({ pageSize, pageIndex, filter, whereCondition }) => {
//     console.log('doFetchData filter===>', filter)
//     for (var param in whereCondition) {
//       console.log('paramssss=>' + param + '====>' + whereCondition[param])
//       if (_.isEmpty(whereCondition[param])) {
//         // jika salah satu dari parameter where condition nya kosong, maka jangan dihit
//         return null
//       }
//     }
//     if (!fetchData) return

//     fetchData({
//       fields: paginationConfig.fields,
//       filter,
//       loading,
//       pageSize,
//       pageIndex,
//       serviceName: paginationConfig.serviceName,
//       tablepaginationFetchData,
//       history,
//       whereCondition,
//       distinct
//     })
//   }, [distinct, history, loading, paginationConfig.fields, paginationConfig.serviceName, tablepaginationFetchData])

//   console.log('renderrrrrrrr whereCondition====>', data)
//   // if(loading) return <Loader loading type='rpmerah' />
//   // if(!loading && !_.isEmpty(errors)) return <div class="alert alert-danger" role="alert"><ul>{errors.map((v, i) => <li key={i}>{v.message}</li>)}</ul></div>
//   return (
//     <>
//       <div className='card'>
//         <div className='card-header' data-card-widget='collapse'>
//           {cardTitle && <h3 className='card-title'><T id={cardTitle} /></h3>}
//           {cardHeader && cardHeader()}
//           <div className='card-tools'>
//             <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button>
//             {/* <button type='button' className='btn btn-tool' data-card-widget='remove'><i className='fas fa-times' /></button> */}
//           </div>
//         </div>
//         <div className='card-body p-0'>
//           {!loading && (!tableMenus && createHref) && (<button style={{ marginBottom: 10, marginLeft: 10, marginTop: 10 }} type='button' className='btn btn-info' onClick={() => history.push(createHref)}><i className='fas fa-plus' /> <T id={`${createNewButtonLabel || 'Create New'}`} /></button>)}
//           <Table
//             errors={errors}
//             columns={columns || []}
//             data={Immutable.asMutable(data || [], { deep: true })}
//             fetchData={doFetchData}
//             pageCount={pageCount}
//             count={count}
//             filter={filter}
//             whereCondition={whereCondition}
//             loading={loading}
//           />
//         </div>
//         {cardFooter && <div className='card-footer'>{cardFooter()}</div>}
//       </div>
//     </>
//   )
// })

class TableComp extends PureComponent {
  render () {
    const {
      columns,
      createHref,
      createNewButtonLabel,
      whereCondition,
      cardHeader,
      tableMenus,
      cardTitle,
      // cardFooter,
      distinct,
      loading,
      history,
      listallServiceName,
      fields
    } = this.props
    console.log('galyagalyagalyagalyagalya')
    // const paginationConfig = this.props.paginationConfig || {}
    return (
      <>
        <div className='card'>
          <div className='card-header' data-card-widget='collapse'>
            {cardTitle && <h3 className='card-title'><T id={cardTitle} /></h3>}
            <div className='card-tools'>
              <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button>
              {/* <button type='button' className='btn btn-tool' data-card-widget='remove'><i className='fas fa-times' /></button> */}
            </div>
          </div>
          <div className='card-body p-0'>
            <div style={{ marginBottom: 10, marginLeft: 10, marginTop: 10 }}>
              {!loading && (!tableMenus && createHref) && (<button style={{ marginRight: 5 }} type='button' className='btn btn-info' onClick={() => history.push(createHref)}><i className='fas fa-plus' /> <T id={`${createNewButtonLabel || 'Create New'}`} /></button>)}
              {cardHeader && cardHeader()}
            </div>
            <TableCon
              columns={columns}
              listallServiceName={listallServiceName}
              fields={fields}
              history={history}
              whereCondition={whereCondition}
              distinct={distinct}
            />
            {/* <Table
              errors={errors}
              columns={columns || []}
              data={Immutable.asMutable(data || [], { deep: true })}
              fetchData={this.doFetchData}
              pageCount={pageCount}
              count={count}
              filter={filter}
              whereCondition={whereCondition}
              loading={loading}
            /> */}
          </div>
          {/* {cardFooter && <div className='card-footer'>{cardFooter()}</div>} */}
        </div>
      </>
    )
  }
}

// class Index extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       pageCount: 0
//     }
//     this.doFetchData = this.doFetchData.bind(this)
//   }

//   doFetchData ({ pageSize, pageIndex }) {
//     const { paginationConfig, tablepaginationFetchData } = this.props
//     const filter = path(['filter', paginationConfig.serviceName], this.props) || {}
//     const loading = path(['loading', paginationConfig.serviceName], this.props)
//     fetchData({
//       fields: paginationConfig.fields,
//       filter,
//       loading,
//       pageSize,
//       pageIndex,
//       serviceName: paginationConfig.serviceName,
//       tablepaginationFetchData
//     })
//   }

//   render () {
//     const {
//       columns,
//       paginationConfig,
//       history
//     } = this.props
//     const loading = path(['loading', paginationConfig.serviceName], this.props)
//     const data = path(['data', paginationConfig.serviceName], this.props) || []
//     const count = path(['count', paginationConfig.serviceName], this.props) || []
//     const pageCount = path(['pageCount', paginationConfig.serviceName], this.props) || []
//     return (
//       <div className='card'>
//         <div className='card-header'>
//           <button type='button' className='btn btn-info' onClick={() => history.push('/home')}><i className='fas fa-plus' /> Create New</button>
//         </div>
//         <div className='card-body'>
//           <Styles>
//             <Table
//               columns={columns}
//               data={Immutable.asMutable(data, { deep: true })}
//               fetchData={this.doFetchData}
//               loading={loading}
//               pageCount={pageCount}
//               count={count}
//             />
//           </Styles>
//         </div>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   const errors = (state.tablepagination.errors || {})[(ownProps.paginationConfig || {}).serviceName] || []
//   const loading = (state.tablepagination.loading || {})[(ownProps.paginationConfig || {}).serviceName] || false
//   const data = (state.tablepagination.data || {})[(ownProps.paginationConfig || {}).serviceName] || []
//   const count = (state.tablepagination.count || {})[(ownProps.paginationConfig || {}).serviceName] || 0
//   const pageCount = (state.tablepagination.pageCount || {})[(ownProps.paginationConfig || {}).serviceName] || 0
//   const filter = Immutable.asMutable((state.tablepagination.filter || {})[(ownProps.paginationConfig || {}).serviceName] || {}, { deep: true })

//   const props = {
//     count,
//     data,
//     filter,
//     loading: loading,
//     pageCount,
//     pageSize: state.tablepagination.pageSize,
//     pageIndex: state.tablepagination.pageIndex,
//     errors
//   }
//   console.log('mapStateToProps=====', props)
//   return props
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     tablepaginationFetchData: data => dispatch(TablepaginationActions.tablepaginationFetchData(data))
//     //   resetForm: data => dispatch(LoginActions.loginReset(data)),
//   }
// }

// export default injectIntl(TableComp)
export default injectIntl((props) => {
  var history = useHistory()
  return <TableComp history={history} {...props} />
})

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(injectIntl(TableComp))
