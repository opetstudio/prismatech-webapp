import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class index extends Component {
  render () {
    return (
      <section className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <ol className='breadcrumb'>
                {this.props.breadcrumb.map(r => (<li key={r.title} className={r.isActive ? 'breadcrumb-item active' : 'breadcrumb-item'}>{r.link && <Link to={r.link}>{r.title}</Link>}{!r.link && r.title}</li>))}
              </ol>
            </div>{/* /.col */}
            <div className='col-sm-6'>
              {/* <h4 className='m-0 text-dark'>{this.props.title}</h4> */}
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </section>
    )
  }
}
