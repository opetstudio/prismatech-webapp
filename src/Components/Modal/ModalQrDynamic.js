import React, { Component } from 'react'
import Loader from '../../Components/Loader/Loader'
import _ from 'lodash'
export default class ModalQrMerchant extends Component {
    render() {
        const {qr} = this.props
        console.log()
        return (
            <div >
                <div className='modal fade' id='modal-payment'>
                    <div className='z modal-dialog'>
                        <div className='modal-content'>
                        <div className='modal-body'>
                            <center><label>Scan this to payment</label></center>
                            <img src={`${qr}`} width={'100%'} />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
