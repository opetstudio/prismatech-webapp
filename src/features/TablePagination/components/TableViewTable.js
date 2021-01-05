import React, { PureComponent } from 'react'
import Loader from '../../../Components/Loader/Loader'
import PaginationNav from './PaginationNav'

export default class TableViewTable extends PureComponent {
  render () {
    const {
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
    } = this.props
    return (
      <>
        <div className='table-responsive'>
          {loading && <Loader loading type='rpmerah' />}
          {!loading && errors && <div class='alert alert-danger' role='alert'><ul>{errors.map((v, i) => <li key={i}>{v.message}</li>)}</ul></div>}
          {data &&
            <table className='table m-0 table-striped table-sm' {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup, i) => (
                  <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, j) => (
                      <th key={j} {...column.getHeaderProps()}>
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row)
                  return (
                    <tr key={i} {...row.getRowProps()}>
                      {row.cells.map((cell, j) => {
                        return <td key={j} {...cell.getCellProps()} className='align-middle'>{cell.render('Cell')}</td>
                      })}
                    </tr>
                  )
                })}
                <tr>
                  {/* {loading && (<td colSpan={columns.length}>Loading...</td>)}
                                {!loading && (<td colSpan={columns.length}>Showing {page.length} of ~ {count} results</td>)} */}
                  {/* {!loading && <td colSpan={columns.length}>Showing {page.length} of ~ {count} results  Showing {page.length} of ~{controlledPageCount * pageSize}{' '} results  </td>} */}
                </tr>
              </tbody>
            </table>}
        </div>
        <PaginationNav
          canPreviousPage={canPreviousPage}
          gotoPage={gotoPage}
          canNextPage={canNextPage}
          previousPage={previousPage}
          nextPage={nextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          pageSize={pageSize}
          setPageSize={setPageSize}
          withPageSize
        />
      </>
    )
  }
}
