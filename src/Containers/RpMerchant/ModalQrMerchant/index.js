import React, { Component } from 'react'
import {connect} from 'react-redux'
import ModalQrMerchant   from '../../../Components/Modal/ModalQrMerchant'
import QrAction from './redux'
import RmAction from '../MerchantRelatedInstitution/redux'
import {getSession} from '../../../Utils/Utils'

 class index extends Component {
   componentWillMount()
    {
        const merchant_id=getSession('merchant_id');
        // this.props.getRelated({merchant_id})
    }
    render() {
        const {isReqesting,qr,status,error,getQr,merchant,relates} = this.props
        return (
            <div>
                <ModalQrMerchant 
                institutions={relates}
                isReqesting={isReqesting} 
                error={error}
                qr={qr} 
                refresh={getQr}
                merchant={merchant}
                getQr={getQr}
                relates={this.props.relates}
                />                    
            </div>
        )
    }       
}
const mapStateToProps = (state, ownProps) => {
    return {
      merchant:state.rpmerchantprofile,
      error: state.rpqrmerchant.errors, 
      status: state.rpqrmerchant.status, 
      isRequesting: state.rpqrmerchant.isRequesting, 
      qr: state.rpqrmerchant.qr_code,
      relates:state.merchantrelatedinstitution.related_institutions
    }
  }
const mapDispatchToProps = dispatch => {
    return {
        getQr: data => dispatch(QrAction.getQr(data)),
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(index)
