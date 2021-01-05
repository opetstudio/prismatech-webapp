import React, { PureComponent } from 'react'
// import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
// import _ from 'lodash'
// import TablepaginationActions from '../redux'
// import Loader from '../../../Components/Loader/Loader'
import DetailCon from '../containers/DetailCon'
class DetailComp extends PureComponent {
  render () {
    const {
      formTitle,
      children,
      childFunc,
      fields,
      upsertServiceName,
      detailServiceName,
      id
    } = this.props
    return (
      <div className='card'>
        <div className='card-header' data-card-widget='collapse'>
          <h3 className='card-title'>{formTitle}</h3>
          <div className='card-tools'>
            <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button>
          </div>
        </div>
        <div className='card-body'>
          <DetailCon
            upsertServiceName={upsertServiceName}
            detailServiceName={detailServiceName}
            fields={fields}
            childFunc={childFunc}
            id={id}
          >
            {children && children}
          </DetailCon>
        </div>
      </div>
    )
  }
}

export default injectIntl((props) => {
  var history = useHistory()
  return <DetailComp history={history} {...props} />
})
