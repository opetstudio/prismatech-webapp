import React, { Component } from 'react'

export default class AbsensiConfirmation extends Component {
  render () {
    return (
      <div className='card'>
        <div className='card-header'>
          <h3 className='card-title'>Daftar Siswa yang Hadir</h3>
          <div className='card-tools'>
            <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button>
            {/* <button type='button' className='btn btn-tool' data-card-widget='remove'><i className='fas fa-times' /></button> */}
          </div>
        </div>
        <div className='card-body'>
          {/*  */}
        </div>
        <div className='card-footer'>
          <button style={{ width: 150 }} type='button' className='btn bg-gradient-primary' data-toggle='modal' data-target='#modal-danger'>Approve All</button>
          <button style={{ width: 150, marginLeft: 5 }} type='button' className='btn bg-gradient-success'>Virtual Class</button>
        </div>
      </div>
    )
  }
}
