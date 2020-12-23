// --- import list page entity ---
import _ from 'lodash'
// import { merge } from 'ramda'
// import PageHome from '../Pages/Home/PageHome'
import LoginPageContainer from '../Pages/Login/PageLogin'
import PageCheckStatusPayment from '../Pages/CheckStatusPayment/PageCheckStatusPayment'
import ForgetPassword from '../Pages/ForgetPassword/ForgetPassword'
import MyAccount from '../Pages/MyAccount/PageMyAccount'
import MyProfile from '../Pages/MyProfile/PageMyProfile'
import PageSignup from '../Pages/Signup/PageSignup'
import PageUser from '../Pages/User/PageUser'
import PageDetailUser from '../Pages/User/PageDetailUser'
// role
import PageListRole from '../Pages/Role/PageRole'
import PageDetailRole from '../Pages/Role/DetailRole'
import PageUpdateRole from '../Pages/Role/PageUpdateRole'
import PageCreateRole from '../Pages/Role/PageCreateRole'

// privilege
// import PageListPrivilege from '../Pages/Privilege/PageCreatePrivilege'
import PageCreatePrivilege from '../Pages/Privilege/PageCreatePrivilege'
import PageUpdatePrivilege from '../Pages/Privilege/PageUpdatePrivilege'
import PageDetailPrivilege from '../Pages/Privilege/PageDetailPrivilege'

// // Toko Product
// import PageListProduct from '../Pages/Product/PageList'
// import PageCreateProduct from '../Pages/Product/PageCreate'
// import PageDetailProduct from '../Pages/Product/PageDetail'
// import PageUpdateProduct from '../Pages/Product/PageUpdate'

// Tag
import PageListTag from '../Pages/Tag/PageList'
import PageCreateTag from '../Pages/Tag/PageCreate'
import PageDetailTag from '../Pages/Tag/PageDetail'
import PageUpdateTag from '../Pages/Tag/PageUpdate'
// Category
// import PageListCategory from '../Pages/Category/PageList'
// import PageCreateCategory from '../Pages/Category/PageCreate'
// import PageDetailCategory from '../Pages/Category/PageDetail'
// import PageUpdateCategory from '../Pages/Category/PageUpdate'
// Toko Online
// import PageListTokoOnline from '../Pages/TokoOnline/PageList'
// import PageCreateTokoOnline from '../Pages/TokoOnline/PageCreate'
// import PageDetailTokoOnline from '../Pages/TokoOnline/PageDetail'
// import PageUpdateTokoOnline from '../Pages/TokoOnline/PageUpdate'

// Toko Online
// import PageListTokoTeam from '../Pages/TokoTeam/PageList'
// import PageCreateTokoTeam from '../Pages/TokoTeam/PageCreate'
// import PageDetailTokoTeam from '../Pages/TokoTeam/PageDetail'
// import PageUpdateTokoTeam from '../Pages/TokoTeam/PageUpdate'

// // Toko Po
// import PageListTokoPo from '../Pages/TokoPo/PageList'
// import PageDetailTokoPo from '../Pages/TokoPo/PageDetail'

// Toko Inventory
// import PageListTokoInventory from '../Pages/TokoInventory/PageList'
// import PageDetailTokoInventory from '../Pages/TokoInventory/PageDetail'

// lms course
// import PageListCourse from '../Pages/Course/PageCourse'
// import PageCreateCourse from '../Pages/Course/CreateCourse'
// import PageUpdateCourse from '../Pages/Course/UpdateCourse'
// import PageDetailCourse from '../Pages/Course/DetailCourse'
// import PagePublishedCourse from '../Pages/Course/PagePublishedCourse'
// lms student
// import PageListStudent from '../Pages/Student/PageStudent'

// lms subject
// import PageCreateSubject from '../Pages/Subject/CreateSubject'
// import PageDetailSubject from '../Pages/Subject/DetailSubject'
// import PageUpdateSubject from '../Pages/Subject/UpdateSubject'

// lms subject unit
// import PageCreateSubjectUnit from '../Pages/SubjectUnit/CreateSubjectUnit'
// import PageDetailSubjectUnit from '../Pages/SubjectUnit/DetailSubjectUnit'
// import PageUpdateSubjectUnit from '../Pages/SubjectUnit/UpdateSubjectUnit'

// lms grading
// import PageCreateGrading from '../Pages/Grading/PageCreateGrading'
// import PageDetailGrading from '../Pages/Grading/PageDetailGrading'
// import PageUpdateGrading from '../Pages/Grading/PageUpdateGrading'

import { pages } from '../../../manifest'

const createPage = ({ entity, entityTitle, ListAllComp, CreateComp, DetailComp, UpdateComp, params }) => ({
  ['/' + entity]: { route: '/' + entity, path: `/${entity}${params && params[2] ? '/' + params[2] : ''}${params && params[1] ? '/' + params[1] : ''}`, title: entityTitle, component: ListAllComp },
  ['/' + entity + '/create']: { route: '/' + entity + '/create', path: `/${entity}/create${params && params[2] ? '/' + params[2] : ''}${params && params[1] ? '/' + params[1] : ''}`, title: 'Buat ' + entityTitle + '', component: CreateComp },
  ['/' + entity + '/detail']: { route: '/' + entity + '/detail', path: `/${entity}/detail${params && params[2] ? '/' + params[2] : ''}${params && params[1] ? '/' + params[1] : ''}${params && params[0] ? '/' + params[0] : ''}`, title: '' + entityTitle, component: DetailComp },
  ['/' + entity + '/update']: { route: '/' + entity + '/update', path: `/${entity}/update${params && params[2] ? '/' + params[2] : ''}${params && params[1] ? '/' + params[1] : ''}${params && params[0] ? '/' + params[0] : ''}`, title: 'Ubah ' + entityTitle , component: UpdateComp }
})

