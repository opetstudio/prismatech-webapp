import React, { Component } from 'react'

const fontStyle = {
  fontSize: 12
}

const boxStyle = {
  height: 34,
  fontSize: 12,
  marginRight: 5
}

export default class FilterDatepicker extends Component {
  render () {
    const { name, id, label, placeholder, value } = this.props
    return (

      <input type='text' style={boxStyle} datatype='singleDatePicker' placeholder={placeholder} className='col-sm-3 form-control float-right' name={name} id={id} ref={id} value={value} onChange={() => {}} />

    )
  }
}
