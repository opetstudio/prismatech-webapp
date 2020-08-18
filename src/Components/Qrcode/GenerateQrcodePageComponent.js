import React, { Component } from 'react'

export default class GenerateQrcodePageComponent extends Component {
  _formOnSubmit (e) {
    if (e) e.preventDefault()
    // const email = this.refs.email.value
    // const pass = this.refs.password.value
    // alert(pass)
    // this.props.loginCreate({
    //   userid: email,
    //   password: pass
    // })
    return false
  }

  render () {
    // console.log('render')
    return (
      <div>
        <div className='content-wrapper'>
          <section className='content-header'>
            <h1>Qrcode Create</h1>
            <ol className='breadcrumb'>
              <li>
                <a href='/#'>
                  <i className='fa fa-dashboard' /> Qrcode
                </a>
              </li>
              <li className='active'>Generate</li>
            </ol>
          </section>
          <section className='content' />
        </div>
      </div>)
  }
}
