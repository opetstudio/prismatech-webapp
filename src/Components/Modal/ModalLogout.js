import React, { Component } from 'react'
import Loader from '../../Components/Loader/Loader'

export default class index extends Component {
  _logout (e) {
    if (e) e.preventDefault()
    this.props.logout({}) 
  }

  render () {
    const {isRequesting} = this.props
    return (
      <div >
        <div className='modal fade' id='modal-default'>
          {isRequesting && <center><Loader type="rpmerah"/></center>}
          {( !isRequesting &&
          <div className='z modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title'>Logout Konfirmasi</h4>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <p>Klik logout untuk keluar</p>
              </div>
              <div className='modal-footer justify-content-between'>
                <button type='button' className='btn btn-default close' data-dismiss='modal'>Close</button>
                <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={(e) => this._logout(e)}>Logout</button>
              </div>
            </div>
          </div>
            )}
          </div>
         </div>
    )
  }
}
