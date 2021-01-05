import React, { PureComponent, useEffect } from 'react'
// import { path } from 'ramda'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { injectIntl, FormattedMessage as T } from 'react-intl'
import Loader from '../../../Components/Loader/Loader'
import TablepaginationActions from '../redux'

class CardBody extends PureComponent {
  render () {
    const { tablepaginationOnChangeForm, payload, child } = this.props
    return child(tablepaginationOnChangeForm, payload)
  }
}
const Createform = React.memo(props => {
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
    redirectAfterCreateToParent,
    footerCard,
    tablepaginationResetForm,
    onSubmit,
    isNeedValidation,
    beforeSubmit,
    children,
    tablepaginationSetloading
  } = props
  const loading = props.loading || false
  //   const dataDetail = path(['dataDetail', paginationConfig.serviceName], props) || {}

  // Similar to componentDidMount
  useEffect(() => {
    console.log('useEffect=========')

    // window.loadValidator({})

    // Update the document title using the browser API
    return () => {
      tablepaginationResetForm({ serviceName: paginationConfig.serviceName })
    }
  }, [tablepaginationResetForm, paginationConfig.serviceName])
  console.log('Createform=========')

  const childrenWithProps = React.Children.map(children, child => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { tablepaginationOnChangeForm: tablepaginationOnChangeForm, payload })
    }
    return child
  })

  return (
    <>
      <form
        id={paginationConfig.serviceName}
        // role='form'
        onSubmit={(e) => {
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
            tablepaginationSetloading({ serviceName: paginationConfig.serviceName, isLoading: true })
            if (beforeSubmit) {
              beforeSubmit((p) => {
                const pl = { [paginationConfig.serviceName]: { ...payload[paginationConfig.serviceName], ...p } }
                tablepaginationSubmitForm({
                  fields: paginationConfig.fields,
                  payload: pl,
                  serviceName: paginationConfig.serviceName,
                  history,
                  redirectAfterCreate: redirectAfterCreate,
                  redirectAfterCreateToParent: redirectAfterCreateToParent
                })
              })
            } else {
              tablepaginationSubmitForm({
                fields: paginationConfig.fields,
                payload,
                serviceName: paginationConfig.serviceName,
                history,
                redirectAfterCreate: redirectAfterCreate,
                redirectAfterCreateToParent: redirectAfterCreateToParent
              })
            }
          }
        }}
        noValidate
        className={isNeedValidation && 'needs-validation'}
      >
        <div className='card'>
          <div className='card-header' data-card-widget='collapse'>
            <h3 className='card-title'><T id={formTitle} /></h3>
            <div className='card-tools'>
              <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button>
              {/* <button type='button' className='btn btn-tool' data-card-widget='remove'><i className='fas fa-times' /></button> */}
            </div>
          </div>
          <div className='card-body'>
            {child && <CardBody child={child} payload={payload} tablepaginationOnChangeForm={tablepaginationOnChangeForm} />}
            {!child && childrenWithProps}
          </div>
          <div className='card-footer'>
            {
              loading &&
                <Loader loading type='rpmerah' />
            }
            {!loading && footerCard && footerCard({ tablepaginationSubmitForm, payload })}
            {!loading && !footerCard && (
              <>
                <button disabled={loading} style={{ width: 100 }} type='button' className='btn bg-gradient-warning' onClick={e => history.goBack()}>Cancel</button>
                <button disabled={loading} style={{ width: 100, marginLeft: 5 }} type='submit' className='btn bg-gradient-primary'>Submit</button>
              </>
            )}

          </div>

        </div>
      </form>
    </>
  )
})

const mapStateToProps = (state, ownProps) => {
  const loading = state.tablepagination.loading[ownProps.paginationConfig.serviceName] || false
  const payload = state.tablepagination.payload[ownProps.paginationConfig.serviceName] || {}
  return {
    payload,
    loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tablepaginationSetloading: data => dispatch(TablepaginationActions.tablepaginationSetloading(data)),
    tablepaginationOnChangeForm: data => dispatch(TablepaginationActions.tablepaginationOnChangeForm(data)),
    tablepaginationSubmitForm: data => dispatch(TablepaginationActions.tablepaginationSubmitForm(data)),
    tablepaginationResetForm: data => dispatch(TablepaginationActions.tablepaginationResetForm(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Createform))
