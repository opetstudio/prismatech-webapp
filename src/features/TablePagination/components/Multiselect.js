import React from 'react'
import { useHistory } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import { injectIntl } from 'react-intl'
// import Immutable from 'seamless-immutable'
import Select, { components } from 'react-select'
import TableCon from '../containers/TableCon'
import PaginationNav from './PaginationNav'

const menuHeaderStyle = {
  padding: '8px 12px',
  background: '#0052CC',
  color: 'white'
}

const MenuList = ({ navigation, selectProps }) => {
  return (
    <components.MenuList {...selectProps}>
      <div style={menuHeaderStyle}>
        <PaginationNav {...navigation} />
      </div>
      {selectProps.children}
    </components.MenuList>
  )
}

function TableViewMultiselect (props) {
  const {
    // loading,
    // errors,
    // data,
    // headerGroups,
    // getTableProps,
    // getTableBodyProps,
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
    setPageSize,
    optionColumnValue,
    optionColumnLabel,
    payloadValue,
    defaultValueOriginal,
    payloadValueOriginal,
    inputValue,
    placeholder,
    onChange,
    isCreatableSelect
  } = props
  let options = page.map((row, i) => {
    prepareRow(row)
    const v = row.original
    return { value: '' + v[optionColumnValue], label: v[optionColumnLabel] }
  })
  // const defaultVal = options.filter(v => optionsDefaultValue.includes('' + v.value))
  // const defValue = (defaultValueOriginal || []).map(v => ({ value: '' + v[optionColumnValue], label: v[optionColumnLabel] }))

  // defaultValue={typeof payload.privilege_id !== 'undefined' ? payload.privilege_id : (privilegeIds || []).map(v => '' + v._id)}
  // defaultValueOriginal={typeof payload.privilege_id !== 'undefined' ? (privilegeIds || []).map(v => v => ({ value: '' + v._id, label: v.name })).filter(v => payload.privilege_id.includes(v._id)) : (privilegeIds || []).map(v => v => ({ value: '' + v._id, label: v.name }))}
  let defVal = (defaultValueOriginal || []).map(v => ({ value: '' + v[optionColumnValue], label: v[optionColumnLabel] }))
  console.log('optionsoptionsoptions1=>', options)
  if (typeof payloadValue !== 'undefined') {
    // options = options.concat((defaultValueOriginal || []).filter(v => options.map(v => '' + v.value).includes(v[optionColumnValue])).map(v => ({ value: '' + v[optionColumnValue], label: v[optionColumnLabel] })))
    // let optId = options.map(v => '' + v.value)
    // console.log('optId=>', optId)
    // const filtered = (payloadValueOriginal || []).filter(v => optId.includes('' + v[optionColumnLabel]))
    // console.log('filtered=>', filtered)
    // const filteredOpt = filtered.map(v => ({ value: '' + v[optionColumnValue], label: v[optionColumnLabel] }))
    // console.log('filteredOpt=>', filteredOpt)
    options = options.concat(payloadValueOriginal.map(v => ({ value: '' + v[optionColumnValue], label: v[optionColumnLabel] })))
    options = options.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.value === thing.value
      ))
    )
    // optId = options.map(v => '' + v.value)
    // console.log('optId2=>', optId)
    // console.log('optionsoptionsoptions2=>', options)
    // console.log('optionsDefaultValue=>', payloadValue)
    // console.log('payloadValueOriginal=>', payloadValueOriginal)
    // console.log('optionColumnValue=>', optionColumnValue)
    defVal = options.filter(v => payloadValue.includes(v.value))
    console.log('defVal=>', defVal)
  }
  if (options.length < 1) return null
  if (isCreatableSelect) {
    return (
      <CreatableSelect
        value={defVal}
        defaultInputValue={inputValue}
        isMulti
        name='colors'
        placeholder={placeholder}
        options={options}
        className='basic-multi-select'
        classNamePrefix='selectss'
        onChange={(selectedOption) => {
          console.log('handleOnChangeeeeee', selectedOption)
          // var options = e.target.options
          // var value = []
          // for (var i = 0, l = options.length; i < l; i++) {
          //   if (options[i].selected) {
          //     value.push(options[i].value)
          //   }
          // }
          // // this.props.someCallback(value)
          // const value = selectedOption.map(v => v.value)
          // console.log('valueeee=====xxxx==>', value)
          // onChange(value)
          let val = []
          let valueOriginal = []
          if (selectedOption) {
            val = selectedOption.map(v => v.value)
            valueOriginal = selectedOption.map(v => ({ [optionColumnValue]: v.value, [optionColumnLabel]: v.label }))
          }
          onChange({ val: val, valueOriginal: valueOriginal })
        }}
        onInputChange={(inputValue, actionMeta) => {
          // console.log('inputValue', inputValue)
          // console.log('actionMeta', actionMeta)
          // set filter string_to_search = inputValue
          // setInputValue(inputValue)
          // tablepaginationOnChangeFilter({ serviceName: serviceName, fieldName: 'string_to_search', fieldValue: inputValue })
        }}
        isSearchable
      />)
  }
  return (
    <>
      <Select
        value={defVal}
        defaultInputValue={inputValue}
        isMulti
        name='colors'
        placeholder={placeholder}
        options={options}
        components={{
          MenuList: (pr) => MenuList({
            navigation: {
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
              withPageSize: false
            },
            selectProps: pr
          })
        }}
        className='basic-multi-select'
        classNamePrefix='select'
        onChange={(selectedOption) => {
          console.log('handleOnChange', selectedOption)
          // var options = e.target.options
          // var value = []
          // for (var i = 0, l = options.length; i < l; i++) {
          //   if (options[i].selected) {
          //     value.push(options[i].value)
          //   }
          // }
          // // this.props.someCallback(value)
          // console.log('valueeee=======>', value)
          if (selectedOption) onChange({ val: selectedOption.map(v => v.value), valueOriginal: selectedOption.map(v => ({ [optionColumnValue]: v.value, [optionColumnLabel]: v.label })) })
          else {
            // onChange([])
          }
        }}
        onInputChange={(iv, actionMeta) => {
          console.log('inputValue', iv)
          // console.log('actionMeta', actionMeta)
          // set filter string_to_search = inputValue
          // setInputValue(iv)
          // tablepaginationOnChangeFilter({ serviceName: serviceName, fieldName: 'string_to_search', fieldValue: iv })
        }}
        isSearchable
      />
    </>
  )
}

