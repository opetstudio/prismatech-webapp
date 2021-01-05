import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import ModalActions from '../Modal/redux'
import PaginationActions, { PaginationSelectors } from './redux'
import { LoginSelectors } from '../Login/redux'

// const $ = window.jqueryBridge()
const modalContent = [
  'Data akan dihapus dari database.',
  'please wait....'
]
class DeleteRowButton extends Component {
  constructor (props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.renderDeleteModalFooter = this.renderDeleteModalFooter.bind(this)
  }

  openModal () {
    const { openModal } = this.props
    openModal({
      modalTitle: 'Delete Confirmation',
      modalContent: modalContent[0],
      modalFooter: () => this.renderDeleteModalFooter()
    })
  }

  renderDeleteModalFooter () {
    const { rowId, deleteRowById, table, userMerchantCode, deleteById } = this.props
    const arr = [
      (<button key={1} type='button' className='btn btn-default' data-dismiss='modal'>Cancel</button>),
      (<button key={2} type='button' className='btn btn-primary' onClick={() => deleteRowById({ id: rowId, table, userMerchantCode, deleteById })}>Delete</button>)
    ]
    return arr.map(r => r)
  }

  render () {
    const { deleteRowByIdMSG, setContentModal } = this.props
    const { ir, rd } = deleteRowByIdMSG

    if (ir) setContentModal(modalContent[1])
    else setContentModal(modalContent[0])

    if (rd !== '') setContentModal(rd)

    return (
      <button type='button' className='btn btn-danger' onClick={() => this.openModal()}>Delete</button>
    )
  }
}

export default connect((state, ownProps) => ({
  table: PaginationSelectors.table(state.pagination),
  deleteRowByIdMSG: PaginationSelectors.deleteRowByIdMSG(state.pagination),
  userMerchantCode: LoginSelectors.userMerchantCode(state.pagination)
}), (dispatch) => ({
  openModal: query => dispatch(ModalActions.openModal(query)),
  setContentModal: query => dispatch(ModalActions.setContent(query)),
  deleteRowById: query => dispatch(PaginationActions.deleteRowById(query))
}))(injectIntl(withRouter(DeleteRowButton)))
