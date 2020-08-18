import React, { Component } from 'react'
// import qs from 'qs'
// import { path } from 'ramda'

// const queryParameter = qs.parse(window.location.search, { ignoreQueryPrefix: true })
// const graphql = (queryParameter).graphql || '{}'
// const graphqlJson = JSON.parse(graphql)
// const filter = path(['filter'], graphqlJson) || {}
// const table = path(['table'], graphqlJson) || null
const fontStyle = {
  fontSize : 12,
}

const boxStyle = {
  height : '50%',
  fontSize : 12
}

export default class FieldText extends Component {

  render () {
    const { name, id, label, type, placeholder, value, hidden, onChangeText } = this.props
    return (
      <div style={{ display: hidden ? 'none' : 'block' }}  className='form-group row'>
        <label htmlFor={id} style={fontStyle} className='col-sm-3 col-form-label'>{label}</label>
        <input style={boxStyle} ishidden={`${hidden}`}
          hiddenvalue={`${hidden}`}
          name={name}
          type={type}
          className='col-sm-7 form-control'
          id={id}
          placeholder={placeholder}
          onChange={(e, f) => { onChangeText(e.target.value) }}
          value={value}
        />
      </div>
    ) 
  }
}
