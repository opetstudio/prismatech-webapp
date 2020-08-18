import React, { Component } from 'react'

export default class ModalEnroll extends Component {
  render () {
    const {
      courseenrollmentSubmitEnrollmentRequest,
      courseId
    } = this.props
    return (
      <div className='modal fade' id='modal-enrollment'>
        <div className='modal-dialog'>
          <div className='modal-content bg-primary'>
            <div className='modal-header'>
              <h4 className='modal-title'>Enrollment Confirmation</h4>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <p>Anda akan melakukan request untuk pendaftarn Course ini. Selanjutnya team dari Course ini akan me-review dan melakukan approve enrollment. Terima kasih.</p>
            </div>
            <div className='modal-footer justify-content-between'>
              <button id='buttonCloseModalEnroll' type='button' className='btn btn-outline-light' data-dismiss='modal'>Cancel</button>
              <button type='button' className='btn btn-outline-light' onClick={() => courseenrollmentSubmitEnrollmentRequest({ courseId })}>Do Enroll</button>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
    )
  }
}
