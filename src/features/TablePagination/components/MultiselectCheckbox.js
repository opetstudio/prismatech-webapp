import React, { Children } from 'react'
import { useHistory } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import TableCon from '../containers/TableCon'
import TableViewTable from '../components/TableViewTable'

function TableViewCombobox (props) {
  const {
    // From Page
    optionsDefaultValue,
    label,
    listallServiceName,
    // inputValue,
    // placeholder,
    // onChange,
    // from TableCon
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
    columns,
    objectKey
    // setPageSize
  } = props
  return (
    <>
      <button type='button' class='btn btn-default' data-toggle='modal' data-target={'#modal-combobox-listitem-table' + listallServiceName}>
        {label}
      </button>
      <br />
      <br />
      <div className='table-responsive'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              {columns.map((v, i) => <th key={i}>{v.Header}</th>)}
              {/* <th style={{ width: 40 }} /> */}
            </tr>
          </thead>
          <tbody>
            {optionsDefaultValue.filter(v => v.checked).map((v, i) => {
              return (
                <tr key={i}>
                  {columns.map((v2, i2) => (<td key={i2}>{typeof v2.accessor === 'string' ? v[objectKey][v2.accessor] : v2.accessor(v[objectKey])}</td>))}
                </tr>)
            })}
          </tbody>
        </table>
      </div>
      <div className='modal fade bd-example-modal-lg' id={'modal-combobox-listitem-table' + listallServiceName} aria-hidden='true' style={{ display: 'none' }}>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-body'>
              <TableViewTable
                loading={loading}
                errors={errors}
                data={data}
                headerGroups={headerGroups}
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                page={page}
                prepareRow={prepareRow}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageIndex={pageIndex}
                pageOptions={pageOptions}
                gotoPage={gotoPage}
                pageCount={pageCount}
                previousPage={previousPage}
                nextPage={nextPage}
                pageSize={pageSize}
                setPageSize
              />
            </div>
            <div className='modal-footer justify-content-between'>
              <button id='buttonCloseModal' type='button' className='btn btn-success' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const TableConMemo = React.memo(props => {
  const { distinct, children, columns, listallServiceName, fields, history, whereCondition } = props
  return (
    <TableCon
      columns={columns}
      listallServiceName={listallServiceName}
      fields={fields}
      history={history}
      whereCondition={whereCondition}
      distinct={distinct}
    >
      {children}
    </TableCon>
  )
})

function Combobox (props) {
  console.log('Combobox=====', props)
  // const [currentSelect, setCurrentSelect] = useState(null)
  const {
    getColumns,
    whereCondition,
    distinct,
    history,
    // serviceName,
    // upsertServiceName,
    listallServiceName,
    fields,
    onChange,
    defaultValue,
    optionColumnLabel,
    label,
    optionColumnValue,
    inputValue,
    placeholder,
    objectKey
  } = props
  return (
    <TableConMemo
      columns={[
        ...getColumns({ onChange, defaultValue, objectKey })
      ]}
      listallServiceName={listallServiceName}
      fields={fields}
      history={history}
      whereCondition={whereCondition}
      distinct={distinct}
    >
      <TableViewCombobox
        objectKey={objectKey}
        label={label}
        listallServiceName={listallServiceName}
        optionsDefaultValue={defaultValue}
        inputValue={inputValue}
        placeholder={placeholder}
        onChange={onChange}
        optionColumnValue={optionColumnValue}
        optionColumnLabel={optionColumnLabel}
      />
    </TableConMemo>
  )
}
export default injectIntl((props) => {
  var history = useHistory()
  return <Combobox history={history} {...props} />
})
