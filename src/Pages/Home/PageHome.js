import React, { Component } from 'react'
import Helmet from 'react-helmet'
import moment from 'moment'
import { Line, Doughnut, Pie } from 'react-chartjs-2'
import SummaryAction from '../../Containers/RpMerchant/Transaction/redux'
import DashboardMerchantAction from '../../Containers/RpMerchant/Dashboard/redux'
import { _toRp, _getOverallAmount, _getTotalTrx, _getTodayAmount, _formatClientDate, _filterSummaryHist } from './DasboardFunction'
import Shimmer from 'react-shimmer-effect'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import { connect } from 'react-redux'
import { getSession } from '../../Utils/Utils'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
// import MerchantActions, {MerchantSelectors} from '../../Containers/Dashboard/redux'

import { stat } from 'fs'

class PageHome extends Component {
  componentWillMount () {
    const merchant_id = getSession('merchant_id')
    this.props.transactionSummaryFetch({ merchant_id })
    this.props.fetchdashboard({ merchant_id })
  }

  _table (data, isRequesting) {
    console.log('isrequesting>>>', isRequesting)
    if (!isRequesting) {
      if (data.length > 0) {
        return (
          <div className='card-body table-responsive p-0' style={{ height: 300 }}>
            <table className='table table-hover text-nowrap'>
              <thead>
                <tr>
                  <th>Id Transaksi</th>
                  <th>Jumlah</th>
                  <th>Metode</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {_filterSummaryHist(data, 10).map((r, i) =>
                  <tr style={{ backgroundColor: '' }} key={i}>
                    <td>{r.transaction_id}</td>
                    <td>{_toRp(r.transaction_amount)}</td>
                    <td>{r.transaction_method}</td>
                    <td>{_formatClientDate(r.created_at)}</td>
                    <td>

                      {r.status == 'SETTLED' && <span style={{ padding: 5, borderRadius: 10, backgroundColor: '#28a745', color: '#fff' }}>Settled</span>}
                      {r.status == 'PENDING' && <span style={{ padding: 5, borderRadius: 10, backgroundColor: '#ffc107', color: '#000' }}>Pending</span>}
                      {r.status == 'CANCEL' && <span style={{ padding: 5, borderRadius: 10, backgroundColor: '#dc3545u', color: '#fff' }}>Cancel</span>}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      } else {
        return (
          <div className='card-body table-responsive p-0' style={{ height: 300 }}>
            <center>Maaf, Anda belum melakukan transaksi</center>
          </div>
        )
      }
    } else {
      return (
        <div className='card-body table-responsive p-0' style={{ height: 300 }}>
          {/* <table className="table table-head-fixed text-nowrap"> */}
          <center><Loader loading type='rpmerah' /> Fetching</center>
          {/* <center><Loader loading type='rpmerah' /> Fetching</center> */}
          {/* </table> */}
        </div>
      )
    }
  }

  render () {
    const { data, isRequesting, dashboard } = this.props

    return (
      <ContentWrapper
        pageTitle='Home'
        breadcrumb={[{ title: 'Beranda' }]}
        contentHeaderTitle='Beranda'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>
                <h5 className='card-title'>Aktifitas Terakhir</h5>
                <div className='card-tools'>
                  <button type='button' className='btn btn-tool' data-card-widget='collapse'>
                    <i className='fas fa-minus' />
                  </button>
                </div>
              </div>
              <div className='card-body' style={{ paddingBottom: 3 }}>
                <div className='row'>
                  {/* table */}
                  {/* {this._table(data)} */}
                  {this._table(data, isRequesting)}

                  {/* table */}
                </div>

              </div>
              {/* /.box-header */}
            </div>
          </div>
        </div>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps', state.dashboard)

  return {
    error: state.rptransaction.errors,
    status: state.rptransaction.status,
    isRequestingDashboard: state.merchantdashboard.isRequesting,
    isRequesting: state.rptransaction.isRequesting,
    data: state.rptransaction.trxData,
    dashboard: state.merchantdashboard
  }
}
const mapDispatchToProps = dispatch => {
  return {
    transactionSummaryFetch: data => dispatch(SummaryAction.fetchTransaction(data)),
    fetchdashboard: data => dispatch(DashboardMerchantAction.fetchMerchantDashboard(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(withRouter(PageHome))
)
