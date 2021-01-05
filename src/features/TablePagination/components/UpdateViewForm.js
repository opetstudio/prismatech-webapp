import React, { PureComponent } from 'react'

export default class UpdateViewForm extends PureComponent {
  render () {
    const {
      child,
      tablepaginationOnChangeForm,
      dataDetail,
      payload,
      loading,
      userPrivileges
    } = this.props
    return (
      <>
        {child({ tablepaginationOnChangeForm, dataDetail, payload, loading, userPrivileges })}
      </>
    )
  }
}
