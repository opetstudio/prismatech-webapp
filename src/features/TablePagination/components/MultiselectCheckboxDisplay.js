import React from 'react'
// import styled from 'styled-components'
import { Table } from '../'
function App (props) {
  const { whereCondition, buttonAddLabel, listallService, fields, columns } = props
  // const rows = []
  return (
    <>
      <button type='button' class='btn btn-default' data-toggle='modal' data-target='#modal-listitem-table'>
        {buttonAddLabel}
      </button>
      <div className='modal fade bd-example-modal-lg' id='modal-listitem-table' aria-hidden='true' style={{ display: 'none' }}>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>

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
                return (<button type='button' style={{ marginLeft: 5 }} className='btn btn-warning' data-dismiss='modal'> Pilih </button>)
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
