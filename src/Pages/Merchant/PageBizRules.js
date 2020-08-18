import React, { Component } from 'react'
import { path } from 'ramda'
import Helmet from 'react-helmet'
import MerchantCredentialInfo from '../../Containers/Merchant/MerchantCredentialInfo'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import { val } from '../../Translations/SagaMessages'
import SelectMerchantComboBox from '../../Containers/Merchant/SelectMerchantComboBox'
import { LoginSelectors } from '../../Containers/Login/redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import MerchantActions, {MerchantSelectors} from '../../Containers/MerchantInfo/redux'
import '../../App.css'
class PageBizRules extends Component {
    state = {
        valMerchant: null,
        isChecked:false
    }
    toggleChange = () => {
      this.setState({
        isChecked: !this.state.isChecked,
      });
    }
    componentWillReceiveProps(nextProps){

      if(nextProps.dataSummary.length!==0){
      if (nextProps.dataSummary[24]==='Active'){
       
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
    handleChange = e => {
        let { name, value } = e.target;
        console.log(value);

        this.setState({
            valMerchant: value,

        });

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
                    <title>Bussiness Rules</title>
                    <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
                </Helmet>
                <ContentHeader
                    title='Bussiness Rules'
                    breadcrumb={[{ title: 'Merchant', link: '#' }, { title: 'Bussiness Rules    ', link: null, isActive: true }]}
                />
                <section className='content'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-12'>
                                {/*  */}
                                <div className="card" >
                                    <div className="card-body">
                                    <div className='col-md-12'>
                                      
                                    <SelectMerchantComboBox
                                      defaultValue={merchantId}
                                      onChange={ value => history.replace(`/merchant/biz-rules/${value || '-'}`)}
                                    />
                                       

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
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4 " style={{fontSize:12}}>Hour Range</label>
                            <div className="col-sm-9">
                            <input type="email" className="col-sm-7 form-control" style={{height:'90%',fontSize:12}} id="exampleInputEmail2" placeholder="03:00 – 04:59" disabled/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Date Range</label>
                            <div className="col-sm-9">
                            <input type="email"className="col-sm-7 form-control" style={{height:'90%',fontSize:12}} id="exampleInputEmail2" placeholder="01/02/2020 – 29/02/2020" disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Device Lock</label>
                            <div className="col-sm-9">
                            <input type="hidden" className="col-sm-5 form-control" style={{height:'90%',fontSize:12}} id="exampleInputEmail2" placeholder="Tokopedia Tower, Jalan Prof. Dr. Satrio Kav 11, Karet Semanggi, Setiabudi, Jakarta
" disabled/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Idle</label>
                            <div className="col-sm-offset-4 col-sm-9">
			<div className="input-group col-sm-7 pl-0 pr-0" >
				<input type="text" className="form-control " style={{height:'90%',fontSize:12}} placeholder="30" disabled/>
				<span className="input-group-text" style={{paddingBottom:2,fontSize:12}}>Days</span>
			</div>
				
		</div>
                          </div>
                        </div>
                      </div>
                     
                      <div className="row ml-10">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4 " style={{fontSize:12}} >Daily Volume Limit</label>
                            <div className="col-sm-9">
                            <input type="email" className="col-sm-7 form-control" style={{height:'90%',fontSize:12}} id="exampleInputEmail2" placeholder="100.000" disabled/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Shipping Address</label>
                            <div className="col-sm-9">
                            <input type="hidden"className="col-sm-7 form-control" style={{height:'90%',fontSize:12}} id="exampleInputEmail2" placeholder="(021) 5369-1015" disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Status</label>
                            <div className="col-sm-9">
                            <label className="switch" >
  <input type="checkbox"  checked={this.state.isChecked} onChange={this.toggleChange}/>
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
   injectIntl(withRouter(PageBizRules))
 )
 

