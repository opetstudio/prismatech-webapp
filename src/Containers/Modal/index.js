import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import ModalActions, { ModalSelectors } from './redux'
import ModalCommon from '../../Components/Modal/ModalCommon'

class TheComponent extends React.PureComponent {
  render () {
    const { modalContent: content, modalTitle: title, modalFooter: footer } = this.props
    return <ModalCommon content={content} title={title} footer={footer} />
  }
}

export default connect(
  state => ({
    modalIsOpen: ModalSelectors.modalIsOpen(state.modal),
    modalTitle: ModalSelectors.modalTitle(state.modal),
    modalContent: ModalSelectors.modalContent(state.modal),
    modalFooter: ModalSelectors.modalFooter(state.modal)
  }),
  dispatch => ({
    openModal: query => dispatch(ModalActions.openModal(query)),
    closeModal: query => dispatch(ModalActions.closeModal(query))
  })
)(injectIntl(withRouter(TheComponent)))
