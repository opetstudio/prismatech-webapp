import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import DashboardActions from './redux'

export function * dashbaordFetch (api, action) {
  const { data } = action
  const response = yield call(api.dashbaordFetch, data.payload, {})
  const dashbaordFetchMSG = { ir: false, rc: path(['data', 'responseCode'], response), rm: path(['data', 'responseMessage'], response), rd: path(['data', 'responseDescription'], response) }
  console.log('dashbaordFetchMSG==>', dashbaordFetchMSG)

  yield put(DashboardActions.dashbaordFetch({ dashbaordFetchMSG }))
}
export function * dailyTransactionSummary (api, action) {
  
  const { data } = action
  const response = yield call(api.dailyTransactionSummary)
  
  const queryIssuer=yield call(api.queryIssuer)
  console.log(queryIssuer,'response queryisu');
  
  
  let query=response.data
  console.log("response dailyTransactionSummary", query ,response);
  const queryMerchant=yield call(api.queryMerchant)
  console.log(queryMerchant,'queryMerchant');


  let totalTransaction = 0
  let totalAmount = 0
  let channelMerchant = []
  let channelBank = []
  let totalTransactionSummary = []
  let totalAmountSummary = []
  let totalBankSummary = []
  let merchantPie = []
  var mapTs = new Map;
  mapTs.set("Card Binding",0)
  mapTs.set("Purchase",0)
  mapTs.set("Bind&Pay",0)
  var mapAs = new Map;
  mapAs.set("Card Binding",[0,0])
  mapAs.set("Purchase",[0,0])
  mapAs.set("Bind&Pay",[0,0])
  var mapBs = new Map;
  var mapBs = new Map;
  var mapMp = new Map;
  let chnlbnk=[]
  if(queryIssuer.ok){
    queryIssuer.data.forEach(element => {
      chnlbnk.push(element[1])
      mapBs.set(element[1],[0,0])
    });
  }
  if(queryMerchant.ok){
    queryMerchant.data.forEach(element => {
      channelMerchant.push(element[1])
      mapMp.set(element[1],[0,0])
    });
  }
  // add a item
  query.forEach((arr) => {
    totalTransaction += arr[6]
    totalAmount += arr[7]

    if (mapTs.has(arr[5])) {
      mapTs.set(arr[5], mapTs.get(arr[5]) + arr[6])
    } else {
      
      mapTs.set(arr[5], arr[6])
    }
    if (mapAs.has(arr[5])) {

      mapAs.set(arr[5], [mapAs.get(arr[5])[0] + arr[6], mapAs.get(arr[5])[1] + arr[7]])
    } else {
     

      mapAs.set(arr[5], [arr[6], arr[7]])

    }
    //by merchant
    if (mapMp.has(arr[1])) {

      mapMp.set(arr[1], [mapMp.get(arr[1])[0] + arr[6], mapMp.get(arr[1])[1] + arr[7]])
    } else {
     

      mapMp.set(arr[1], [arr[6], arr[7]])

    }
    if (mapBs.has(arr[3])) {
      mapBs.set(arr[3], [mapBs.get(arr[3])[0] + arr[6], mapBs.get(arr[3])[1] + arr[7]])
    } else {
     
      mapBs.set(arr[3], [arr[6], arr[7]])
    }
    // if(mapBs.has(arr[3])){
    //   mapBs.set(arr[3],mapBs.get(arr[3])+arr[7])
    // }else{ 
    //   console.log(arr[3],arr[7]);
    //   mapBs.set(arr[3],arr[7])
    // }
    // if(mapTs.has(arr[5])){

    //   mapTs.set(arr[5],mapTs.get(arr[5])+arr[6])
    // }else{ 
    //   console.log(arr[5],arr[6]);

    //   mapTs.set(arr[5],arr[6])

    // }
    // if(mapAs.has(arr[1])){

    //   mapAs.set(arr[1],mapAs.get(arr[1])+arr[7])
    // }else{ 
    //   console.log(arr[1],arr[7]);

    //   mapAs.set(arr[1],arr[7])

    // }

    // if(mapBs.has(arr[3])){
    //   mapBs.set(arr[3],mapBs.get(arr[3])+arr[7])
    // }else{ 
    //   console.log(arr[3],arr[7]);
    //   mapBs.set(arr[3],arr[7])
    // }

    // if (channelMerchant && channelMerchant.length === 0) {
    
    //   channelMerchant.push(arr[1]);
    // }
    // else {
    //   let tiada = true
    //   channelMerchant.forEach(cm => {
     

    //     if (cm != arr[1]) {
         

    //     } else {
    //       tiada = false
    //     }
    //   })
    //   if (tiada) { channelMerchant.push(arr[1]) }
    // }
    if (channelBank && channelBank.length === 0) {

      channelBank.push(arr[3]);
    }
    else {
      let tiada = true
      channelBank.forEach(cb => {
     
        if (cb != arr[3]) {
        
        } else {
          tiada = false
        }
      })
      if (tiada) { channelBank.push(arr[3]) }

    }

  })


  mapTs.forEach((v, k) => {

    totalTransactionSummary.push([k, v])
  })
  mapAs.forEach((v, k) => {
   
    let prcnt =  Math.round((v[0]  /  totalTransaction) * 100)
    totalAmountSummary.push([k, v[1], prcnt])
  })
  mapBs.forEach((v, k) => {
    
    let prcnt =0
    if(totalTransaction!==0)prcnt =  Math.round((v[0]  /  totalTransaction) * 100)
    
    totalBankSummary.push([k, v[1], prcnt])
  })
  mapMp.forEach((v, k) => {
    let prcnt =0
    if(totalTransaction!==0)prcnt =  Math.round((v[0]  /  totalTransaction) * 100)
    merchantPie.push([k, v[1], prcnt])
  })
  
 

    const queryTransStatus=yield call(api.queryTransStatus)
    const transStatus = queryTransStatus.data
    const arra=[["SETTLED", 0, 0,0],["PENDING", 0, 0,0],["REJECT", 0, 0,0]]
    var mapAss= new Map;
    arra.forEach(arr=>{
      mapAss.set(arr[0],arr)
    }
      
    )
        let total = 0;
        let arr=[]
        transStatus.forEach(val => {
          total+=val[1]
        })
        
        transStatus.forEach(val => {
          let prcnt =  Math.round((val[1] / totalTransaction) * 100)
          mapAss.set(val[0],[val[0],val[1],val[2],prcnt])
        })
        mapAss.forEach((v, k) => {

          arr.push(v)
       })    



        let dailyTransactionSummary= {
          totalTransaction: totalTransaction,
          totalAmount: totalAmount,
          channelMerchant: channelMerchant,
          // channelMerchant: ["Elevania", "Tokopedia"],
          // channelBank: channelBank,
          channelBank: chnlbnk,
          totalTransactionSummary: totalTransactionSummary,
          totalAmountSummary: totalAmountSummary,
          totalBankSummary: totalBankSummary, 
          query: arr,
          merchantPie:merchantPie
        }
        console.log(dailyTransactionSummary,'queryMerchant2');
  yield put(DashboardActions.dashboardPatch({ dailyTransactionSummary }))



}

