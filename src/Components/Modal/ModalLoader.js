import React, { Component } from 'react'
import Loader from '../Loader/Loader'
export default class ModalLoader extends Component {
    render() {
        return (
            <div id='modal-loader'>
                <div className='modal fade' id='modal-loader'>
                        <Loader type="rpmerah" style={{top:'50%',left:'50%'}}/>          
                </div>
            </div>
        )
    }
}
