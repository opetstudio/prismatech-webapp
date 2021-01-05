import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { path } from 'ramda'
import PrivilegeActions from '../../features/Privilege/redux'

function PrivilegeCheckBox ({
  roleId,
  privilegeId,
  checkbox,
  loading,
  privilegeCheckboxOnClick,
  rolePrivilegeIds
}) {
  // local checked
  let localIsChecked = path([roleId, privilegeId], checkbox)
  // console.log('localIsChecked===>', localIsChecked)

  // server checked
  const serverIsChecked = _.find(rolePrivilegeIds, { _id: privilegeId })
  // console.log('serverIsChecked====>', serverIsChecked)

  if (typeof localIsChecked === 'undefined') {
    if (!_.isEmpty(serverIsChecked)) {
      // priv[p.cell.value] = true
      // console.log(`set ${p.cell.value} menjadi true`)
      privilegeCheckboxOnClick({ role_id: roleId, privilege_id: privilegeId, checked: true })
    } else {
      localIsChecked = false
    }
  }
  return (<input key={privilegeId} type='checkbox' className='form-check-input' onChange={(e) => { privilegeCheckboxOnClick({ role_id: roleId, privilege_id: privilegeId, checked: e.target.checked }) }} checked={localIsChecked} />)
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.privilege.loading,
    checkbox: state.privilege.checkbox
  }
}
const mapDispatchToProps = dispatch => {
  return {
    privilegeCheckboxOnClick: data => dispatch(PrivilegeActions.privilegeCheckboxOnClick(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivilegeCheckBox)
