import React, { Component } from 'react'
import { path } from 'ramda'

export default class Filter extends Component {
  render () {
    const { table, submitFilterMSG, onSubmitForm, onResetForm, onDownload, children } = this.props
    const rd = path(['rd'], submitFilterMSG)
    return (
      <form
        ref={table} className='form' onSubmit={(e) => {
          if (e) e.preventDefault()
          onSubmitForm(this.refs)
        }}
      >
        <div className='card'>
          {/* <div className='card-header'>
            <h5 className='card-title' style={cardStyle}>Filter</strong></h5>
            <div className='card-tools'>
              <button type='button' className='btn btn-tool' data-card-widget='collapse'>
                <i className='fas fa-minus' />
              </button>
            </div>
          </div> */}
          <div className='card-body'>
            {children}
          </div>
          <div className='card-footer'>
            <button ref='buttonSearch' type='submit' className='btn btn-sm btn-primary' style={{ marginRight: 5 }}>
              <i className='fas fa-search' /> Search
            </button>
            {/* <button type='button' className='btn btn-info' onClick={this.resetFilter.bind(this)} style={{ marginRight: 5 }}><i className='fas fa-close' /> Reset</button> */}
            <button type='button' className='btn btn-sm  btn-secondary' onClick={() => onResetForm(this.refs)} style={{ marginRight: 5 }}><i className='fas fa-minus-circle' /> Reset</button>
            <button type='button' className='btn btn-sm  btn-success' onClick={() => onDownload(this.refs)} style={{ marginRight: 5, float: 'right' }}><i className='fas fa-download' /> Download</button>
            {rd && <span style={{ color: 'red' }}>{rd}</span>}
          </div>
        </div>
      </form>
    )
  }
}
