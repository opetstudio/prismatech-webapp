import React from 'react'
import { useHistory } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import TableCon from '../containers/TableCon'
import TableViewTable from '../components/TableViewTable'

function TableViewCombobox (props) {
  const {
    // From Page
    optionColumnValue,
    optionColumnLabel,
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
    pageSize
    // setPageSize
  } = props
  const defaultVal = data.filter(v => optionsDefaultValue === '' + v[optionColumnValue])
  return (
    <>
      <button type='button' class='btn btn-default' data-toggle='modal' data-target={'#modal-combobox-listitem-table' + listallServiceName}>
        {(defaultVal[0] || {})[optionColumnLabel] || label}
      </button>
      <div className='modal fade bd-example-modal-lg' id={'modal-combobox-listitem-table' + listallServiceName} aria-hidden='true' style={{ display: 'none' }}>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
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
        </div>
      </div>
    </>
  )
}

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
    labelButton,
    labelColumn,
    optionColumnValue,
    inputValue,
    placeholder
  } = props
  return (
    <TableCon
      columns={[
        ...getColumns({ onChange }),
        { Header: labelColumn, accessor: p => <button type='button' class='btn btn-default' data-dismiss='modal' onClick={() => { onChange({ val: p[optionColumnValue], originalValue: p }) }}>{labelButton}</button> }
      ]}
      listallServiceName={listallServiceName}
      fields={fields}
      history={history}
      whereCondition={whereCondition}
      distinct={distinct}
    >
      <TableViewCombobox
        label={label}
        listallServiceName={listallServiceName}
        optionsDefaultValue={defaultValue}
        inputValue={inputValue}
        placeholder={placeholder}
        onChange={onChange}
        optionColumnValue={optionColumnValue}
        optionColumnLabel={optionColumnLabel}
      />
    </TableCon>
  )
}
export default injectIntl((props) => {
  var history = useHistory()
  return <Combobox history={history} {...props} />
})
