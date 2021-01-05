import React, { Component } from 'react'
import { connect } from 'react-redux'
// import QrAction from '../PayBill/redux'
import ModalDynamic from '../../../Components/Modal/ModalQrDynamic'
class index extends Component {
  render () {
    const { isReqesting, qr } = this.props
    return (
      <div>
        <ModalDynamic
          isReqesting={isReqesting}
          qr={qr}
        />
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isRequesting: state.rppayment.isRequesting,
    qr: state.rppayment.qr_code
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(index)