function Multiselect (props) {
  const {
    getColumns,
    whereCondition,
    distinct,
    history,
    listallServiceName,
    fields,
    onChange,
    payloadValue,
    defaultValueOriginal,
    payloadValueOriginal,
    // label,
    labelButton,
    labelColumn,
    optionColumnLabel,
    optionColumnValue,
    inputValue,
    placeholder,
    isCreatableSelect
  } = props
  console.log('defaultValuedefaultValuedefaultValuedefaultValue=>', payloadValue)
  return (
    <>
      <TableCon
        columns={[
          { Header: labelColumn, accessor: p => <button type='button' class='btn btn-default' data-dismiss='modal' onClick={() => { onChange({ val: p[optionColumnValue] }) }}>{labelButton}</button> },
          ...getColumns({ onChange })
        ]}
        listallServiceName={listallServiceName}
        fields={fields}
        history={history}
        whereCondition={whereCondition}
        distinct={distinct}
      >
        <TableViewMultiselect
          payloadValue={payloadValue}
          defaultValueOriginal={defaultValueOriginal}
          payloadValueOriginal={payloadValueOriginal}
          inputValue={inputValue}
          placeholder={placeholder}
          onChange={onChange}
          optionColumnValue={optionColumnValue}
          optionColumnLabel={optionColumnLabel}
          isCreatableSelect={isCreatableSelect}
        />
      </TableCon>
    </>
  )
}
// export default Multiselect
export default injectIntl((props) => {
  var history = useHistory()
  const [payloadValueOriginal, setPayloadValueOriginal] = React.useState([])
  const onChange = (v) => {
    setPayloadValueOriginal(v.valueOriginal)
    props.onChange(v)
  }
  return <Multiselect history={history} {...props} onChange={onChange} payloadValueOriginal={payloadValueOriginal} />
})
