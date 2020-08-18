import React, { Component } from 'react'
import _ from 'lodash'
// import Helmet from 'react-helmet'
// import { Colors } from '../../Themes'
import Loader from '../Loader/Loader'

let submitForm = false
let onChangeFlag = false
class FormUpdateLimitMerchant extends Component {
  constructor (props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this._onSubmitForm = this._onSubmitForm.bind(this)
    this._renderFormGroup = this._renderFormGroup.bind(this)
  }

  componentWillUnmount () {
    this.props.merchantRequestPatch({ isRequesting: false, responseCode: '', responseMessage: '', responseDescription: '', merchantUpdateMinMaxLimitMSG: { ir: false, rc: '', rm: '', rd: '' } })
  }

  componentDidMount () {
    this.props.merchantRequestPatch({ isRequesting: false, responseCode: '', responseMessage: '', responseDescription: '', merchantUpdateMinMaxLimitMSG: { ir: false, rc: '', rm: '', rd: '' } })
    this.props.merchantRequestMinMaxLimit({})
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      !_.isEqual(prevProps.userMerchantCode, this.props.userMerchantCode) &&
      !_.isEmpty(this.props.userMerchantCode)
    ) {
      this.props.merchantRequestMinMaxLimit({})
    }
  }

  handleOnChange (e, f) {
    console.log('handleOnChange===>', e)
    console.log('handleOnChange===>', e.target)
    console.log('handleOnChange===>', e.target.value)
    console.log('handleOnChange===>', e.target.id)
    onChangeFlag = true
    // const formBody = {
    //   merchantLimitMax: (this.refs.merchantLimitMax || {}).value || '',
    //   merchantLimitMin: (this.refs.merchantLimitMin || {}).value || ''
    // }
    // const formBody = {
    //   // merchantLimitMax: e.target.value,
    //   // merchantLimitMax: e.target.value
    // }
    this.props.merchantRequestPatch({ [e.target.id]: e.target.value })
  }

  _onSubmitForm (e) {
    // let bodyJson = {}
    // _.forIn(this.refs, (v, k) => {
    //   bodyJson[k] = v.value
    // })
    // console.log('bodyJson', bodyJson)
    submitForm = true
    if (onChangeFlag) {
      this.props.merchantUpdateMinMaxLimit({
        merchantLimitMin: parseInt(this.props.merchantLimitMin || 0),
        merchantLimitMax: parseInt(this.props.merchantLimitMax || 0)
      })
    }
    if (e) e.preventDefault()
  }

  _renderFormGroup (type, label, id, placeholder, options) {
    if (type === 'text' || type === 'number') {
      return (
        <div className='form-group'>
          <label>{label}</label>
          <input type={type} className='form-control' id={id} placeholder={placeholder} onChange={this.handleOnChange} value={parseInt(this.props[id] || 0)} />
        </div>
      )
    }
  }

  render () {
    // console.log('render')
    // console.log('FormUpdateLimitMerchant props', this.props)
    // const {
    //   merchantLimitMin,
    //   merchantLimitMax
    // } = this.props
    const {
      rd, rc
    } = this.props.merchantUpdateMinMaxLimitMSG || {}
    if (this.props.isRequesting) return <Loader loading />
    return (
      <form onSubmit={e => this._onSubmitForm(e)}>
        <div className='box box-primary'>
          <div className='box-header with-border'>
            <h3 className='box-title'>Merchant Limit</h3>
          </div>
          <div className='box-body'>
            {(submitForm && rd !== '' && rc === 'MBDD00') && (
              <div className='alert alert-success' role='alert'>
                {rd}
              </div>
            )}
            {(submitForm && rd !== '' && rc !== 'MBDD00') && (
              <div className='alert alert-danger' role='alert'>
                {rd}
              </div>
            )}
            <div className='row'>
              <div className='col-md-6'>
                <div className='box-body'>
                  {this._renderFormGroup('number', 'Merchant Max Limit', 'merchantLimitMax', 'Merchant Max Limit')}
                  {this._renderFormGroup('number', 'Merchant Min Limit', 'merchantLimitMin', 'Merchant Min Limit')}
                </div>
              </div>
              <div className='col-md-6'>
                <div className='box-body' />
              </div>
            </div>
          </div>
          <div className='box-footer'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
            {/* <button type="submit" className="btn btn-info pull-right">Sign in</button> */}
          </div>
        </div>
      </form>
    )
  }
}
export default FormUpdateLimitMerchant
