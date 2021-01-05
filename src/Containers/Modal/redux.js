// import React from 'react'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// const $ = window.jqueryBridge()

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  openModal: ['data'],
  closeModal: ['data'],
  setContent: ['data']
})

export const ModalTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  modalIsOpen: false,
  modalTitle: '',
  modalContent: '',
  modalFooter: () => {}
})

/* ------------- Selectors ------------- */

export const ModalSelectors = {
  modalIsOpen: (st) => st.modalIsOpen,
  modalTitle: (st) => st.modalTitle,
  modalContent: (st) => st.modalContent,
  modalFooter: (st) => st.modalFooter
}

/* ------------- Reducers ------------- */

export const setContent = (state, { data }) => state.merge({ modalContent: data })
export const openModal = (state, { data }) => {
  // $('#mbdd-modal-common').modal('show')
  return state.merge({ modalIsOpen: true, modalTitle: data.modalTitle, modalContent: data.modalContent, modalFooter: data.modalFooter })
}
export const closeModal = (state, { data }) => {
  // $('#mbdd-modal-common').modal('hide')
  return state.merge({ modalIsOpen: false, modalTitle: '', modalContent: '', modalFooter: () => {} })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CONTENT]: setContent,
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_MODAL]: closeModal
})
