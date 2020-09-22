import React, { Component, useEffect } from 'react'
import { Table, Update as Updateform } from '../../features/TablePagination'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import moment from 'moment'
import { path } from 'ramda'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import { getAccessToken } from '../../Utils/Utils'

let tablepaginationOnChangeFormFunc = null
const paginationConfig = {
  serviceName: 'getDetailSubject',
  updateServiceName: 'updateSubject',
  fields: 'title,_id,start_date,end_date,content1,created_at,updated_at,course_id{_id},created_by{full_name},updated_by{full_name}',
  redirectAfterCreate: '/course/detail/'
}

function UpdateCourse (props) {
  // Similar to componentDidMount
  useEffect(() => {
    // Update the document title using the browser API
    window.singleDatePicker('#start_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
      const x = document.getElementById('start_date')
      x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: new Date(par).getTime() })
    })
    window.singleDatePicker('#end_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
      const x = document.getElementById('end_date')
      x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
      tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: new Date(par).getTime() })
    })
    window.activateEditor({
      hostBackend: process.env.REACT_APP_BACKEND_BASE_URL,
      at: getAccessToken(),
      cb: (content) => {
        tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
      }
    })
  }, [])

  const { match, dataDetail } = props
  console.log('dataDetail=====>', dataDetail)
  const courseId = path([paginationConfig.serviceName, 'course_id', '_id'], dataDetail)

  return (
    <ContentWrapper
      pageTitle='Update Subject'
      breadcrumb={[
        { title: 'Home', link: '/home' },
        { title: 'Course', link: '/course', isActive: true },
        { title: 'Course Detail', link: `/course/detail/${courseId}`, isActive: true },
        { title: 'Subject Detail', link: `/subject/detail/${match.params._id}`, isActive: true },
        { title: 'Subject Update', link: null, isActive: true }
      ]}
      contentHeaderTitle='Update Subject'
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Updateform
            id={match.params._id}
            // cancelHref={`/course/detail/${match.params._id}`}
            formTitle='Update Subject'
            paginationConfig={paginationConfig}
            redirectAfterCreate='/subject/detail'
            child={(tablepaginationOnChangeForm, dataDetail, payload) => {
              // console.log('haloooooooo===>', dataDetail)
              // console.log('haloooooooo payload===>', payload)
              tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
              // currentDataDetail = dataDetail
              // if (startDate) startDate.value = path([paginationConfig.serviceName, 'start_date'], currentDataDetail)
              // if (title) title.value = path([paginationConfig.serviceName, 'title'], payload) // || path([paginationConfig.serviceName, 'title'], currentDataDetail)

              // tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'code', fieldValue: path([paginationConfig.serviceName, 'code'], dataDetail) || '' })
              let startDate = moment(path([paginationConfig.serviceName, 'start_date'], payload) || path([paginationConfig.serviceName, 'start_date'], dataDetail))
              if (startDate && startDate.isValid()) startDate = startDate.format('YYYY-MM-DD HH:mm:ss')
              else startDate = ''
              let endDate = moment(path([paginationConfig.serviceName, 'end_date'], payload) || path([paginationConfig.serviceName, 'end_date'], dataDetail))
              if (endDate && endDate.isValid()) endDate = endDate.format('YYYY-MM-DD HH:mm:ss')
              else endDate = ''

              return (
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label htmlFor='title'>title</label>
                      <input type='text' className='form-control' value={path([paginationConfig.serviceName, 'title'], payload) || path([paginationConfig.serviceName, 'title'], dataDetail) || ''} id='title' placeholder='Enter title' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'title', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='content1'>Short Description</label>
                      <textarea className='textarea' id='content1' placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} value={path([paginationConfig.serviceName, 'content1'], payload) || path([paginationConfig.serviceName, 'content1'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} />
                      {/* <input type='text' className='form-control' id='content1' placeholder='Enter content 1' value={path([paginationConfig.serviceName, 'content1'], payload) || path([paginationConfig.serviceName, 'content1'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} /> */}
                    </div>
                    {/* <div className='form-group'>
                      <label htmlFor='content2'>content2</label>
                      <input type='text' className='form-control' id='content2' placeholder='Enter content 2' value={path([paginationConfig.serviceName, 'content2'], payload) || path([paginationConfig.serviceName, 'content2'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content2', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='content3'>content3</label>
                      <input type='text' className='form-control' id='content3' placeholder='Enter content3' value={path([paginationConfig.serviceName, 'content3'], payload) || path([paginationConfig.serviceName, 'content3'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content3', fieldValue: e.target.value })} />
                    </div> */}
                    <div className='form-group'>
                      <label htmlFor='start_date'>start date</label>
                      <input type='text' className='form-control' id='start_date' placeholder='Enter start_date' value={startDate} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: e.target.value })} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='end_date'>end date</label>
                      <input type='text' className='form-control' id='end_date' placeholder='Enter end_date' value={endDate} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: e.target.value })} />
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

// class UpdateCoursexx extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {}
//   }

