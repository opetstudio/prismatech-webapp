import React, { Component, useEffect, memo, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import _ from 'lodash'
import styled from 'styled-components'
import { path } from 'ramda'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import TablepaginationActions from '../redux'
import Immutable from 'seamless-immutable'

const Styles = styled.div`
  padding: 1rem;
  .pagination {
    padding: 0.5rem;
  }
`

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'strawberry1', label: 'Strawberry' },
//   { value: 'strawberry2', label: 'Strawberry' },
//   { value: 'strawberry3', label: 'Strawberry' },
//   { value: 'strawberry4', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

function App2 ({
  formType,
  tablepaginationFetchData,
  distinct,
  whereCondition,
  history,
  fields,
  maxOptions,
  inputValue,
  setInputValue,
  isCreatableSelect,
  serviceName,
  tablepaginationOnChangeFilter,
  isAutocomplete, label, onChange, defaultValue = [], name, id, optionColumnValue, optionColumnLabel, columns, data: xdata, loading: xloading = {}, pageCount: controlledPageCount = {}, count: xcount = {}, filter: xfilter 
}) {
  console.log('render Multiselect component')
  console.log('defaultValuedefaultValuedefaultValue==>', defaultValue)

  const loading = xloading[serviceName]
  const count = xcount[serviceName] || 0
  const pageCount = controlledPageCount[serviceName] || 0
  const data = Immutable.asMutable(xdata[serviceName] || {}, { deep: true })
  const filter = Immutable.asMutable(xfilter[serviceName] || {}, { deep: true })

  // const [inputValue, setInputValue] = useState('')
  // fetchData({ pageIndex, pageSize })
  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    console.log('react effect========fff')
    // fetchData({ filter })
    tablepaginationFetchData({
      serviceName: serviceName,
      pageSize: maxOptions,
      pageIndex: 0,
      filter: Immutable.asMutable(filter, { deep: true }),
      fields: fields,
      history,
      whereCondition,
      distinct
    })
  }, [tablepaginationFetchData, inputValue])

  // console.log('loading===>', loading)
  // console.log('serviceName===>', serviceName)


  // console.log('silahkan render')
  if (isAutocomplete) {
    if (formType === 'update' && _.isEmpty(inputValue) && _.isEmpty(data)) {
      console.log('jangan render')
      return null
    }
    const options = (_.concat(data || [], defaultValue)).map((v, i) => {
      if (v) {
        const val = { value: v[optionColumnValue], label: v[optionColumnLabel] }
        return val
      }
      return { value: '-', label: '-' }
    })
    const optionsDefaultValue = []
    for (let i = 0; i < defaultValue.length; i++) {
      const v = defaultValue[i]
      if (v) optionsDefaultValue.push({ value: v[optionColumnValue], label: v[optionColumnLabel] })
    }
    // const optionsDefaultValue = defaultValue.map((v, i) => ({ value: v[optionColumnValue], label: v[optionColumnLabel] }))
    // console.log('options=====>', options)
    console.log('optionsDefaultValueoptionsDefaultValue=====>', optionsDefaultValue)
    // console.log('isCreatableSelect===>', isCreatableSelect)
    // console.log('label===>', label)

    if (isCreatableSelect) {
      // console.log('optionsDefaultValue===>', optionsDefaultValue)
      return (
        <div className='form-group'>
          <label>{label}</label>
          <CreatableSelect
            defaultValue={optionsDefaultValue}
            defaultInputValue={inputValue}
            isMulti
            name='colors'
            options={options}
            className='basic-multi-select'
            classNamePrefix='select'
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
              if (selectedOption) onChange(selectedOption.map(v => v.value), selectedOption.map(v => ({ [optionColumnValue]: v.value, [optionColumnLabel]: v.label })))
            }}
            onInputChange={(inputValue, actionMeta) => {
              // console.log('inputValue', inputValue)
              // console.log('actionMeta', actionMeta)
              // set filter string_to_search = inputValue
              // setInputValue(inputValue)
              tablepaginationOnChangeFilter({ serviceName: serviceName, fieldName: 'string_to_search', fieldValue: inputValue })
            }}
            isSearchable
          />
        </div>
      )
    } else {
      return (
        <div className='form-group'>
          <label>{label}</label>
          <Select
            defaultValue={optionsDefaultValue}
            defaultInputValue={inputValue}
            isMulti
            name='colors'
            options={options}
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
              if (selectedOption) onChange(selectedOption.map(v => v.value), selectedOption.map(v => ({ [optionColumnValue]: v.value, [optionColumnLabel]: v.label })))
              else {
                // onChange([])
              }
            }}
            onInputChange={(iv, actionMeta) => {
              console.log('inputValue', iv)
              // console.log('actionMeta', actionMeta)
              // set filter string_to_search = inputValue
              // setInputValue(iv)
              tablepaginationOnChangeFilter({ serviceName: serviceName, fieldName: 'string_to_search', fieldValue: iv })
            }}
            isSearchable
          />
        </div>
      )
    }
  }

  return (
    <div className='form-group'>
      <label>{label}</label>
      <select
        multiple
        className='form-control'
        id={id}
        onChange={e => {
          var options = e.target.options
          var value = []
          for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
              value.push(options[i].value)
            }
          }
          // this.props.someCallback(value)
          // console.log('valueeee=======>', value)
          onChange(value)
        }}
      >
        {data.map((v, i) => <option key={i} value={v[optionColumnValue]} selected={_.find(defaultValue, { _id: v[optionColumnValue] })}>{v[optionColumnLabel]}</option>)}
      </select>
    </div>

  )

  // Render the UI for your table
  // return (
  //   <select name={name} id={id} className='form-control' onChange={e => onChange(e)}>
  //     <option key='-'> --select {label}-- </option>
  //     {data.map((v, i) => <option key={i} value={v[optionColumnValue]} selected={defaultValue === v[optionColumnValue]}>{v[optionColumnLabel]}</option>)}
  //   </select>
  // )
}

