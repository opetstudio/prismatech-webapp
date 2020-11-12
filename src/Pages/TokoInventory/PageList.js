import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import { path } from 'ramda'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import ContentHeader from '../../Components/ContentHeader'
import LoginCheck from '../../Containers/Login/LoginCheck'
import { Table, Filter } from '../../features/TablePagination'
import AppConfig from '../../Config/AppConfig'
import { listallService, fields, listallPageTitle, createPageUrl, createNewButtonLabel, getColumns } from './Manifest'
import Loader from '../../Components/Loader/Loader'

import { generateHmac, getAccessToken } from '../../Utils/Utils'

function formUpdateStock ({ dataDetail, stateParams: { stateStockProduct, setStateStockProduct, stateLoadingUpdateStock }, submitUpdateStock }) {
  const p = dataDetail
  const inventoryId = p.inventories[0]._id
  return (
    <div className='input-group mb-0'>
      <input
        id={`stock_field_${inventoryId}`} type='number' className='form-control rounded-0' value={(() => {
          if (stateStockProduct['' + inventoryId] === undefined) return p.inventories[0].quantity
          return stateStockProduct['' + inventoryId]
        })()} onChange={(e) => setStateStockProduct({ ...stateStockProduct, ['' + inventoryId]: parseInt(e.target.value) })}
      />
      <span className='input-group-append'>
        {(() => {
          let isButtonDisabled = false
          if (stateStockProduct['' + inventoryId] === undefined || (stateStockProduct['' + inventoryId] === p.inventories[0].quantity)) isButtonDisabled = true
          if (stateLoadingUpdateStock['' + inventoryId]) {
            return (
              <button type='button' className='btn btn-info btn-flat' onClick={() => {}}>
                <Loader size={15} loading type='rpmerah' />
              </button>
            )
          }
          return (
            <button type='button' className='btn btn-info btn-flat' disabled={isButtonDisabled} onClick={() => submitUpdateStock({ value: stateStockProduct['' + inventoryId], id: inventoryId })}>
              Simpan
            </button>
          )
        })()}
      </span>
    </div>
  )
}

function Comp (props) {
  const [stateStockProduct, setStateStockProduct] = React.useState({})
  const [stateLoadingUpdateStock, setStateLoadingUpdateStock] = React.useState({})
  const stateParams = { stateStockProduct, setStateStockProduct, stateLoadingUpdateStock, setStateLoadingUpdateStock }
  const paginationConfig = {
    serviceName: listallService,
    fields: fields
  }

  const submitUpdateStock = ({ value, id }) => {
    console.log('submitUpdateStock===>', value)
    console.log('submitUpdateStock id===>', id)
    setStateLoadingUpdateStock({ ...stateLoadingUpdateStock, ['' + id]: true })
    const graphqlData = `
    mutation{
      updateTokoInventory(_id: "${id}",  quantity: ${value}) {
        error
        status
      }
    }
    `
    // const graphqlData = `mutation{updateTokoInventory(_id: "${id}", quantity: 5){error,status})}`
    const bodyQueryString = JSON.stringify({ query: graphqlData })
    console.log('bodyQueryString=====>', bodyQueryString)
    const requestOptions = {
      method: 'POST',
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', hmac: generateHmac(bodyQueryString), AccessToken: getAccessToken() },
      body: bodyQueryString
    }
    fetch(AppConfig.hostBackend + '/graphql', requestOptions)
      .then(response => response.json())
      .then(response => {
        // console.log('response updateTokoInventory===>', response.data.updateTokoInventory.status)
        const status = path(['data', 'updateTokoInventory', 'status'], response)
        setStateLoadingUpdateStock({ ...stateLoadingUpdateStock, ['' + id]: false })
        if (status === 200) window.callErrorToast('success', 'success')
        else window.callErrorToast('rubah stok gagal', 'error')
        // response.json()
        // return response.data.getAllTokoCartsBySessionId

        // window.callErrorToast(element.message, 'error')
        // window.callErrorToast('success', 'success')
      })
  }
  console.log('renderrrrr table')
  const columns = getColumns({ history: props.history, stateParams, formUpdateStock, submitUpdateStock })
  return (
    <ContentWrapper
      pageTitle={listallPageTitle}
      breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: listallPageTitle, link: null, isActive: true }]}
      contentHeaderTitle={listallPageTitle}
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Table
            paginationConfig={paginationConfig}
            columns={columns}
            // createHref={createPageUrl()}
            createNewButtonLabel={createNewButtonLabel}
          />
        </div>
      </div>
    </ContentWrapper>
  )
  // }
}
const mapStateToProps = (state, ownProps) => {
  return {
    userPrivileges: state.myprofile.user_privileges
  }
}
export default connect(mapStateToProps)(Comp)