//   componentDidMount () {
//     window.singleDatePicker('#start_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
//       const x = document.getElementById('start_date')
//       x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
//       tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: new Date(par).getTime() })
//     })
//     window.singleDatePicker('#end_date', 'YYYY-MM-DD HH:mm:ss', (par) => {
//       const x = document.getElementById('end_date')
//       x.value = moment(par).format('YYYY-MM-DD HH:mm:ss')
//       tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: new Date(par).getTime() })
//     })
//     window.activateEditor({ hostBackend: process.env.REACT_APP_BACKEND_BASE_URL, at: getAccessToken(), cb: (content) => {
//       tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: content })
//     }})
//   }

//   render () {
//     const { match, dataDetail } = this.props
//     const courseId = path([paginationConfig.serviceName, 'course_id', '_id'], dataDetail)
//     return (
//       <ContentWrapper
//         pageTitle='Update Subject'
//         breadcrumb={[
//           { title: 'Home', link: '/home' },
//           { title: 'Course', link: '/course', isActive: true },
//           { title: 'Course Detail', link: `/course/detail/${courseId}`, isActive: true },
//           { title: 'Subject Detail', link: `/subject/detail/${match.params._id}`, isActive: true },
//           { title: 'Subject Update', link: null, isActive: true }
//         ]}
//         contentHeaderTitle='Update Subject'
//         isNeedLoggedin
//       >
//         <div className='row'>
//           <div className='col-md-12'>
//             <Updateform
//               id={match.params._id}
//               // cancelHref={`/course/detail/${match.params._id}`}
//               formTitle='Update Subject'
//               paginationConfig={paginationConfig}
//               redirectAfterCreate='/subject/detail'
//               child={(tablepaginationOnChangeForm, dataDetail, payload) => {
//                 // console.log('haloooooooo===>', dataDetail)
//                 // console.log('haloooooooo payload===>', payload)
//                 tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
//                 // currentDataDetail = dataDetail
//                 // if (startDate) startDate.value = path([paginationConfig.serviceName, 'start_date'], currentDataDetail)
//                 // if (title) title.value = path([paginationConfig.serviceName, 'title'], payload) // || path([paginationConfig.serviceName, 'title'], currentDataDetail)

//                 // tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'code', fieldValue: path([paginationConfig.serviceName, 'code'], dataDetail) || '' })
//                 let startDate = moment(path([paginationConfig.serviceName, 'start_date'], payload) || path([paginationConfig.serviceName, 'start_date'], dataDetail))
//                 if (startDate && startDate.isValid()) startDate = startDate.format('YYYY-MM-DD HH:mm:ss')
//                 else startDate = ''
//                 let endDate = moment(path([paginationConfig.serviceName, 'end_date'], payload) || path([paginationConfig.serviceName, 'end_date'], dataDetail))
//                 if (endDate && endDate.isValid()) endDate = endDate.format('YYYY-MM-DD HH:mm:ss')
//                 else endDate = ''

//                 return (
//                   <div className='row'>
//                     <div className='col-sm-6'>
//                       <div className='form-group'>
//                         <label htmlFor='title'>title</label>
//                         <input type='text' className='form-control' value={path([paginationConfig.serviceName, 'title'], payload) || path([paginationConfig.serviceName, 'title'], dataDetail) || ''} id='title' placeholder='Enter title' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'title', fieldValue: e.target.value })} />
//                       </div>
//                       <div className='form-group'>
//                         <label htmlFor='content1'>Short Description</label>
//                         <textarea className='textarea' id='content1' placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} value={path([paginationConfig.serviceName, 'content1'], payload) || path([paginationConfig.serviceName, 'content1'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} />
//                         {/* <input type='text' className='form-control' id='content1' placeholder='Enter content 1' value={path([paginationConfig.serviceName, 'content1'], payload) || path([paginationConfig.serviceName, 'content1'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} /> */}
//                       </div>
//                       {/* <div className='form-group'>
//                         <label htmlFor='content2'>content2</label>
//                         <input type='text' className='form-control' id='content2' placeholder='Enter content 2' value={path([paginationConfig.serviceName, 'content2'], payload) || path([paginationConfig.serviceName, 'content2'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content2', fieldValue: e.target.value })} />
//                       </div>
//                       <div className='form-group'>
//                         <label htmlFor='content3'>content3</label>
//                         <input type='text' className='form-control' id='content3' placeholder='Enter content3' value={path([paginationConfig.serviceName, 'content3'], payload) || path([paginationConfig.serviceName, 'content3'], dataDetail)} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content3', fieldValue: e.target.value })} />
//                       </div> */}
//                       <div className='form-group'>
//                         <label htmlFor='start_date'>start date</label>
//                         <input type='text' className='form-control' id='start_date' placeholder='Enter start_date' value={startDate} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'start_date', fieldValue: e.target.value })} />
//                       </div>
//                       <div className='form-group'>
//                         <label htmlFor='end_date'>end date</label>
//                         <input type='text' className='form-control' id='end_date' placeholder='Enter end_date' value={endDate} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'end_date', fieldValue: e.target.value })} />
//                       </div>
//                     </div>
//                   </div>
//                 )
//               }}
//             />
//           </div>
//         </div>
//       </ContentWrapper>
//     )
//   }
// }

const mapStateToProps = (state, ownProps) => {
  return {
    dataDetail: state.tablepagination.dataDetail
  }
}
export default connect(
  mapStateToProps,
  null
)(injectIntl(UpdateCourse))
