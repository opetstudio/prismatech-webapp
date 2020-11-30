import React, { Component, useEffect } from 'react'
import { path } from 'ramda'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import TablepaginationActions from '../redux'

function Createform (props) {
  console.log('render Create.js')
  const history = useHistory()
  const {
    paginationConfig,
    child,
    tablepaginationOnChangeForm,
    formTitle,
    tablepaginationSubmitForm,
    payload,
    redirectAfterCreate,
    footerCard,
    tablepaginationResetForm,
    onSubmit,
    isNeedValidation,
    beforeSubmit
  } = props
  //   const dataDetail = path(['dataDetail', paginationConfig.serviceName], props) || {}

  // Similar to componentDidMount
  useEffect(() => {
    console.log('useEffect=========')

    // window.loadValidator({})

    // Update the document title using the browser API
    return () => {
      tablepaginationResetForm({ serviceName: paginationConfig.serviceName })
    }
  }, [])
  console.log('Createform=========')

  return (
    <>
      <div className='card'>
        <div className='card-header'>
          <h3 className='card-title'>{formTitle}</h3>
        </div>
        <form
          id={paginationConfig.serviceName} role='form' onSubmit={(e) => {
            const theForm = document.getElementById(paginationConfig.serviceName)
            if (e) e.preventDefault()
            if (isNeedValidation) {
              if (theForm.checkValidity() === false) {
                e.stopPropagation()
              }
              theForm.classList.add('was-validated')
            }
            if (onSubmit) onSubmit({ tablepaginationSubmitForm, payload })
            else {
              if(beforeSubmit) {
                beforeSubmit((p) => {
                  const pl = { [paginationConfig.serviceName]: { ...payload[paginationConfig.serviceName], ...p } }
                  tablepaginationSubmitForm({
                    fields: paginationConfig.fields,
                    payload: pl,
                    serviceName: paginationConfig.serviceName,
                    history,
                    redirectAfterCreate: redirectAfterCreate
                  })
                })
              } else {
                tablepaginationSubmitForm({
                  fields: paginationConfig.fields,
                  payload,
                  serviceName: paginationConfig.serviceName,
                  history,
                  redirectAfterCreate: redirectAfterCreate
                })
              }
            }
          }}
          novalidate
          className={isNeedValidation && 'needs-validation'}
        >
          <div className='card-body'>
            {child(tablepaginationOnChangeForm)}
          </div>
          <div className='card-footer'>
            {footerCard && footerCard({ tablepaginationSubmitForm, payload })}
            {!footerCard && (
              <>
                <button style={{ width: 100 }} type='button' className='btn bg-gradient-warning' onClick={e => history.goBack()}>Cancel</button>
                <button style={{ width: 100, marginLeft: 5 }} type='submit' className='btn bg-gradient-primary'>Submit</button>
              </>
            )}

          </div>
        </form>
      </div>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    payload: state.tablepagination.payload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tablepaginationOnChangeForm: data => dispatch(TablepaginationActions.tablepaginationOnChangeForm(data)),
    tablepaginationSubmitForm: data => dispatch(TablepaginationActions.tablepaginationSubmitForm(data)),
    tablepaginationResetForm: data => dispatch(TablepaginationActions.tablepaginationResetForm(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Createform))
