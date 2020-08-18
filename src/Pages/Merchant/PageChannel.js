import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import MerchantActions, {MerchantSelectors} from '../../Containers/MerchantInfo/redux'
import { LoginSelectors } from '../../Containers/Login/redux'
import { path } from 'ramda'
import Helmet from 'react-helmet'
import MerchantCredentialInfo from '../../Containers/Merchant/MerchantCredentialInfo'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import { val } from '../../Translations/SagaMessages'
import SelectMerchantComboBox from '../../Containers/Merchant/SelectMerchantComboBox'
import '../../App.css'
class PageChannel extends Component {
    state = {
        valMerchant: null,
        isChecked: false,
    }
    handleChange = e => {
        let { name, value } = e.target;
       

        this.setState({
            valMerchant: value,

        });

    }
    toggleChange = () => {
      this.setState({
        isChecked: !this.state.isChecked,
      });
    }
    componentWillReceiveProps(nextProps){

      if(nextProps.dataSummary.length!==0){
      if (nextProps.dataSummary[23]==='Active'){
       
        this.setState({
          isChecked: true,
        });
       
      }else{

        this.setState({
          isChecked: false,
        });
        
      }
    }
    else{

      this.setState({
        isChecked: false,
      });
     
    }
   
    
    }
    componentDidMount(){
      this.props.dataMerchInfo()
      this.props.getMerchInfo([])
      
    }
    render() {
      
     
        const { history, match } = this.props
        const merchantId = path(['params', 'merchantId'], match)
        const techCompanies = [
            { label: "Apple", value: 1 },
            { label: "Facebook", value: 2 },
            { label: "Netflix", value: 3 },
            { label: "Tesla", value: 4 },
            { label: "Amazon", value: 5 },
            { label: "Alphabet", value: 6 },
        ];
        // console.log('render')
        return (
            <div className='content-wrapper'>
                <Helmet>
                    <title>Channel</title>
                    <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
                </Helmet>
                <ContentHeader
                    title='Channel'
                    breadcrumb={[{ title: 'Merchant', link: '#' }, { title: 'Channel', link: null, isActive: true }]}
                />
                <section className='content'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-12'>
                                {/*  */}
                                <div className="card" >
                                    <div className="card-body">
                                    <div className='col-md-12'>
                                    <SelectMerchantComboBox />
                                            </div>                                        
                                    </div>

                                </div>
                            </div>
                            {/* <select onChange={this.handleChange} className="browser-default custom-select col-md-6">
                                <option selected>Choose Merchant</option>
                                <option value="1">Tokopedia</option>
                                <option value="2">Elevania</option>
                            </select> */}

                          
                        </div>


                        
                        <div className="card">
                  <div className="card-body">
                   
                    <form className="form-sample">
                      <p className="card-description" style={{fontWeight:"bold" ,marginBottom:3,fontSize:13}}> Parameter </p>
                      <div className="row ml-10">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label font-weight-normal pl-4 "  style={{fontSize:12}} >Merchant ID</label>
                            <div className="col-sm-8">
                            <input type="email" className="form-control col-sm-7"  id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[15]:''} disabled/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Merchant Key ID</label>
                            <div className="col-sm-8">
                            <input type="email" className="form-control col-sm-7" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[19]:''} disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Merchant Secret Key</label>
                            <div className="col-sm-8">
                            <input type="email" className="form-control col-sm-7" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[16]:''} disabled/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Front End Url</label>
                            <div className="col-sm-8">
                            <input type="email" className="form-control col-sm-7" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[18]:''}disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                      <div className="row ml-10">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label font-weight-normal pl-4 "  style={{fontSize:12}}>Callback</label>
                            <div className="col-sm-8">
                            <input type="email" className="form-control col-sm-7" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[17]:''} disabled/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Merchant Limit</label>
                            <div className="col-sm-8">
                            <input type="email" className="form-control col-sm-7" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[20]:''} disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                      {/* <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Effective Date</label>
                            <div className="col-sm-8">
                           
                            <div className="form-group">
                                <div className="form-check form-check-flat">
                                  <label className="form-check-label" style={{fontSize:12}}>
                                    <input type="checkbox" className="form-check-input"  /> CIMB <i className="input-helper"></i></label>
                                </div>
                                <div className="form-check form-check-flat">
                                  <label className="form-check-label" style={{fontSize:12}}>
                                    <input type="checkbox" className="form-check-input"   /> MAYBANK <i className="input-helper"></i></label>
                                    <input type="checkbox" className="form-check-input"   checked/> MAYBANK <i className="input-helper"></i></label>
                                </div>
                                <div className="form-check form-check-flat">
                                  <label className="form-check-label" style={{fontSize:12}}>
                                <input type="checkbox" className="form-check-input" /> BTPN <i className="input-helper"></i></label>
                            </div>

                            </div>
                            </div>
                          </div>
                        </div>
                       */}   <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Effective Date</label>
                            <div className="col-sm-8">
                            <input type="email" className="form-control col-sm-7" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[21]:''} disabled/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Expired Date</label>
                            <div className="col-sm-8">
                            <input type="email" className="form-control col-sm-7" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[22]:''} disabled/>
                            </div>
                          </div>
                        </div>
                       
                      
                       
                      </div>
                     
                      <div className="row">
                      <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Status</label>
                            <div className="col-sm-8">
                            <label className="switch" > 

  <input type="checkbox"   checked={this.state.isChecked} onChange={this.toggleChange}/>
  <span className="slider round"></span>
</label>
                            </div>
                          </div>
                        </div>
                   
                      </div>
                    </form>
                  </div>
                </div>



                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state.merchInfo.dataSummary,'statess');
  
   
   return {
    dataSummary:state.merchInfo.dataSummary,
    userMerchantCode: LoginSelectors.getUserMerchantCode(state.login),
   userRole: LoginSelectors.getUserRole(state.login)
   }
 }
 const mapDispatchToProps = dispatch => {
   
   
   return {
     dataMerchInfo: data => dispatch(MerchantActions.dataMerchInfo()),
     getMerchInfo: data => dispatch(MerchantActions.getMerchInfo(data))
   }
 }
 export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(
   injectIntl(withRouter(PageChannel))
 )
 