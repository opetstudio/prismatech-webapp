import React, { Component } from 'react'

export default class TablePagination extends Component {
  render () {
    console.log('render')
    return (
      <table id='example1' className='table table-bordered table-striped dataTable'>
        <thead>
          <tr>
            {this.props.columns.map((v, i) => <th key={i}>{v.title}</th>)}
            {/* <th className='sorting_desc' onClick={(e) => alert('cek')}>Rendering engine</th>
            <th className='sorting_asc'>Browser</th>
            <th className='sorting_disabled'>Platform(s)</th>
            <th className='sorting_desc'>Engine version</th>
            <th className='sorting_disabled'>CSS grade</th> */}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((v) => {
            return (
              <tr key={v.id}>
                {this.props.columns.map((c, i) => <td key={i}>{v[c.name]}</td>)}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>Rendering engine</th>
            <th>Browser</th>
            <th>Platform(s)</th>
            <th>Engine version</th>
            <th>CSS grade</th>
          </tr>
        </tfoot>
      </table>
    )
  }
}
