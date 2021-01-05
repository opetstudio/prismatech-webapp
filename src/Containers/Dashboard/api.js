
import moment from 'moment'
export const create = api => ({
  dashbaordFetch: (data, opt) => {
    const params = {}
    const resp = api.get('/plink/merchant/list', params)
    return resp
  },
  dailyTransactionSummary: (data, opt) => {
    console.log('hit dailyTransactionSummary')
    // let resp=fetch('http://192.168.1.7:8280/plink/query',
    // {
    //   headers: {
    //     'query': "select b.cd, b.nm, c.issuer_code, c.issuer_name, a.action_id, case when a.action_id='01' then 'Card Binding' when a.action_id='02' then 'Purchase' else 'Bind&Pay' end as action_name, count(1), sum(a.co_ccy_amt) from ecom_ecomm_latest_actv_log a, pay_inst b, mbdd_issuer c where a.co_dt > '2020-01-01' and a.merc_cd = b.cd and a.issuer_code = c.issuer_code group by b.cd, b.nm, c.issuer_code, c.issuer_name, a.action_id",
    //     'Content-Type': 'application/json'

    //   }})
    // .then(res => res.json())
    // .then((data) => {
    // resp=data
    // return data
    // })
    // .catch(console.log)
    // api.setHeader('query', "select a.nm as PROFIL_Name, a.addr as PROFIL_Address, d.nm as PROFIL_Country, a.inst_cat_cd as PROFIL_MCC, b.merchant_type as PROFIL_SIUP, b.merchant_reverse_domain as PROFIL_PKS, a.mt_postcode_cd as PROFIL_ZipCode, b.merchant_mobile_no as PROFIL_Phone, a.website as PROFIL_Website, b.merchant_email as CORRESPONDENT_Email, b.merchant_id as CHANNEL_MerchantKeyID, b.inst_cd as CHANNEL_MerchantID, b.frontend_callback_url as CHANNEL_FrontEndURL,  b.backend_callback_url as CHANNEL_BackEndURL, c.key_encrypt as CHANNEL_SecretKey, c.valid_from as CHANNEL_EffectiveDate,  c.valid_to as CHANNEL_ExpiredDate, case when a.is_inactive = 'N' then 'Active' else 'Expired' end as CHANNEL_Status from pay_inst a, ecom_merc_ecomm b, ecom_merc_ecomm_id c, mt_org_dir d where a.cd = b.inst_cd and c.merc_ecomm_id = b.id and d.cd = a.mt_country_cd and now() between c.valid_from and c.valid_to")
    // const resp = api.post('plink/query')
    const params = {}
    api.setHeader('query', "select b.cd, b.nm, c.issuer_code, c.issuer_name, a.action_id, case when a.action_id='01' then 'Card Binding' when a.action_id='02' then 'Purchase' else 'Bind&Pay' end as action_name, count(1), sum(a.co_ccy_amt) from ecom_ecomm_latest_actv_log a, pay_inst b, mbdd_issuer c where a.created_dt> '" + today() + "' and a.merc_cd = b.cd and a.issuer_code = c.issuer_code group by b.cd, b.nm, c.issuer_code, c.issuer_name, a.action_id")
    const resp = api.get('/plink/query')

    return resp
  },
  queryTransStatus: (data, opt) => {
    console.log('hit querytrans ')

    api.setHeader('query', "select case when a.pay_sts='PNDNG' then 'PENDING' when a.pay_sts='REJEC' then 'REJECT' else 'SETTLED' end as Payment_Status, count(1), sum(a.co_ccy_amt) from ecom_ecomm_latest_actv_log a, pay_inst b, mbdd_issuer c where a.created_dt > '" + today() + "' and a.merc_cd = b.cd and a.issuer_code = c.issuer_code group by a.pay_sts")
    const resp = api.get('/plink/query')
    return resp
  },
  hourlyTrend: (data, opt) => {
    console.log("hit hourlyTrend select to_char(a.created_dt,'HH24') as Hour, a.action_id, case when a.action_id='01' then 'Card Binding' when a.action_id='02' then 'Purchase' else 'Bind&Pay' end as action_name, case when a.pay_sts='PNDNG' then 'PENDING' when a.pay_sts='REJEC' then 'REJECT' else 'SETTLED' end as Payment_Status, count(1), sum(a.co_ccy_amt) from ecom_ecomm_latest_actv_log a, pay_inst b, mbdd_issuer c where to_char(a.created_dt,'YYYY-MM-DD') = '" + today() + "' and a.merc_cd = b.cd and a.issuer_code = c.issuer_code group by a.created_dt, a.action_id, a.pay_sts order by to_char(a.created_dt,'HH24'), a.action_id")
    api.setHeader('query', "select to_char(a.created_dt,'HH24') as Hour, a.action_id, case when a.action_id='01' then 'Card Binding' when a.action_id='02' then 'Purchase' else 'Bind&Pay' end as action_name, case when a.pay_sts='PNDNG' then 'PENDING' when a.pay_sts='REJEC' then 'REJECT' else 'SETTLED' end as Payment_Status, count(1), sum(a.co_ccy_amt) from ecom_ecomm_latest_actv_log a, pay_inst b, mbdd_issuer c where to_char(a.created_dt,'YYYY-MM-DD') = '" + today() + "' and a.merc_cd = b.cd and a.issuer_code = c.issuer_code group by a.created_dt, a.action_id, a.pay_sts order by to_char(a.created_dt,'HH24'), a.action_id")
    const resp = api.get('/plink/query')
    return resp
  },
  queryMerchant: (data, opt) => {
    console.log('hit querymerchant')
    api.setHeader('query', 'select a.cd,a.nm from pay_inst a, ecom_merc_ecomm b, ecom_merc_ecomm_id c where a.cd = b.inst_cd and c.merc_ecomm_id = b.id and now() between c.valid_from and c.valid_to')
    const resp = api.get('/plink/query')
    return resp
  },
  queryIssuer: (data, opt) => {
    console.log('hit queryIssuer')
    api.setHeader('query', 'select issuer_code,issuer_name from mbdd_issuer')
    const resp = api.get('/plink/query')
    return resp
  }
})

const today = () => {
  const bulan = moment(new Date().toDateString()).format('YYYY-MM-DD')

  console.log(moment(new Date().toDateString()).format('YYYY-MM-DD '), 'today')

  return bulan
  // return '2020-01-01'
}
