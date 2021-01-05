import React, { Component } from 'react'
import Loader from '../../Components/Loader/Loader'
import _ from 'lodash'
// import Base64Downloader from 'react-base64-downloader';
import { Images } from '../../Themes'
import htmlToImage from 'html-to-image'
import Pdf from "react-to-pdf"

export default class ModalQrMerchant extends Component {
    state={
        qr:'qronly'
    }
    _windowsWidth() {
        let { innerWidth: width, innerHeight: height } = window;
        // if(width>height)
        // {
        //     height=height-900
        //     width=0
        // }
        // else
        // {
        //     height=height-50
        //     width=width-50
        // }
        return {width,height}
    }
    constructor(props)
    {
        super(props)
        this._qris=this._qris.bind(this)
        this._qrmerchant=this._qrmerchant.bind(this)
        this._qrOnly=this._qrOnly.bind(this)
    }
    _downloadPNG()
    {
        htmlToImage.toJpeg(document.getElementById('qr-code-merchant-rp'), { quality: 1 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'rayapay_merchant_qr.jpeg';
            link.href = dataUrl;
            link.click();
        });
    }
    _qrOnly(qr,ref)
    {

        // const wdw=this._windowsWidth()
        // console.log("width=",wdw.width," | heigth=",wdw.height)
        return(
            <div className="container" id="qr-code-merchant-rp" style={{overflow:'visible',position:'relative'}} ref={ref}>
                <center style={{position:'relative'}}>
                    <img alt='-' className="img-qr-only" src=""/>
                    <img alt='-' src={Images.LogoRp} style={{zIndex:100,position:'absolute',width:'12%',top:'42%',left:'42%',backgroundSize:720}}/> 
                    {/* <img src={Images.LogoRp} style={{position:'absolute',width:'12%',}}/> */}
                    <img alt='-' src={`${qr}`} width={'100%'} style={{position:'relative'}}/>

                </center>
            </div>
        )
    }
    _qrmerchant(ref)
    {
       const {qr,merchant} = this.props
    //    const versi_ctk='1.0.25.0.3'
       return(
        <div id="qr-code-merchant-rp" style={{width:'100%'}} ref={ref}>
            <div style={{width:'60%',left:'20%',top:'33%',position:'absolute'}}>
                <center>
                    <h1><strong>{merchant.business_name}</strong></h1>
                    <label className="form-check-label">NMID : {merchant.merchant_id}</label>
                </center>

                <img alt='-' src={Images.LogoRp} style={{zIndex:100,position:'absolute',width:'12%',top:'55%',left:'43%'}}/> 
                <img alt='-' src={`${qr}`} width={'100%'}/>
            </div>
            <img alt='-' src={Images.Qrmerchant} width={'100%'}/>
        </div>
       )
     }
    _qris(ref)
    {
       const {qr,merchant} = this.props
       const versi_ctk='1.0.25.0.3'
       return(
        <div id="qr-code-merchant-rp" style={{width:'100%'}} ref={ref}>
            <div style={{width:'100%',position:'absolute',left:'-1%',top:'27%'}}>
            <br/>
            <br/>
                <center>
                    <h1><strong>{merchant.business_name}</strong></h1>
                    <label className="form-check-label">NMID : {merchant.merchant_id}</label>
                </center>
            </div>
            <div style={{width:'100%',position:'absolute',left:'6%',top:'75%'}}>
            <br/>
            <br/>
                    <label className="form-check-label">{'Dicetak Oleh\t\t\t: Rayapay'}</label>
                    <br/>
                    <label className="form-check-label" style={{marginTop:2}}>{'Versi Cetak\t\t\t:'}{versi_ctk}</label>
            </div> 

            <div style={{width:'60%',position:'absolute',left:'18%',top:'42%'}}>
                <img alt='-' src={Images.LogoRp} style={{zIndex:100,position:'absolute',width:'12%',top:'42%',left:'42%'}}/> 
                <img alt='-' src={`${qr}`} width={'100%'}/>
            </div>
            <img alt='-' src={Images.Qris} width={'100%'}/>
        </div>
       )
    }
    render() {
        const ref = React.createRef();
        const {isRequesting,qr,refresh,error,merchant} = this.props
        return (
            <div className='modal fade' id='modal-qr-merchant'>
            {isRequesting && <center><Loader/></center>}
            {( !isRequesting &&
                <div className='z modal-dialog'>
                    <div className={!_.isEmpty(error) ? 'modal-content bg-danger' : 'modal-content'}>
                        <div className='modal-header'>
                            <h4 className='modal-title'>{!_.isEmpty(error) ? 'Load QR error' : 'Your QR'}</h4>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body' >
                            {!isRequesting && _.isEmpty(error) &&(
                                <div className="form-group row">
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio" id="customRadio1" value="qronly" onChange={(e)=>this.setState({qr:e.target.value})} name="customRadio"/>
                                        <label htmlFor="customRadio1" className="custom-control-label">QR only</label>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio" id="customRadio2" name="customRadio" value="merchant" onChange={(e)=>this.setState({qr:e.target.value})}/>
                                        <label htmlFor="customRadio2" value className="custom-control-label">Merchant</label>
                                    </div>
                                </div>
                            )}
                            {!isRequesting && _.isEmpty(error) && this.state.qr === 'qronly' && (                                
                                this._qrOnly(qr,ref)
                            )}
                            {!isRequesting && _.isEmpty(error) && this.state.qr === 'qris' && (                                
                                this._qris(ref)
                            )}
                             {!isRequesting && _.isEmpty(error) && this.state.qr === 'merchant' && (                                
                                this._qrmerchant(ref)
                            )}
                            {isRequesting && <Loader loading type="rpmerah"/>}
                            {!_.isEmpty(error) && (
                                <div>
                                    <center><label style={{width:'60%',padding:10,color:'#ffff'}}>{error}</label>  </center>                              
                                    <br/>
                                    <center>
                                        <button className="btn btn-block btn-danger btn-lg"  onClick={()=>refresh()}>
                                            <i className="fas fa-redo"></i>&nbsp;
                                            Try again
                                        </button>
                                    </center>
                                </div>
                            )}
                        </div>
                        {!isRequesting && _.isEmpty(error) &&(
                            <div className='modal-footer justify-content-between'>
                                {/* <button className="btn btn-app" onClick={()=>refresh()}><i className="fas fa-redo"></i>Refresh</button> */}
                                    <div className='btn-group' style={{ merginLeft: 10 }}>
                                        <button className='btn btn-warning' onClick={()=>this._downloadPNG()}>Download PNG</button>
                                        &nbsp;&nbsp;
                                        <Pdf targetRef={ref} filename={`qr-merchant-${(merchant.business_name || '').replace(" ","-")}-rp.pdf`}>
                                            {({ toPdf }) => <button className='btn btn-warning' href='/#' onClick={toPdf}>Download PDF</button>}
                                        </Pdf>
                                    </div>
                                <button type='button' className='btn btn-primary' data-dismiss='modal'>Close</button>
                            </div>
                        )}
                    </div>
                </div>
                )}
            </div>
        )
    }
}
