// --- import list page entity ---
import _ from 'lodash'
// import { merge } from 'ramda'
import PageHome from '../Pages/Home/PageHome'
import LoginPageContainer from '../Pages/Login/PageLogin'
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

// Toko Product
import PageListProduct from '../Pages/Product/PageList'
import PageCreateProduct from '../Pages/Product/PageCreate'
import PageDetailProduct from '../Pages/Product/PageDetail'
import PageUpdateProduct from '../Pages/Product/PageUpdate'

// Tag
import PageListTag from '../Pages/Tag/PageList'
import PageCreateTag from '../Pages/Tag/PageCreate'
import PageDetailTag from '../Pages/Tag/PageDetail'
import PageUpdateTag from '../Pages/Tag/PageUpdate'
// Category
import PageListCategory from '../Pages/Category/PageList'
import PageCreateCategory from '../Pages/Category/PageCreate'
import PageDetailCategory from '../Pages/Category/PageDetail'
import PageUpdateCategory from '../Pages/Category/PageUpdate'
// Toko Online
import PageListTokoOnline from '../Pages/TokoOnline/PageList'
import PageCreateTokoOnline from '../Pages/TokoOnline/PageCreate'
import PageDetailTokoOnline from '../Pages/TokoOnline/PageDetail'
import PageUpdateTokoOnline from '../Pages/TokoOnline/PageUpdate'

// Toko Online
import PageListTokoTeam from '../Pages/TokoTeam/PageList'
import PageCreateTokoTeam from '../Pages/TokoTeam/PageCreate'
import PageDetailTokoTeam from '../Pages/TokoTeam/PageDetail'
import PageUpdateTokoTeam from '../Pages/TokoTeam/PageUpdate'

const createPage = ({ entity, entityTitle, ListAllComp, CreateComp, DetailComp, UpdateComp, params }) => ({
  ['/' + entity]: { route: '/' + entity, path: `/${entity}${params[1] ? '/' + params[1] : ''}`, title: entityTitle, component: ListAllComp },
  ['/' + entity + '/create']: { route: '/' + entity + '/create', path: `/${entity}/create${params[1] ? '/' + params[1] : ''}`, title: entityTitle + ' Create', component: CreateComp },
  ['/' + entity + '/detail']: { route: '/' + entity + '/detail', path: `/${entity}/detail${params[1] ? '/' + params[1] : ''}${params[0] ? '/' + params[0] : ''}`, title: entityTitle + ' Detail', component: DetailComp },
  ['/' + entity + '/update']: { route: '/' + entity + '/update', path: `/${entity}/update${params[1] ? '/' + params[1] : ''}${params[0] ? '/' + params[0] : ''}`, title: entityTitle + ' Update', component: UpdateComp }
})

export const lp = {
  '/home': { route: '/home', path: '/home', title: 'Home', component: PageHome },
  '/login': { route: '/login', path: '/login', title: 'Login', component: LoginPageContainer, isPublic: true },
  '/signup': { route: '/signup', path: '/signup', title: 'Signup', component: PageSignup, isPublic: true },
  '/forget-password': { route: '/forget-password', path: '/forget-password', title: 'Forget Password', component: ForgetPassword, isPublic: true },
  '/my-account': { route: '/my-account', path: '/my-account', title: 'My Account', component: MyAccount },
  '/my-profile': { route: '/my-profile', path: '/my-profile', title: 'My Profile', component: MyProfile },
  '/user': { route: '/user', path: '/user', title: 'User', component: PageUser },
  '/use/detail': { route: '/user/detail', path: '/user/detail/:_id', title: 'User Detail', component: PageDetailUser },
  // tag
  ...createPage({ entity: 'tag', entityTitle: 'Tag', ListAllComp: PageListTag, CreateComp: PageCreateTag, UpdateComp: PageUpdateTag, DetailComp: PageDetailTag, params: [':_id'] }),
  // product
  ...createPage({ entity: 'product', entityTitle: 'Produk', ListAllComp: PageListProduct, CreateComp: PageCreateProduct, UpdateComp: PageUpdateProduct, DetailComp: PageDetailProduct, params: [':_id'] }),
  // category
  ...createPage({ entity: 'category', entityTitle: 'Kategori', ListAllComp: PageListCategory, CreateComp: PageCreateCategory, UpdateComp: PageUpdateCategory, DetailComp: PageDetailCategory, params: [':_id'] }),
  // toko online
  ...createPage({ entity: 'tokoonline', entityTitle: 'Toko Online', ListAllComp: PageListTokoOnline, CreateComp: PageCreateTokoOnline, UpdateComp: PageUpdateTokoOnline, DetailComp: PageDetailTokoOnline, params: [':_id'] }),
  // role
  ...createPage({ entity: 'role', entityTitle: 'Role', ListAllComp: PageListRole, CreateComp: PageCreateRole, UpdateComp: PageUpdateRole, DetailComp: PageDetailRole, params: [':_id'] }),
  // privilege
  ...createPage({ entity: 'privilege', entityTitle: 'Privilege', CreateComp: PageCreatePrivilege, UpdateComp: PageUpdatePrivilege, DetailComp: PageDetailPrivilege, params: [':_id', ':role_id'] }),
  // toko team
  ...createPage({ entity: 'tokoteam', entityTitle: 'Toko Team', ListAllComp: PageListTokoTeam, CreateComp: PageCreateTokoTeam, UpdateComp: PageUpdateTokoTeam, DetailComp: PageDetailTokoTeam, params: [':_id', ':toko_id'] })
}
console.log('lp====>', lp)
export const pageList = _.map(lp, (v) => v)
export const getPage = (pageId) => lp[pageId] || {}
