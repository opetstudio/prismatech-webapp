// import library core react js
import React, { Component } from 'react'
// import library react-helmet, gunanya untuk edit meta tag di html
import Helmet from 'react-helmet'
export default class MyProfilePageComp extends Component {
  render () {
    // console.log('render')
    return (
      <div className='content-wrapper'>
        <Helmet>
          <title>Profil Saya</title>
        </Helmet>
        <section className='content-header'>
          <h1>Profil Saya</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='/#'>
                <i className='fa fa-dashboard' /> Profil
              </a>
            </li>
            <li className='active'>Profil Saya</li>
          </ol>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Box Header</h3>
                </div>
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <p>Halaman Profil</p>
                      <p>tampilkan parameter state yang di inject dari class container: <b>{this.props.parameterRedux1}</b></p>
                    </div>
                  </div>
                </div>
                <div class='box-footer'>
                    Footer
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
