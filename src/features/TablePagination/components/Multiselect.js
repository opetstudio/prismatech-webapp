import React, { Component, memo, useCallback, useState } from 'react'
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

function Multiselect ({ isCreatableSelect, serviceName, tablepaginationOnChangeFilter, isAutocomplete, label, onChange, defaultValue, name, id, optionColumnValue, optionColumnLabel, columns, data, fetchData, loading, pageCount: controlledPageCount, count, filter }) {
  const [inputValue, setInputValue] = useState('')
  // fetchData({ pageIndex, pageSize })
  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    // console.log('react effect========pageIndex=', pageIndex)
    // console.log('react effect========pageSize=', pageSize)
    fetchData({ filter })
  }, [fetchData, inputValue])

  console.log('loading===>', loading)
  console.log('serviceName===>', serviceName)
  if (typeof loading === 'undefined' || loading === 'undefined' || loading) {
    console.log('jangan render')
    return null
  }
  console.log('silahkan render')
  if (isAutocomplete) {
    const options = (data.concat(defaultValue) || []).map((v, i) => {
      if (v) {
        const val = { value: v[optionColumnValue], label: v[optionColumnLabel] }
        return val
      }
      return { value: '-', label: '-' }
    })
    const optionsDefaultValue = defaultValue.map((v, i) => ({ value: v[optionColumnValue], label: v[optionColumnLabel] }))
    console.log('options=====>', options)
    console.log('defaultValue=====>', defaultValue)
    console.log('isCreatableSelect===>', isCreatableSelect)
    console.log('label===>', label)
    
    if (isCreatableSelect) {
      console.log('optionsDefaultValue===>', optionsDefaultValue)
      return (
        <div className='form-group'>
          <label>{label}</label>
          <CreatableSelect
            defaultValue={optionsDefaultValue}
            isMulti
            name='colors'
            options={options}
            className='basic-multi-select'
            classNamePrefix='select'
            onChange={(selectedOption) => {
              // console.log('handleOnChange', selectedOption)
              // var options = e.target.options
              // var value = []
              // for (var i = 0, l = options.length; i < l; i++) {
              //   if (options[i].selected) {
              //     value.push(options[i].value)
              //   }
              // }
              // // this.props.someCallback(value)
              // console.log('valueeee=======>', value)
              onChange(selectedOption.map(v => v.value))
            }}
            onInputChange={(inputValue, actionMeta) => {
              console.log('inputValue', inputValue)
              console.log('actionMeta', actionMeta)
              // set filter string_to_search = inputValue
              setInputValue(inputValue)
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
            isMulti
            name='colors'
            options={options}
            className='basic-multi-select'
            classNamePrefix='select'
            onChange={(selectedOption) => {
              // console.log('handleOnChange', selectedOption)
              // var options = e.target.options
              // var value = []
              // for (var i = 0, l = options.length; i < l; i++) {
              //   if (options[i].selected) {
              //     value.push(options[i].value)
              //   }
              // }
              // // this.props.someCallback(value)
              // console.log('valueeee=======>', value)
              if (selectedOption) onChange(selectedOption.map(v => v.value))
              else {
                onChange([])
              }
            }}
            onInputChange={(inputValue, actionMeta) => {
              console.log('inputValue', inputValue)
              console.log('actionMeta', actionMeta)
              // set filter string_to_search = inputValue
              setInputValue(inputValue)
              tablepaginationOnChangeFilter({ serviceName: serviceName, fieldName: 'string_to_search', fieldValue: inputValue })
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
          console.log('valueeee=======>', value)
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
    tablepaginationOnChangeFilter
  } = props
  const history = useHistory()
  const loading = path(['loading', serviceName], props)
  const data = path(['data', serviceName], props) || []
  const count = path(['count', serviceName], props) || []
  const pageCount = path(['pageCount', serviceName], props) || []

  console.log('App begeeeeeeiinnn')
  const filter = path(['filter', serviceName], props) || {}

  const doFetchData = React.useCallback(({ filter }) => {
    console.log('doFetchData filter===>', filter)
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
  }, [])

  return (
    <>
      <Multiselect
        loading={loading}
        defaultValue={Immutable.asMutable(defaultValue, { deep: true })}
        name={name}
        id={id}
        data={Immutable.asMutable(data, { deep: true })}
        fetchData={doFetchData}
        optionColumnValue={optionColumnValue}
        optionColumnLabel={optionColumnLabel}
        fields={fields}
        filter={filter}
        onChange={onChange}
        label={label}
        isAutocomplete={isAutocomplete}
        isCreatableSelect={isCreatableSelect}
        tablepaginationOnChangeFilter={tablepaginationOnChangeFilter}
        serviceName={serviceName}
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
const mapStateToProps = (state, ownProps) => {
  return {
    count: state.tablepagination.count,
    data: state.tablepagination.data,
    filter: state.tablepagination.filter,
    loading: state.tablepagination.loading,
    pageCount: state.tablepagination.pageCount,
    pageSize: state.tablepagination.pageSize,
    pageIndex: state.tablepagination.pageIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tablepaginationFetchData: data => dispatch(TablepaginationActions.tablepaginationFetchData(data)),
    tablepaginationOnChangeFilter: data => dispatch(TablepaginationActions.tablepaginationOnChangeFilter(data))
    //   resetForm: data => dispatch(LoginActions.loginReset(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(App))
