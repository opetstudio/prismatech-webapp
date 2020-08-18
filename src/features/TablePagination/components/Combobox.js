import React, { Component, memo, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
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

function Combobox ({ label, onChange, defaultValue, name, id, child, optionColumnValue, optionColumnLabel, columns, data, fetchData, loading, pageCount: controlledPageCount, count, filter }) {
  // fetchData({ pageIndex, pageSize })
  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    // console.log('react effect========pageIndex=', pageIndex)
    // console.log('react effect========pageSize=', pageSize)
    fetchData({ filter })
  }, [fetchData])

  // Render the UI for your table
  return (
    <select name={name} id={id} className='form-control' onChange={e => onChange(e)}>
      <option key='-'> --select {label}-- </option>
      {data.map((v, i) => <option key={i} value={v[optionColumnValue]} selected={defaultValue === v[optionColumnValue]}>{v[optionColumnLabel]}</option>)}
    </select>
  )
}

function App (props) {
  const {
    columns,
    paginationConfig,
    createHref,
    tablepaginationFetchData,
    createNewButtonLabel,
    fetchDataConfig: { whereCondition, fields, serviceName },
    cardHeader,
    tableMenus,
    cardTitle,
    cardFooter,
    distinct,
    maxOptions,
    child,
    optionColumnLabel,
    optionColumnValue,
    name,
    id,
    defaultValue,
    onChange,
    label
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
      <Combobox
        defaultValue={defaultValue}
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
    tablepaginationFetchData: data => dispatch(TablepaginationActions.tablepaginationFetchData(data))
    //   resetForm: data => dispatch(LoginActions.loginReset(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(App))
