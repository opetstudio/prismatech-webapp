import React, { Component } from 'react'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Images } from '../../Themes'
import { getSession } from '../../Utils/Utils'
import RelatedActions from '../../Containers/RpMerchant/MerchantRelatedInstitution/redux'

class PageMerchantMyprofile extends Component {
  componentWillMount () {
    const merchant_id = getSession('merchant_id')
    console.log('merchant id di page profile>>>>>', merchant_id)
    this.props.fetchRelateInstitution({ merchant_id })
  }

  render () {
    const { profile } = this.props
    return (
      <div className='content-wrapper'>
        <LoginCheck />
        <Helmet>
          <title>Akun Saya</title>
          <body
            className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' 
          />
        </Helmet>
        {/* Content Header (Page header) */}
        <ContentHeader
          title='Akun Saya'
          breadcrumb={[
            {
              title: 'Home',
              link: '/home',
              active: true
            }, {
              title: 'Profil Saya',
              active: true
            }
          ]} 
        />
        <section className='content'>

          <div className='container-fluid'>
            <div className='row'>

              <div className='col-md-4'>
                <div className='card card-primary'>
                  <div className='card-body'>
                    <strong className='float-right'>
                      {/* <i className="fas fa-pencil-alt mr-1"/> */}
                  </strong>
                    <div className='text-center'>
                      <img className='profile-user-img img-fluid img-circle' src={Images.LogoRp} alt='User profile picture' />
                    </div>
                    <h3 className='profile-username text-center'>{profile.full_name}</h3>
                    <div className='card-body'>
                      <div style={{ width: '100%' }}>
                        <strong>
                          {/* <i className="fas fa-store mr-1"/> */}
                                Bisnis Saya
                                </strong>
                        <strong className='float-right'>
                          {/* <i className="fas fa-pencil-alt mr-1"/> */}
                        </strong>
                      </div>
                      <p className='text-muted'>
                        {profile.business_name}
                      </p>
                      <hr />

                      <div style={{ width: '100%' }}>
                        <strong>
                          {/* <i className="fas fa-envelope mr-1"/> */}
                                Email
                                </strong>
                        <strong className='float-right'>
                          {/* <i className="fas fa-pencil-alt mr-1" onClick={()=>alert("To change email click cog icon at the corner top then click my account")}/> */}
                        </strong>
                      </div>
                      <p className='text-muted'>
                        {profile.email}
                      </p>
                      <hr />

                      <div style={{ width: '100%' }}>
                        <strong><i className='fas fa-map-marker-alt mr-1' />Alamat</strong>
                        <strong className='float-right'>
                          {/* <i className="fas fa-pencil-alt mr-1"/> */}
                        </strong>
                      </div>
                      <p className='text-muted'>{profile.address}</p>

                      {/* <hr/>

                        <strong><i className="far fa-file-alt mr-1"/>
                          Notes</strong>
                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Etiam fermentum enim neque.</p> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-8'>
                <div className='card card-primary'>
                  <div className='card-header' style={{ backgroundColor: 'gray' }}>
                    <h5 className='card-title'>Sampul gambar bisnis Anda</h5>
                  </div>

                  <div className='card-body'>
                    <img className='img-fluid' src={Images.MerchantBannerDefault} />
                    <h5 className='float-right'><strong>{profile.business_name}</strong></h5>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        <div className='card card-default' style={{ marginLeft: 10, marginRight: 10 }}>
          <div className='card-header'>
            <h3 className='card-title'>Instansi terkait Anda</h3>
          </div>
          <div className='row' style={{ marginLeft: 10, marginRight: 10 }}>
            {this.props.insitutions.map((r, i) =>
              (
                <div className='col-12 col-sm-6 col-md-3 mt-2'>
                  <div className='info-box'>

                  <span className='info-box-icon elevation-1' style={{ backgroundImage: `url(${Images.LogoRp})`, backgroundSize: 'cover' }}>
                      {/* <i className="fas fa-university"/> */}
                    </span>

                    <div className='info-box-content'>
                      <span className='info-box-number'>{r.business_name}</span>
                      <span className='info-box-text'>
                        <small>{r.email}</small>
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}

          </div>
        </div>

      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.rpmerchantprofile,
    insitutions: state.merchantrelatedinstitution.related_institutions
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchRelateInstitution: data => dispatch(RelatedActions.fetchRelatedInstitution(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageMerchantMyprofile)
