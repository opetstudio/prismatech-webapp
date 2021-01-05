import React, { PureComponent } from 'react'
// import { Link } from 'react-router-dom'

export default class PaginationNav extends PureComponent {
  render () {
    const {
      canPreviousPage,
      gotoPage,
      canNextPage,
      previousPage,
      nextPage,
      pageCount,
      pageIndex,
      pageOptions,
      pageSize,
      setPageSize,
      withPageSize
    } = this.props
    return (
      <div className='dataTables_paginate paging_simple_numbers' id='example1_paginate' style={{ marginLeft: 10, marginTop: 10 }}>
        <ul className='pagination'>
          <li className={`paginate_button page-item previous ${!canPreviousPage ? 'disabled' : ''}`} id='example1_previous'>
            <button type='button' aria-controls='example1' data-dt-idx={0} tabIndex={0} className='page-link' onClick={() => gotoPage(0)}>{'<<'}</button>
          </li>
          <li className={`paginate_button page-item ${!canPreviousPage ? 'disabled' : ''}`}><button type='button' aria-controls='example1' data-dt-idx={3} tabIndex={0} className='page-link' onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button></li>
          <li className={`paginate_button page-item ${!canNextPage ? 'disabled' : ''}`}><button type='button' aria-controls='example1' data-dt-idx={4} tabIndex={0} className='page-link' onClick={() => nextPage()}>{'>'}</button></li>
          <li className={`paginate_button page-item next ${!canNextPage ? 'disabled' : ''}`} id='example1_next'>
            <button type='button' aria-controls='example1' data-dt-idx={7} tabIndex={0} className='page-link' onClick={() => gotoPage(pageCount - 1)}>{'>>'}</button>
          </li>
          <li className='paginate_button page-item'>
            <button type='button' className='page-link'>{pageIndex + 1}/{(pageOptions.length === 0 ? 1 : pageOptions.length)}</button>
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
          {withPageSize &&
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
            </li>}
        </ul>
      </div>
    )
  }
}