const externalPages = () =>{
  let x = {}
  pages.forEach(v => {
    if(v.entity === undefined) x = { ...x, ...v }
    else x = { ...x, ...createPage(v)} 
  })
  return x
}

export const lp = {
  // '/dashboard-ecomm': { route: '/dashboard-ecomm', path: '/dashboard-ecomm', title: 'Plink Market Dashboard', component: PageHome },
  // '/dashboard-lms': { route: '/dashboard-lms', path: '/dashboard-lms', title: 'LMS Dashboard', component: PageHome },
  // '/dashboard-rpay': { route: '/dashboard-rpay', path: '/dashboard-rpay', title: 'RP Dashboard', component: PageHome },
  // '/home': { route: '/home', path: '/home', title: 'Beranda', component: PageHome },
  '/login': { route: '/login', path: '/login', title: 'Login', component: LoginPageContainer, isPublic: true },
  '/signup': { route: '/signup', path: '/signup', title: 'Signup', component: PageSignup, isPublic: true },
  '/forget-password': { route: '/forget-password', path: '/forget-password', title: 'Forget Password', component: ForgetPassword, isPublic: true },
  '/my-account': { route: '/my-account', path: '/my-account', title: 'My Account', component: MyAccount },
  '/my-profile': { route: '/my-profile', path: '/my-profile', title: 'My Profile', component: MyProfile },
  '/user': { route: '/user', path: '/user', title: 'User', component: PageUser },
  '/use/detail': { route: '/user/detail', path: '/user/detail/:_id', title: 'User Detail', component: PageDetailUser },
  // '/cek-satus-pembayaran': { route: '/cek-satus-pembayaran', path: '/cek-satus-pembayaran', title: 'Cek Status Pembayaran', component: PageCheckStatusPayment, isPublic: true },
  // lms course
  // ...createPage({ entity: 'course', entityTitle: 'Course', ListAllComp: PageListCourse, CreateComp: PageCreateCourse, UpdateComp: PageUpdateCourse, DetailComp: PageDetailCourse, params: [':_id'] }),
  // lms grading
  // ...createPage({ entity: 'grading', entityTitle: 'Grading', CreateComp: PageCreateGrading, UpdateComp: PageUpdateGrading, DetailComp: PageDetailGrading, params: [':_id', ':course_id'] }),
  // '/published-course': { route: '/published-course', path: '/published-course', component: PagePublishedCourse },
  // lms subject
  // ...createPage({ entity: 'subject', entityTitle: 'Subject', CreateComp: PageCreateSubject, UpdateComp: PageUpdateSubject, DetailComp: PageDetailSubject, params: [':_id', ':course_id'] }),
  // lms subject unit
  // ...createPage({ entity: 'subject-unit', entityTitle: 'Subject Unit', CreateComp: PageCreateSubjectUnit, UpdateComp: PageUpdateSubjectUnit, DetailComp: PageDetailSubjectUnit, params: [':_id', ':subject_id', ':course_id'] }),
  // lms student
  // ...createPage({ entity: 'student', entityTitle: 'Student', ListAllComp: PageListStudent, params: [':_id'] }),
  // tag
  ...createPage({ entity: 'tag', entityTitle: 'Tag', ListAllComp: PageListTag, CreateComp: PageCreateTag, UpdateComp: PageUpdateTag, DetailComp: PageDetailTag, params: [':_id'] }),
  // toko product
  // ...createPage({ entity: 'product', entityTitle: 'Produk', ListAllComp: PageListProduct, CreateComp: PageCreateProduct, UpdateComp: PageUpdateProduct, DetailComp: PageDetailProduct, params: [':_id'] }),
  // category
  // ...createPage({ entity: 'category', entityTitle: 'Kategori', ListAllComp: PageListCategory, CreateComp: PageCreateCategory, UpdateComp: PageUpdateCategory, DetailComp: PageDetailCategory, params: [':_id'] }),
  // toko online
  // ...createPage({ entity: 'tokoonline', entityTitle: 'Plink Market', ListAllComp: PageListTokoOnline, CreateComp: PageCreateTokoOnline, UpdateComp: PageUpdateTokoOnline, DetailComp: PageDetailTokoOnline, params: [':_id'] }),
  // role
  ...createPage({ entity: 'role', entityTitle: 'Role', ListAllComp: PageListRole, CreateComp: PageCreateRole, UpdateComp: PageUpdateRole, DetailComp: PageDetailRole, params: [':_id'] }),
  // privilege
  ...createPage({ entity: 'privilege', entityTitle: 'Privilege', CreateComp: PageCreatePrivilege, UpdateComp: PageUpdatePrivilege, DetailComp: PageDetailPrivilege, params: [':_id', ':role_id'] }),
  // toko team
  // ...createPage({ entity: 'tokoteam', entityTitle: 'Toko Team', ListAllComp: PageListTokoTeam, CreateComp: PageCreateTokoTeam, UpdateComp: PageUpdateTokoTeam, DetailComp: PageDetailTokoTeam, params: [':_id', ':toko_id'] }),
  // toko po
  // ...createPage({ entity: 'purchaseorder', entityTitle: 'Data Pembelian', ListAllComp: PageListTokoPo, DetailComp: PageDetailTokoPo, params: [':_id'] }),
  // toko inventory
  // ...createPage({ entity: 'inventory', entityTitle: 'Inventaris', ListAllComp: PageListTokoInventory, DetailComp: PageDetailTokoInventory, params: [':_id'] }),
  ...externalPages()
}
// console.log('lp====>', lp)

export const pageList = _.map(lp, (v) => v)
export const getPage = (pageId) => lp[pageId] || {}