const mapStateToProps = (state, ownProps) => {
  return {
    // count: state.tablepagination.count,
    data: state.tablepagination.data,
    filter: state.tablepagination.filter,
    loading: state.tablepagination.loading
    // pageCount: state.tablepagination.pageCount,
    // pageSize: state.tablepagination.pageSize,
    // pageIndex: state.tablepagination.pageIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tablepaginationFetchData: data => dispatch(TablepaginationActions.tablepaginationFetchData(data)),
    tablepaginationOnChangeFilter: data => dispatch(TablepaginationActions.tablepaginationOnChangeFilter(data))
    //   resetForm: data => dispatch(LoginActions.loginReset(data)),
  }
}

const Multiselect = connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(App2))

function App (props) {
  const {
    tablepaginationFetchData,
    fetchDataConfig: { whereCondition, fields, serviceName },
    distinct,
    maxOptions,
    optionColumnLabel,
    optionColumnValue,
    name,
    id,
    defaultValue,
    onChange,
    label,
    isAutocomplete,
    isCreatableSelect,
    tablepaginationOnChangeFilter,
    formType
  } = props
  const history = useHistory()
  // const loading = path(['loading', serviceName], props)
  // const data = path(['data', serviceName], props) || []
  // const count = path(['count', serviceName], props) || []
  // const pageCount = path(['pageCount', serviceName], props) || []

  // const [defaultValueComponent, setDefaultValueComponent] = React.useState([])
  const [inputValue, setInputValue] = useState('')

  console.log('render Multiselect inputValue===>', inputValue)
  console.log('render Multiselect defaultValue===>', defaultValue)

  // useEffect(() => {
  //   setDefaultValueComponent(Immutable.asMutable(defaultValue || [], { deep: true }))
  // }, [defaultValue])

  // console.log('App begeeeeeeiinnn')
  // const data = path(['data', serviceName], props) || []
  // const count = path(['count', serviceName], props) || []
  // const pageCount = path(['pageCount', serviceName], props) || []
  // const filter = path(['filter', serviceName], props) || {}

  // const doFetchData = React.useCallback(({ filter }) => {
  //   console.log('doFetchData filter===>', filter)
  //   tablepaginationFetchData({
  //     serviceName: serviceName,
  //     pageSize: maxOptions,
  //     pageIndex: 0,
  //     filter: Immutable.asMutable(filter, { deep: true }),
  //     fields: fields,
  //     history,
  //     whereCondition,
  //     distinct
  //   })
  // }, [])

  return (
    <>
      <Multiselect
        // loading={loading}
        defaultValue={defaultValue}
        // defaultValue={defaultValueComponent}
        // setInputValue={setInputValue}
        // inputValue={inputValue}
        name={name}
        id={id}
        // data={Immutable.asMutable(data, { deep: true })}
        optionColumnValue={optionColumnValue}
        optionColumnLabel={optionColumnLabel}
        fields={fields}
        // filter={filter}
        onChange={(val, forDefaultValue) => {
          console.log('valvalvalvla===>', val)
          console.log('valvalvalvla===>', forDefaultValue)
          // setDefaultValueComponent(forDefaultValue)
          onChange(val, forDefaultValue)
        }}
        label={label}
        isAutocomplete={isAutocomplete}
        isCreatableSelect={isCreatableSelect}
        serviceName={serviceName}
        maxOptions={maxOptions}
        history={history}
        whereCondition={whereCondition}
        distinct={distinct}
        formType={formType}
      />
      {/* <Styles>
        <Combobox
          columns={columns}
          data={Immutable.asMutable(data, { deep: true })}
          fetchData={doFetchData}
          loading={loading}
          pageCount={pageCount}
          count={count}
          filter={filter}
          child={child}
        />
      </Styles> */}
    </>
  )
}

export default App
