import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export default class TableNavComp extends PureComponent {
  render () {
    const { prepareRow, page, getTableBodyProps, getTableProps, headerGroups, setPageSize, pageSize, pageOptions, pageIndex, pageCount, canPreviousPage, canNextPage, gotoPage, previousPage, nextPage } = this.props
    return (
      <>
        <div className='table-responsive'>
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
          </table>
        </div>
        <div className='dataTables_paginate paging_simple_numbers' id='example1_paginate' style={{ marginLeft: 10, marginTop: 10 }}>
          <ul className='pagination'>
            <li className={`paginate_button page-item previous ${!canPreviousPage ? 'disabled' : ''}`} id='example1_previous'>
              <a href='/#' aria-controls='example1' data-dt-idx={0} tabIndex={0} className='page-link' onClick={() => gotoPage(0)}>{'<<'}</a>
            </li>
            <li className={`paginate_button page-item ${!canPreviousPage ? 'disabled' : ''}`}><Link aria-controls='example1' data-dt-idx={3} tabIndex={0} className='page-link' onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</Link></li>
            <li className={`paginate_button page-item ${!canNextPage ? 'disabled' : ''}`}><Link aria-controls='example1' data-dt-idx={4} tabIndex={0} className='page-link' onClick={() => nextPage()}>{'>'}</Link></li>
            <li className={`paginate_button page-item next ${!canNextPage ? 'disabled' : ''}`} id='example1_next'>
              <Link aria-controls='example1' data-dt-idx={7} tabIndex={0} className='page-link' onClick={() => gotoPage(pageCount - 1)}>{'>>'}</Link>
            </li>
            <li className='paginate_button page-item'>
              <Link className='page-link'>{pageIndex + 1}/{pageOptions.length}</Link>
            </li>
            {/* <li className=''>
                  <div>
                    | Go to page:{' '}
                    <input
                      type='number'
                      defaultValue={pageIndex + 1}
                      onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                      }}
                      style={{ width: '100px' }}
                    />
                  </div>
                </li> */}
            <li className='paginate_button page-item'>
              <select
                style={{ height: 38 }}
                className='page-link'
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                  Tampilkan {pageSize}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>
      </>
    )
  }
}
