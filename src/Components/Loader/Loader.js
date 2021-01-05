import React, { Component } from 'react'
import AppConfig from '../../Config/AppConfig'
import ClipLoader from 'react-spinners/ClipLoader'
// import Lottie from 'react-lottie'
import * as rpmerah from './Loader_asset/Loader-merah.json'
import * as rpputih from './Loader_asset/Loader-putih.json'
import loadable from '@loadable/component'
// Can be a string as well. Need to ensure each key-value pair ends with ;
// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;

const Lottie = loadable(() => import('react-lottie'))
// `

export default class Loader extends Component {
  render () {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: this.props.type === 'rpmerah' ? rpmerah.default : rpputih.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
    if (AppConfig.appCode === 'RP') {
      if (this.props.type === 'rpmerah' || this.props.type === 'rpputih') {
        console.log('Loading custom')
        return (
          // <div className='sweet-loading' style={{bottom:'100%'}}>
          <Lottie
            options={defaultOptions}
            height={100}
            width={100}
          />
          // </div>
        )
      }
    }
    console.log('Loading default')
    return (
      <div className='sweet-loading'>
        <ClipLoader
        //   css={override}
          sizeUnit='px'
          size={this.props.size || 40}
          color='#123abc'
          loading={this.props.loading}
        />
      </div>
    )
  }
}
