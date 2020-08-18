import { all, takeEvery, takeLatest } from 'redux-saga/effects'
// You'll need to alter this file when you go to connect the api for realsies. Add
// back the lines ending with with a # (and of course, remove the #) :)
import API from '../Services/Api'
import RehydrationServices from '../Services/RehydrationServices'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import AppConfig from '../Config/AppConfig'

// Types /* ------------- Types ------------- */

import { LoginTypes } from '../Containers/Login/redux'

import { PaginationTypes, PaginationSelectors } from '../Containers/Pagination/redux'
// rp
import { SignupTypes } from '../features/Signup/redux'
import { TransactionHistoryTypes } from '../Containers/RpMerchant/Transaction/redux'
import { TopupEmoneyTypes } from '../Containers/RpMerchant/TopupEmoney/redux'
import { PaymentTypes } from '../Containers/RpMerchant/PayBill/redux'
import { MerchantQrTypes } from '../Containers/RpMerchant/ModalQrMerchant/redux'
import { MerchantProfileTypes } from '../Containers/RpMerchant/Profile/redux'
import { ForgetPasswordTypes } from '../Containers/ForgetPassword/redux'
import { ChangePasswordTypes } from '../Containers/RpMerchant/ModalChangePassword/redux'
import { DashboardMerchantTypes } from '../Containers/RpMerchant/Dashboard/redux'
import { SettlementTypes } from '../Containers/RpMerchant/Settlement/redux'
import { MerchantRelatedInstitutionTypes } from '../Containers/RpMerchant/MerchantRelatedInstitution/redux'
import { StartupTypes } from '../Redux/StartupRedux'
import { TablepaginationTypes } from '../features/TablePagination/redux'
import { CourseenrollmentTypes } from '../features/CourseEnrollment/redux'
import { PrivilegeTypes } from '../features/Privilege/redux'
// Sagas /* ------------- Sagas ------------- */

// begin Ignite-Entity-Login
import { loginDoLogin, doLogout } from '../Containers/Login/sagas'
import { courseenrollmentSubmitEnrollmentRequest } from '../features/CourseEnrollment/sagas'
import { tablepaginationFetchData, tablepaginationSubmitForm, tablepaginationFetchDataDetail, tablepaginationDeleteData } from '../features/TablePagination/sagas'
import { signupRequest } from '../features/Signup/sagas'
import { privilegeCheckboxSubmit } from '../features/Privilege/sagas'
import { fetchTransactionHistory } from '../Containers/RpMerchant/Transaction/sagas'
import { doTopupEmoney, doTopupByCode } from '../Containers/RpMerchant/TopupEmoney/sagas'
import { doPayment, doPaymentByCode } from '../Containers/RpMerchant/PayBill/sagas'
import { getMerchantQr } from '../Containers/RpMerchant/ModalQrMerchant/sagas'
import { fetchMerchantProfile } from '../Containers/RpMerchant/Profile/sagas'
import { doForgetPassword, doConfirmForgetPassword } from '../Containers/ForgetPassword/sagas'
import { doChangePassword } from '../Containers/RpMerchant/ModalChangePassword/sagas'
import { fetchMerchantDashboard } from '../Containers/RpMerchant/Dashboard/sagas'
import { fetchMerchantSettlement } from '../Containers/RpMerchant/Settlement/sagas'
import { fetchMerchantRelatedInsitution } from '../Containers/RpMerchant/MerchantRelatedInstitution/sagas'
import { startup } from './StartupSagas'

// changepassword
import { ChangepasswordTypes } from '../features/ChangePassword/redux'
import { changepasswordSubmit } from '../features/ChangePassword/sagas'
/* ------------- API ------------- */

const hostBackend = process.env.REACT_APP_BACKEND_BASE_URL

const apiDashboard = DebugConfig.useFixtures ? FixtureAPI : API.create(hostBackend)

const apiDashboardPy = DebugConfig.useFixtures ? FixtureAPI : API.create(hostBackend + '')

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // privilege
    takeLatest(PrivilegeTypes.PRIVILEGE_CHECKBOX_SUBMIT, privilegeCheckboxSubmit, apiDashboard),
    // Courseenrollment
    takeLatest(CourseenrollmentTypes.COURSEENROLLMENT_SUBMIT_ENROLLMENT_REQUEST, courseenrollmentSubmitEnrollmentRequest, apiDashboard),
    // Tablepagination
    takeEvery(TablepaginationTypes.TABLEPAGINATION_DELETE_DATA, tablepaginationDeleteData, apiDashboard),
    takeEvery(TablepaginationTypes.TABLEPAGINATION_FETCH_DATA_DETAIL, tablepaginationFetchDataDetail, apiDashboard),
    takeEvery(TablepaginationTypes.TABLEPAGINATION_SUBMIT_FORM, tablepaginationSubmitForm, apiDashboard),
    takeEvery(TablepaginationTypes.TABLEPAGINATION_FETCH_DATA, tablepaginationFetchData, apiDashboard),

    // login
    takeLatest(LoginTypes.LOGIN_DO_LOGIN, loginDoLogin, apiDashboard),

    // forget password
    takeLatest(ForgetPasswordTypes.DO_FORGET_PASS, doForgetPassword, apiDashboard),
    takeLatest(ForgetPasswordTypes.DO_CONFIRM_FORGET_PASS, doConfirmForgetPassword, apiDashboard),

    // logout
    takeLatest(LoginTypes.LOGIN_DO_LOGOUT, doLogout, apiDashboard),

    // payment
    takeLatest(PaymentTypes.DO_PAYMENT, doPayment, apiDashboard),
    takeLatest(PaymentTypes.DO_PAYMENT_BY_CODE, doPaymentByCode, apiDashboard),

    // topup emoney
    takeLatest(TopupEmoneyTypes.DO_TOPUP, doTopupEmoney, apiDashboard),
    takeLatest(TopupEmoneyTypes.DO_TOPUP_BY_CODE, doTopupByCode, apiDashboard),

    // get qr merchant
    takeLatest(MerchantQrTypes.GET_QR, getMerchantQr, apiDashboard),

    // fetch merchant profile
    takeLatest(MerchantProfileTypes.FETCH_PROFILE_DATA, fetchMerchantProfile, apiDashboard),

    // change password
    takeLatest(ChangepasswordTypes.CHANGEPASSWORD_SUBMIT, changepasswordSubmit, apiDashboard),

    // sign up
    takeLatest(SignupTypes.SIGNUP_REQUEST, signupRequest, apiDashboard),

    // fetch dashboard
    takeLatest(DashboardMerchantTypes.FETCH_MERCHANT_DASHBOARD, fetchMerchantDashboard, apiDashboard),

    // fetch transaction
    takeLatest(TransactionHistoryTypes.FETCH_TRANSACTION, fetchTransactionHistory, apiDashboard),

    // fetch realted institution
    takeLatest(MerchantRelatedInstitutionTypes.FETCH_RELATED_INSTITUTION, fetchMerchantRelatedInsitution, apiDashboard),

    // settlement
    takeLatest(SettlementTypes.FETCH_SETTLEMENT, fetchMerchantSettlement, apiDashboard)

    // some sagas receive extra parameters in addition to an action
    // takeLatest(UserTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
