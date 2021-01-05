import React from 'react'
import { useHistory } from 'react-router-dom'
// import styled from 'styled-components'
import { path } from 'ramda'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import TablepaginationActions from '../redux'
import Immutable from 'seamless-immutable'

// const Styles = styled.div`
//   padding: 1rem;
//   .pagination {
//     padding: 0.5rem;
//   }
// `

function Combobox ({ getOptionLabel, label, onChange, defaultValue, name, id, child, optionColumnValue, optionColumnLabel, columns, data, fetchData, loading, pageCount: controlledPageCount, count, filter }) {
  // fetchData({ pageIndex, pageSize })
  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    // console.log('react effect========pageIndex=', pageIndex)
    // console.log('react effect========pageSize=', pageSize)
    fetchData({ filter })
  }, [fetchData, filter])

  // Render the UI for your table
  return (
    <select name={name} id={id} className='form-control' onChange={e => onChange(e)}>
      <option key='-'>{label}</option>
      {data.map((v, i) => <option key={i} value={v[optionColumnValue]} selected={defaultValue === v[optionColumnValue]}>{getOptionLabel ? getOptionLabel(v) : v[optionColumnLabel]}</option>)}
    </select>
  )
}

function App (props) {
  const {
    tablepaginationFetchData,
    fetchDataConfig: { whereCondition, fields, serviceName },
    distinct,
    maxOptions,
    optionColumnLabel,
    optionColumnValue,
    getOptionLabel,
    name,
    id,
    defaultValue,
    onChange,
    label
  } = props
  const history = useHistory()
  const data = Immutable.asMutable(path(['data', serviceName], props) || [], { deep: true })
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
  }, [distinct, fields, history, maxOptions, serviceName, tablepaginationFetchData, whereCondition])

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
        getOptionLabel={getOptionLabel}
        fields={fields}
        filter={filter}
        onChange={(e) => onChange(e, data)}
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
