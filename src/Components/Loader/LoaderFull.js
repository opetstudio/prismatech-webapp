import React, { Component } from 'react'
import Loader from './Loader'

export default class LoaderFull extends Component {
    render() {
        return (
            // <div style={{position:'absolute',width:'100%', height:'100%',zIndex:1000,backgroundColor:'rgba(255, 255, 255, 0.8)'}}>
            // <div style={{width:'100%', height:'100%',top:'50',left:'50%',backgroundColor:'#fff'}}>
            <div style={{position:'absolute',width:window.outerWidth, height:window.outerHeight,backgroundColor:'#fff'}}>
                <Loader type="rpmerah" style={{top:'50',left:'50%'}}/>
            </div>
        )
    }
}
