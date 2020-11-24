import React, { Component, memo, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import _ from 'lodash'
import styled from 'styled-components'
import { path } from 'ramda'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import TablepaginationActions from '../redux'
import Immutable from 'seamless-immutable'
import { Table } from '../'

const Styles = styled.div`
  padding: 1rem;
  .pagination {
    padding: 0.5rem;
  }
`

function App (props) {
  const { whereCondition, buttonAddLabel, listallService, fields, columns, onSubmit, serviceName, tablepaginationOnChangeForm, fieldName, currentValue } = props
  const rows = []
  return (
    <>
      <button type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-listitem-table">
          {buttonAddLabel}
        </button>
      <div className="modal fade" id="modal-listitem-table" aria-hidden="true" style={{display: 'none'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            
            <Table
              paginationConfig={{
                serviceName: listallService,
                fields: fields
              }}
              whereCondition={whereCondition}
              columns={[
                ...columns
              ]}
              // createHref={`/privilege/create/${match.params._id}`}
              // createNewButtonLabel='Set Privileges'
              cardHeader={() => {
                return (
                  <>
                    {/* <button type='button' className='btn btn-info' onClick={() => history.push(`/privilege/create/${match.params._id}`)}><i className='fas fa-plus' /> Create New Privilege</button>
                    <button type='button' style={{ marginLeft: 5 }} className='btn btn-warning' onClick={() => privilegeCheckboxSubmit({ privilegeIdsObj: privilegeCheckbox[match.params._id] || {}, roleId: match.params._id })}><i className='fas fa-plus' /> Submit Privilege </button> */}
                  </>
                )
              }}
              cardFooter={() => {
                return (<button type='button' style={{ marginLeft: 5 }} className='btn btn-warning' data-dismiss="modal"><i className='fas fa-plus' /> Close </button>)
              }}
            />
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
    </div>
    </>
  )
}

export default App
