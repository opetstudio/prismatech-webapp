
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import MerchantActions, {MerchantSelectors} from '../../Containers/MerchantInfo/redux'
import { path } from 'ramda'
import Helmet from 'react-helmet'
import MerchantCredentialInfo from '../../Containers/Merchant/MerchantCredentialInfo'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import { val } from '../../Translations/SagaMessages'
import SelectMerchantComboBox from '../../Containers/Merchant/SelectMerchantComboBox'
import { LoginSelectors } from '../../Containers/Login/redux'
import '../../App.css'
class PageMerchantInfo extends Component {
    state = {
      valMerchant: null,
      merchantInfoFetch:[],
      isChecked: false,
    }

    handleChange = e => {
      const { name, value } = e.target
      console.log(value)

      this.setState({
        valMerchant: value

      })
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
    toggleChange = () => {
      this.setState({
        isChecked: !this.state.isChecked,
      });
    }
    componentDidMount(){
      this.props.dataMerchInfo()
      this.props.getMerchInfo([])
      
      // setInterval(() => {
      //   console.log('pos');
        
      //   this.props.getMerchInfo([])
      // }, 5000);
    }

    render () {
      const { history, match } = this.props
      const merchantId = path(['params', 'merchantId'], match)
      
      console.log('propssss=>', this.props)
      const techCompanies = [
        { label: 'Apple', value: 1 },
        { label: 'Facebook', value: 2 },
        { label: 'Netflix', value: 3 },
        { label: 'Tesla', value: 4 },
        { label: 'Amazon', value: 5 },
        { label: 'Alphabet', value: 6 }
      ]
      // console.log('render')this.props.match.params.id
      return (
        <div className='content-wrapper'>
          <LoginCheck />
          <Helmet>
            <title>Merchant Info</title>
            <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
          </Helmet>
          <ContentHeader
            title='Merchant Info'
            breadcrumb={[{ title: 'Merchant', link: '#' }, { title: 'Info', link: null, isActive: true }]}
          />
          <section className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  {/*  */}
                  <div className='card'>
                    <div className='card-body'>
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

                {/* <div className="card col-md-6">
                                <div className="card-body">
                                    <form className="form-sample">
                                        <p align='left' style={{ fontWeight: 'bold ' ,marginBottom:0}}> Profile </p>
                                        <div className="row" style={{ marginLeft: 10 }}>
                                            <div className="col-md-12">
                                                <div className="form-group row " style={{ marginBottom:0}}>
                                                    <label className="col-sm-4 mt-2 font-weight-normal" style={{ marginBottom:0}}>Name</label>
                                                    <label className="col-sm-6   font-weight-normal  text-muted" style={{ marginBottom:0}}>Tokopedia</label>
                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Tokopedia" disabled/>
                            </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group row" style={{ marginBottom:0}}>
                                                    <label className="col-sm-4 mt-2 font-weight-normal " style={{ marginBottom:0}}>PKS</label>
                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="230/PI/TPD/DD/IX/2019" disabled/>
                            </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-4 mt-2 font-weight-normal mb-0">Address</label>
                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Tokopedia Tower, Jalan Prof. Dr. Satrio Kav 11, Karet Semanggi, Setiabudi, Jakarta
" disabled/>
                            </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-4 mt-2 font-weight-normal mb-0 ">Zip Code</label>

                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="12940" disabled/>
                            </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-4 mt-2 font-weight-normal mb-0 ">Country</label>
                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Indonesia" disabled/>
                            </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-4 mt-2 font-weight-normal mb-0 ">Phone </label>
                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="(021) 5369-1015" disabled/>
                            </div>

                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-4 mt-2  font-weight-normal mb-0 ">MCC</label>
                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="e-commerce" disabled/>
                            </div>
                                                    </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-4 mt-2 font-weight-normal mb-0 ">NPWP</label>
                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="N/A" disabled/>
                            </div>
                                                   </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-4 mt-2 font-weight-normal mb-0 ">SIUP</label>
                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="N/A" disabled/>
                            </div>
                                                    </div>
                                            </div>

                                        </div>

                                        <p align='left' style={{ fontWeight: 'bold ' }}> Financial Info </p>
                                        <div className="row" style={{ marginLeft: 10 }}>
                                            <div className="col-md-12">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-4 mt-2  font-weight-normal mb-0">Bank Account</label>
                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="3721785899" disabled/>
                            </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-4 mt-2   font-weight-normal mb-0 ">Branch</label>
                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="BCA Kedoya Permai" disabled/>
                            </div>
                                                   </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-4 mt-2 font-weight-normal mb-0 ">Acount Name</label>
                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="PT Tokopedia" disabled/>
                            </div>
                                                </div>
                                            </div>

                                        </div>
                                        <p align='left' style={{ fontWeight: 'bold ' }}> Correspondent </p>
                                        <div className="row" style={{ marginLeft: 10 }}>
                                            <div className="col-md-12">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-4 mt-2 font-weight-normal mb-0">PIC</label>
                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Fadli Setiawan" disabled/>
                            </div>
                                                           </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-4 mt-2 font-weight-normal mb-0">Email</label>
                                                    <div className="col-sm-8 mt-2">
                              <input type="email" className="form-control" id="exampleInputEmail2" placeholder="fadli.setiawan@tokopedia.com" disabled/>
                            </div>   </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-4 mt-2 font-weight-normal mb-0">Status</label>
                                                    <div className="col-sm-8 mt-2">
                                                    <label className="switch" >
  <input type="checkbox" checked/>
  <span className="slider round"></span>
</label>
                            </div>
                                                </div>
                                            </div>

                                        </div>

                                    </form>
                                </div>
                            </div>

                             */}
              </div>

              <div className='card'>
                <div className='card-body'>


                   
                    <form className="form-sample">
                      <p className="card-description" style={{fontWeight:"bold" ,marginBottom:3,fontSize:13}}> Profile </p>
                      <div className="row ml-10">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4 " style={{fontSize:12}} >Name</label>
                            <div className="col-sm-9">
                            <input type="email" className="col-sm-7 form-control" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[0]:''} disabled/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4" style={{fontSize:12}} >PKS</label>
                            <div className="col-sm-9">
                            <input type="email" className="col-sm-7 form-control" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[5]:''} disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4" style={{fontSize:12}} >Address</label>
                            <div className="col-sm-9">
                            <textarea className=" col-sm-7 form-control" style={{height:'90%',fontSize:12}} aria-label="With textarea" placeholder={this.props.dataSummary?this.props.dataSummary[1]:''} disabled></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4" style={{fontSize:12}} >Zip Code</label>
                            <div className="col-sm-9">
                            <input type="email" className=" col-sm-7 form-control" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[6]:''} disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                      <div className="row ml-10">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4 " style={{fontSize:12}} >Country</label>
                            <div className="col-sm-9">
                            <input type="email" className=" col-sm-7 form-control"  style={{height:'90%',fontSize:12}} id="exampleInputEmail2" placeholder={this.props.dataSummary?this.props.dataSummary[2]:''} disabled/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4" style={{fontSize:12}} >Phone</label>
                            <div className="col-sm-9">
                            <input type="email" className="col-sm-7  form-control" style={{height:'90%',fontSize:12}} id="exampleInputEmail2" placeholder={this.props.dataSummary?this.props.dataSummary[7]:''} disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4" style={{fontSize:12}} >MCC</label>
                            <div className="col-sm-9">
                            <input type="email" className="col-sm-7 form-control"  style={{height:'90%',fontSize:12}} id="exampleInputEmail2" placeholder={this.props.dataSummary?this.props.dataSummary[3]:''} disabled/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4" style={{fontSize:12}} >Merchant Website</label>
                            <div className="col-sm-9">
                            <input type="email" className="col-sm-7 form-control" style={{height:'90%',fontSize:12}} id="exampleInputEmail2" placeholder={this.props.dataSummary?this.props.dataSummary[8]:''} disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4" style={{fontSize:12}}    >SIUP</label>
                            <div className="col-sm-9">
                            <input type="email" className="col-sm-7 form-control" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[4]:''} disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                     
                        
                      <p className="card-description font-weight-bold" style={{fontWeight:"bold" ,marginBottom:3,fontSize:13}}> Financial Info </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Bank Account</label>
                            <div className="col-sm-9">
                            <input type="email" className=" col-sm-7 form-control" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[9]:''} disabled/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Branch</label>
                            <div className="col-sm-9">
                            <input type="email" className="col-sm-7 form-control" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[11]:''} disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Acount Name</label>
                            <div className="col-sm-9">
                            <input type="email" className="col-sm-7 form-control" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[10]:''} disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                      <p className="card-description font-weight-bold" style={{fontWeight:"bold" ,marginBottom:7,fontSize:13}}> Correspondent </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>PIC</label>
                            <div className="col-sm-9">
                            <input type="email" className="col-sm-7 form-control" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[12]:''} disabled/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label font-weight-normal pl-4"  style={{fontSize:12}}>Email</label>
                            <div className="col-sm-9">
                            <input type="email" className="col-sm-7 form-control" id="exampleInputEmail2" style={{height:'90%',fontSize:12}} placeholder={this.props.dataSummary?this.props.dataSummary[13]:''} disabled/>
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
  <input type="checkbox" checked={this.state.isChecked} onChange={this.toggleChange}/>
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
 console.log(state.merchInfo,'statess');
 
  
  return {
   dataSummary:state.merchInfo.dataSummary,
   userMerchantCode: LoginSelectors.getUserMerchantCode(state.login),
  userRole: LoginSelectors.getUserRole(state.login)
  }
}
const mapDispatchToProps = dispatch => {
  console.log(dispatch,'dispatch');
  
  return {
    dataMerchInfo: data => dispatch(MerchantActions.dataMerchInfo()),
    getMerchInfo: data => dispatch(MerchantActions.getMerchInfo(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(withRouter(PageMerchantInfo))
)
