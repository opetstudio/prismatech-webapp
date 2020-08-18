import React, { Component } from 'react'

export default class index extends Component {
  render () {
    return (
      <div className='modal fade' id='modal-default'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'> Konfirmasi Keluar</h4>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <p>Klik logout untuk keluar</p>
            </div>
            <div className='modal-footer justify-content-between'>
              <button type='button' className='btn btn-default' data-dismiss='modal'>Batal</button>
              <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={(e) => this.props.logout(e)}>Keluar</button>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
    )
  }
}
