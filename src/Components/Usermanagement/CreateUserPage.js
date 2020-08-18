import React, { Component } from 'react'
// import Helmet from 'react-helmet'
// import ListAllUserTableComp from './ListAllUserTableComp'
// import TablePagination from '../Table/TablePagination'

// Import React Table
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

// import MaterialUiTable from './MaterialUiTable'
class CreateUserPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
    // window.TransactionListPageComponent()
  }

  componentDidMount () {
  }

  componentDidUpdate (prevProps) {
    // window.TransactionListPageComponent(this.props.listall)
  }

  render () {
    // console.log('render')
    return (
      <div className='content-wrapper'>
        {/* Content Header (Page header) */}
        <section className='content-header'>
          <h1>
      Add User
          </h1>
          <ol className='breadcrumb'>
            <li><a href='/#'><i className='fa fa-dashboard' /> Home</a></li>
            <li><a href='/#'>User</a></li>
            <li className='active'>Create User</li>
          </ol>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='box box-primary'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Information</h3>
                  <div className='box-tools pull-right'>
                    <button type='button' className='btn btn-box-tool' data-widget='collapse'><i className='fa fa-minus' />
                    </button>
                  </div>
                  {/* /.box-tools */}
                </div>
                {/* /.box-header */}
                <form className='form-horizontal'>
                  <div className='box-body'>
                    <div className='row'>
                      <div className='col-md-8'>
                        <div className='form-group'>
                          <label htmlFor='inputPassword3' className='col-sm-4 control-label'>User Email</label>
                          <div className='col-sm-8'>
                            <input type='password' className='form-control' id='inputPassword3' placeholder='Input User Email' />
                          </div>
                        </div>
                        <div className='form-group'>
                          <label htmlFor='inputPassword3' className='col-sm-4 control-label'>User Password</label>
                          <div className='col-sm-8'>
                            <input type='password' className='form-control' id='inputPassword3' placeholder='Input User Password' />
                          </div>
                        </div>
                        <div className='form-group'>
                          <label htmlFor='inputPassword3' className='col-sm-4 control-label'>Role</label>
                          <div className='col-sm-8'>
                            <input type='password' className='form-control' id='inputPassword3' placeholder='Support' disabled />
                          </div>
                        </div>
                        <div className='form-group'>
                          <label htmlFor='inputPassword3' className='col-sm-4 control-label'>Full Name</label>
                          <div className='col-sm-8'>
                            <input type='password' className='form-control' id='inputPassword3' placeholder='Input Full Name' />
                          </div>
                        </div>
                        <div className='form-group'>
                          <label htmlFor='inputPassword3' className='col-sm-4 control-label'>Phone</label>
                          <div className='col-sm-8'>
                            <input type='password' className='form-control' id='inputPassword3' placeholder='Input User Phone Number' />
                          </div>
                        </div>
                        <div className='form-group'>
                          <label htmlFor='inputPassword3' className='col-sm-4 control-label'>Address</label>
                          <div className='col-sm-8'>
                            <input type='password' className='form-control' id='inputPassword3' placeholder='Input Address' />
                          </div>
                        </div>
                        <div className='form-group'>
                          <label htmlFor='inputPassword3' className='col-sm-4 control-label' />
                          <div className='col-sm-8'>
                            <a href='/#' className='btn btn-primary btn-block'><b>SUBMIT</b></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* Main content */}
        {/* /.content */}
      </div>
    )
  }
}
export default CreateUserPage
