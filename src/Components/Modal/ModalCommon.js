import React, { Component } from 'react'

export default class ModalCommon extends Component {
  render () {
    const { content, title, footer } = this.props
    return (
      <div className='modal fade' id='mbdd-modal-common'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>{title}</h4>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              {/* {content && isValidElement(content) && content} */}
              {/* {content && !isValidElement(content) && (<p>{content}</p>)} */}
              {typeof content === 'function' && content()}
              {typeof content !== 'function' && content}
            </div>
            {footer && (
              <div className='modal-footer justify-content-between'>
                {typeof footer === 'function' && footer()}
                {typeof footer !== 'function' && footer}
              </div>
            )}
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
    )
  }
}
