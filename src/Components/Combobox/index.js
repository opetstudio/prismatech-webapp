import React, { Component } from 'react'

export default class index extends Component {
 state={
   value: 'cc'
 }

 componentDidMount () {

 }

 handleChange (event) {
   const { onChange } = this.props
   this.setState({ value: event.target.value })
   onChange(event)
 }

 render () {
   const { options, name, label } = this.props

   return (
     <select name={name} className='form-control' value={this.state.value} onChange={(e) => this.handleChange(e)} on>
       <option value=''>{label}</option>
       {options.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
     </select>
   )
 }
}
