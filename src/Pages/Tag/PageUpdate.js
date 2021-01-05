import React, { Component } from 'react'
import { Update as Updateform } from '../../features/TablePagination'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import { injectIntl } from 'react-intl'
import { path } from 'ramda'
import AppConfig from '../../Config/AppConfig'
import { lp } from '../../Utils/Pages'
import { updatePageTitle, detailPageTitle, detailPageUrl, redirectAfterCreate, fields, detailService, updateService } from './Manifest'

const paginationConfig = {
  serviceName: detailService,
  updateServiceName: updateService,
  fields: fields
}

class Comp extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    const { appPatch } = this.props
    const title = (lp[window.location.pathname] || {}).title
    if (title) appPatch({ routeActive: window.location.pathname, pageTitle: title })
    else appPatch({ routeActive: window.location.pathname, pageTitle: updatePageTitle })
    // window.singleDatePicker('#start_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
    //   const x = document.getElementById('start_date')
    //   x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
    //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: new Date(par).getTime() })
    // })
    // window.singleDatePicker('#end_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
    //   const x = document.getElementById('end_date')
    //   x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
    //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: new Date(par).getTime() })
    // })
    // window.activateEditor({ hostBackend: AppConfig.hostBackend, at: getAccessToken(), cb: (content) => {
    //   tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
    // }})
    // tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'role_id', fieldValue: match.params.role_id })
  }

  render () {
    const { match } = this.props
    return (
      <ContentWrapper
        pageTitle={updatePageTitle}
        breadcrumb={[
          { title: 'Home', link: AppConfig.appHomePage },
          { title: detailPageTitle, link: detailPageUrl(match.params._id), isActive: true },
          { title: updatePageTitle, link: null, isActive: true }
        ]}
        contentHeaderTitle={updatePageTitle}
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Updateform
              id={match.params._id}
              cancelHref={detailPageUrl(match.params._id)}
              formTitle={updatePageTitle}
              paginationConfig={paginationConfig}
              redirectAfterCreate={redirectAfterCreate}
              child={(tablepaginationOnChangeForm, dataDetail, payload) => {
                // console.log('haloooooooo===>', dataDetail)
                // console.log('haloooooooo payload===>', payload)
                // tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
                // currentDataDetail = dataDetail
                // if (startDate) startDate.value = path([paginationConfig.serviceName, 'start_date'], currentDataDetail)
                // if (title) title.value = path([paginationConfig.serviceName, 'title'], payload) // || path([paginationConfig.serviceName, 'title'], currentDataDetail)

                // tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'code', fieldValue: path([paginationConfig.serviceName, 'code'], dataDetail) || '' })
                // let startDate = moment(path([paginationConfig.serviceName, 'start_date'], payload) || path([paginationConfig.serviceName, 'start_date'], dataDetail))
                // if (startDate && startDate.isValid()) startDate = startDate.format('YYYY-MM-DD HH:mm:ss')
                // else startDate = ''
                // let endDate = moment(path([paginationConfig.serviceName, 'end_date'], payload) || path([paginationConfig.serviceName, 'end_date'], dataDetail))
                // if (endDate && endDate.isValid()) endDate = endDate.format('YYYY-MM-DD HH:mm:ss')
                // else endDate = ''

                return (
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label htmlFor='name'>name</label>
                        <input type='text' className='form-control' id='name' placeholder='Enter name' value={path([paginationConfig.serviceName, 'name'], payload) || path([paginationConfig.serviceName, 'name'], dataDetail) || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'name', fieldValue: e.target.value })} />
                      </div>
                    </div>
                  </div>
                )
              }}
            />
          </div>
        </div>
      </ContentWrapper>
    )
  }
}
export default injectIntl(Comp)
