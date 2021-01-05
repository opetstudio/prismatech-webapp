import React, { useEffect, useCallback } from 'react'
import _ from 'lodash'
import { Table } from '../'

function Modal (props) {
  const { buttonModalLabel, whereCondition, buttonAddLabel, listallService, fields, columns } = props
  console.log('columnsssss===>', columns)
  return (
    <>
      <button type='button' class='btn btn-default' data-toggle='modal' data-target='#modal-listitem-table'>
        {buttonModalLabel}
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
                return (<button type='button' style={{ marginLeft: 5 }} className='btn btn-warning' data-dismiss='modal'> {buttonAddLabel} </button>)
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

function Comp (props) {
  const { whereCondition, buttonModalLabel, buttonAddLabel, listallService, fields, columns, onChange, defaultValue } = props
  const [listData, setListData] = React.useState(null)
  const [rows, setRows] = React.useState([])
  const callOnChange = useCallback((lData) => {
    setListData(lData)
    const listDataObj = JSON.parse(lData || '{}')
    // for(let i in listDataObj) {
    //   if((listDataObj[i] || {}).checked) currentVal.push((listDataObj[i] || {}).object)
    // }
    // onChange(currentVal)
    console.log('callonchangeee=>', lData)
    onChange(listDataObj)
  }, [onChange])
  useEffect(() => {
    if (!_.isEmpty(defaultValue)) {
      console.log('settttdefaultValuedefaultValuedefaultValuedefaultValue=>')
      // const v = {}
      // for (let i = 0; i <= defaultValue.length; i++) {
      //   const val = defaultValue[i]
      //   if (val) v['' + defaultValue[i]._id] = { checked: true, object: defaultValue[i] }
      // }
      setListData(JSON.stringify(defaultValue))
    }
  }, [defaultValue])
  const currentValue = JSON.parse(listData || '{}')
  const columnsArr = columns({ currentValue, setListData: callOnChange })
  const renderCheckbox = useCallback(({ currentValue, item }) => {
  // })
  // const renderCheckbox = ({ currentValue, item }) => {
    const p = item
    let val = {}
    if (currentValue !== undefined) val = currentValue
    if (val['' + p._id] === undefined) val['' + p._id] = {}
    if (val['' + p._id].object === undefined) val['' + p._id].object = {}
    return (
      <input
        type='checkbox' checked={val['' + p._id].checked} onChange={(e) => {
          console.log('checkboxcheckboxcheckboxcheckbox', e.target.checked)
          val['' + p._id].checked = e.target.checked
          val['' + p._id].object = p
          callOnChange(JSON.stringify(val || {}))
        }}
      />
    )
  }, [callOnChange])

  useEffect(() => {
    const r = []
    const currentValue = JSON.parse(listData || '{}')
    if (currentValue !== undefined) {
      for (var i in currentValue) {
        const v = currentValue[i]
        if (v.checked) {
          const p = v.object
          r.push(
            <tr>
              {columnsArr.map((i, k) => <td key={k}>{typeof (i.accessor) === 'string' ? p[i.accessor] : i.accessor(p)}</td>)}
              <td>
                {renderCheckbox({ currentValue, item: p })}
              </td>
            </tr>
          )
        }
      }
    }
    setRows(r)
  }, [listData, columnsArr, renderCheckbox])
  return (
    <>
      <div className='form-group'>
        <Modal
          buttonModalLabel={buttonModalLabel}
          buttonAddLabel={buttonAddLabel}
          listallService={listallService}
          fields={fields}
          columns={[
            ...columnsArr,
            {
              Header: ' ',
              accessor: p => {
                return renderCheckbox({ currentValue, item: p })
              }
            }
          ]}
          whereCondition={whereCondition}
        />
      </div>
      <div className='form-group'>
        <div className='table-responsive'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                {columnsArr.map((v, i) => <th key={i}>{v.Header}</th>)}
                <th style={{ width: 40 }} />
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default Comp
