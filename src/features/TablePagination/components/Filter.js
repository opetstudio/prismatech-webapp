import React, { Component, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { path } from 'ramda'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import TablepaginationActions from '../redux'
import { fetchData } from '../functions'

function CardBody ({ tablepaginationOnChangeFilter, child, filter }) {
  // React.useEffect(() => {
  //   fetchData({ id })
  // }, [filter])
  return child(tablepaginationOnChangeFilter, filter)
}
function Filter (props) {
  const {
    paginationConfig,
    tablepaginationFetchData,
    child,
    tablepaginationOnChangeFilter,
    tablepaginationResetFilter
  } = props
  const loading = path(['loading', paginationConfig.serviceName], props)
  const pageSize = path(['pageSize', paginationConfig.serviceName], props)
  const pageIndex = path(['pageIndex', paginationConfig.serviceName], props)
  const filter = path(['filter', paginationConfig.serviceName], props) || {}

  useEffect(() => {
    window.collapseBoxRefresh()
  })

  return (
    <form role='form' onSubmit={e => { e.preventDefault() }}>
      <div className='card'>
        <div className='card-header'>
          <h3 className='card-title'>Filter</h3>
          <div className='card-tools'>
            <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button>
            {/* <button type='button' className='btn btn-tool' data-card-widget='remove'><i className='fas fa-times' /></button> */}
          </div>
        </div>

        <div className='card-body'>
          <CardBody tablepaginationOnChangeFilter={tablepaginationOnChangeFilter} filter={filter} child={child} />
          {/* {child(tablepaginationOnChangeFilter, filter)} */}
        </div>
        <div className='card-footer'>
          <button style={{ width: 100 }} type='button' className='btn bg-gradient-warning' onClick={() => { tablepaginationResetFilter({ serviceName: paginationConfig.serviceName }) }}>Reset</button>
          <button
            style={{ width: 100, marginLeft: 5 }} type='button' className='btn bg-gradient-primary' onClick={(e) => fetchData({
              fields: paginationConfig.fields,
              filter,
              loading,
              pageSize,
              pageIndex,
              serviceName: paginationConfig.serviceName,
              tablepaginationFetchData
            })}
          >Submit
          </button>
        </div>
      </div>
    </form>
  )
}
// class Filter extends Component {
//   render () {
//     const {
//       paginationConfig,
//       tablepaginationFetchData,
//       child,
//       tablepaginationOnChangeFilter,
//       tablepaginationResetFilter
//     } = this.props
//     const loading = path(['loading', paginationConfig.serviceName], this.props)
//     const pageSize = path(['pageSize', paginationConfig.serviceName], this.props)
//     const pageIndex = path(['pageIndex', paginationConfig.serviceName], this.props)
//     const filter = path(['filter', paginationConfig.serviceName], this.props) || {}

//     return (
//       <div className='card'>
//         <div className='card-header'>
//           <h3 className='card-title'>Filter</h3>
//         </div>
//         <form role='form'>
//           <div className='card-body'>
//             <CardBody tablepaginationOnChangeFilter={tablepaginationOnChangeFilter} filter={filter} child={child} />
//             {/* {child(tablepaginationOnChangeFilter, filter)} */}
//           </div>
//           <div className='card-footer'>
//             <button style={{ width: 100 }} type='button' className='btn bg-gradient-warning' onClick={() => { tablepaginationResetFilter({ serviceName: paginationConfig.serviceName }) }}>Reset</button>
//             <button
//               ref='buttonSubmit'
//               style={{ width: 100, marginLeft: 5 }} type='button' className='btn bg-gradient-primary' onClick={(e) => fetchData({
//                 fields: paginationConfig.fields,
//                 filter,
//                 loading,
//                 pageSize,
//                 pageIndex,
//                 serviceName: paginationConfig.serviceName,
//                 tablepaginationFetchData
//               })}
//             >Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }

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
    tablepaginationOnChangeFilter: data => dispatch(TablepaginationActions.tablepaginationOnChangeFilter(data)),
    tablepaginationResetFilter: data => dispatch(TablepaginationActions.tablepaginationResetFilter(data))
    //   resetForm: data => dispatch(LoginActions.loginReset(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Filter))