export function * hourlyTrend (api, action) {
 
  const { data } = action
  const response = yield call(api.hourlyTrend)
  let query=response.data
  
  console.log("response TOHOURLYYY" ,response);
    

  let mapHour=new Map
  let mapCb=new Map
  let mapPurchase=new Map
  let mapBp=new Map
  let cardBinding = query.filter(t=>t[2]==='Card Binding');
  let cardBindingSettled=cardBinding.filter(t=>t[3]==='SETTLED');
  let cardBindingPending=cardBinding.filter(t=>t[3]==='PENDING');
  let cardBindingReject=cardBinding.filter(t=>t[3]==='REJECT');
  cardBinding.forEach((arr) => {

    if (mapCb.has(arr[0])) {
      mapCb.set(arr[0], mapCb.get(arr[0]) +arr[4])
    } else {
    
      mapCb.set(arr[0], arr[4])
    }
  })
  
  


  let purchase=query.filter(t=>t[2]==='Purchase');
  let purchaseSettled=purchase.filter(t=>t[3]==='SETTLED');
  let purchasePending=purchase.filter(t=>t[3]==='PENDING');
  let purchaseReject=purchase.filter(t=>t[3]==='REJECT');
  purchase.forEach((arr) => {

    if (mapPurchase.has(arr[0])) {
      mapPurchase.set(arr[0], mapPurchase.get(arr[0]) +arr[4])
    } else {
    
      mapPurchase.set(arr[0], arr[4])
    }
  })
  let bindAndPay=query.filter(t=>t[2]==='Bind&Pay');
  let bindAndPaySettled=bindAndPay.filter(t=>t[3]==='SETTLED');
  let bindAndPayPending=bindAndPay.filter(t=>t[3]==='PENDING');
  let bindAndPayReject=bindAndPay.filter(t=>t[3]==='REJECT');

  
  let  hourTransaction=[]
  bindAndPay.forEach((arr) => {
    
    if (mapBp.has(arr[0])) {
      mapBp.set(arr[0], mapBp.get(arr[0]) +arr[4])
    } else {
    
      mapBp.set(arr[0], arr[4])
    }
  })
  
  let dataSet=new Map().set("00",0).set("01",0).set("02",0).set("03",0).set("04",0).set("05",0).set("06",0).set("07",0).set("08",0).set("09",0).set("10",0).set("11",0)
  dataSet.set("12",0).set("13",0).set("14",0).set("15",0).set("16",0).set("17",0).set("18",0).set("19",0).set("20",0).set("21",0).set("22",0).set("23",0).set("24",0)
  mapCb.forEach((v,k) => {
    dataSet.set(k,v)
  })
  let dataSetCb=[]
  dataSet.forEach((v, k) => {
    dataSetCb.push(v)
  })


  let dataSet2=new Map().set("00",0).set("01",0).set("02",0).set("03",0).set("04",0).set("05",0).set("06",0).set("07",0).set("08",0).set("09",0).set("10",0).set("11",0)
  dataSet2.set("12",0).set("13",0).set("14",0).set("15",0).set("16",0).set("17",0).set("18",0).set("19",0).set("20",0).set("21",0).set("22",0).set("23",0).set("24",0)
  mapPurchase.forEach((v,k) => {
    dataSet2.set(k,v)
  })
  let dataSetPurchase=[]
  dataSet2.forEach((v, k) => {
    dataSetPurchase.push(v)
  })


  let dataSet3=new Map().set("00",0).set("01",0).set("02",0).set("03",0).set("04",0).set("05",0).set("06",0).set("07",0).set("08",0).set("09",0).set("10",0).set("11",0)
  dataSet3.set("12",0).set("13",0).set("14",0).set("15",0).set("16",0).set("17",0).set("18",0).set("19",0).set("20",0).set("21",0).set("22",0).set("23",0).set("24",0)
  mapBp.forEach((v,k) => {
    dataSet3.set(k,v)
  })
  let dataSetBp=[]
  dataSet3.forEach((v, k) => {
    dataSetBp.push(v)
  })


 
  query.forEach((arr) => {

    if (mapHour.has(arr[0])) {
      mapHour.set(arr[0], mapHour.get(arr[0]) +1)
    } else {
    
      mapHour.set(arr[0], 1)
    }
  })

  mapHour.forEach((v, k) => {

    hourTransaction.push([k, v])
  })
 
  
  
  const reducer = (accumulator, currentValue) => accumulator + currentValue[4];
  
  
 
  let hourlyTrend={
    cardBindingSettled:cardBindingSettled.reduce(reducer,0),
    cardBindingPending: cardBindingPending.reduce(reducer,0),
    cardBindingReject: cardBindingReject.reduce(reducer,0),
    purchaseSettled: purchaseSettled.reduce(reducer,0),
    purchasePending: purchasePending.reduce(reducer,0),
    purchaseReject: purchaseReject.reduce(reducer,0),
    bindAndPaySettled: bindAndPaySettled.reduce(reducer,0),
    bindAndPayPending: bindAndPayPending.reduce(reducer,0),
    bindAndPayReject: bindAndPayReject.reduce(reducer,0),
    hourTransaction:hourTransaction,
    dataSetCb:dataSetCb,
    dataSetPurchase:dataSetPurchase,
    dataSetBp:dataSetBp
  }
  
  
  yield put(DashboardActions.dashboardPatch({ hourlyTrend }))
}

 