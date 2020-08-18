import React, { Component } from 'react'
import {connect} from 'react-redux'
import QrAction from '../TopupEmoney/redux'
import ModalTopup   from '../../../Components/Modal/ModalQrTopup'
 class index extends Component {
    render() {
        const {isReqesting,qr,status,error,getQr} = this.props
        return (
            <div>
                <ModalTopup 
                isReqesting={isReqesting} 
                qr={qr} />                    
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
      isRequesting: state.rptopupemoney.isRequesting, 
      qr: state.rptopupemoney.qr_code,
    }
  }
const mapDispatchToProps = dispatch => {
    return {}
}
export default connect(mapStateToProps,mapDispatchToProps)(index)
