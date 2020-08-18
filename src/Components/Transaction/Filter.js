import React, { Component } from 'react'

export default class Filter extends Component {
  render () {
    // console.log('render')
    return (
      <div className='box box-default'>
        <div className='box-header with-border'>
          <h3 className='box-title'>Filter</h3>
          <div className='box-tools pull-right'>
            <button type='button' className='btn btn-box-tool' data-widget='collapse'><i className='fa fa-minus' /></button>
            <button type='button' className='btn btn-box-tool' data-widget='remove'><i className='fa fa-remove' /></button>
          </div>
        </div>
        <div className='box-body'>
          <div className='row'>
            <div className='col-md-6'>
              <form className='form-horizontal'>
                <div className='form-group'>
                  <label htmlFor='inputEmail3' className='col-sm-3 control-label'>Merchant Ref. Number</label>
                  <div className='col-sm-9'>
                    <input type='trxid' className='form-control' id='trxid' placeholder='Transaction No' />
                  </div>
                </div>
                <div className='form-group'>
                  <label htmlFor='inputEmail3' className='col-sm-3 control-label'>Merchant User Id</label>
                  <div className='col-sm-9'>
                    <input type='csname' className='form-control' id='csname' placeholder='Merchant User Id' />
                  </div>
                </div>
                {/* <div className='form-group'>
                        <label htmlFor='inputEmail3' className='col-sm-3 control-label'>Merchant</label>
                        <div className='col-sm-9'>
                        <select className='form-control select2' style={{width: '100%'}}>
                            <option>Bpay</option>
                            <option>Bukataplak</option>
                            <option>Shopi</option>
                            <option>Tokomania</option>
                            <option>Trapeloka</option>
                        </select>
                        </div>
                    </div> */}
                <div className='form-group'>
                  <label htmlFor='inputEmail3' className='col-sm-3 control-label'>Payment Method</label>
                  <div className='col-sm-9'>
                    <select className='form-control select2' style={{ width: '100%' }}>
                      <option>Jenius - Bank BTPN</option>
                      <option>CIMB Niaga </option>
                    </select>
                  </div>
                </div>
                {/* <div className='form-group'>
                        <label htmlFor='inputEmail3' className='col-sm-3 control-label'>Bank Code</label>
                        <div className='col-sm-9'>
                        <select className='form-control select2' style={{width: '100%'}}>
                            <option>Jenius - Bank BTPN</option>
                            <option>CIMB Niaga </option>
                        </select>
                        </div>
                    </div> */}
              </form>
            </div>
            <div className='col-md-6'>
              <form className='form-horizontal'>
                <div className='form-group'>
                  <label htmlFor='inputEmail3' className='col-sm-3 control-label'>Status</label>
                  <div className='col-sm-9'>
                    <select className='form-control select2' style={{ width: '100%' }}>
                      <option>Setled</option>
                      <option>Pending</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                </div>
                <div className='form-group'>
                  <label htmlFor='inputEmail3' className='col-sm-3 control-label'>Transaction Amount</label>
                  <div className='col-sm-9'>
                    <select className='form-control select2' style={{ width: '100%' }}>
                      <option>0 - 100.000</option>
                      <option>100.001 - 500.000</option>
                      <option>500.001 - 1.000.000</option>
                    </select>
                  </div>
                </div>
                {/* <div className='form-group'>
                        <label htmlFor='inputEmail3' className='col-sm-3 control-label'>Bank Code</label>
                        <div className='col-sm-9'>
                        <select className='form-control select2' style={{width: '100%'}}>
                            <option>014 - BCA</option>
                            <option>008 - Mandiri</option>
                        </select>
                        </div>
                    </div> */}
                <div className='form-group'>
                  <label htmlFor='inputEmail3' className='col-sm-3 control-label'>Start Date</label>
                  <div className='col-sm-9'>
                    <div className='input-group date'>
                      <div className='input-group-addon'>
                        <i className='fa fa-calendar' />
                      </div>
                      <input type='text' className='form-control pull-right' id='datepicker' />
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <label htmlFor='inputEmail3' className='col-sm-3 control-label'>End Date</label>
                  <div className='col-sm-9'>
                    <div className='input-group date'>
                      <div className='input-group-addon'>
                        <i className='fa fa-calendar' />
                      </div>
                      <input type='text' className='form-control pull-right' id='datepicker2' />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className='box-footer pull-right'>
            <button type='submit' className='btn btn-secondary' style={{ width: '100%' }}><i className='fa fa-search' />&nbsp;&nbsp;Search</button>
        &nbsp;
        &nbsp;
            <button type='submit' className='btn btn-secondary' style={{ width: '100%' }}><i className='fa fa-close' />&nbsp;&nbsp;Reset</button>
          </div>
        </div>
      </div>
    )
  }
}
