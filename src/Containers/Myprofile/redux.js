import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  myprofileSetMyprofile: ['data'],
  reset: null
})
export const MyprofileTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  _id: '',
  user_id: '',
  full_name: '',
  email: '',
  username: '',
  user_privileges: [],
  role: ''
})
export const myprofileSetMyprofile = (state, { data }) => {
  console.log('data===>', data)
  const { myprofile, userPrivileges, role } = data
  return state.merge({ full_name: myprofile.full_name, email: myprofile.email, _id: myprofile._id, username: myprofile.username, user_id: myprofile.user_id, user_privileges: userPrivileges, role: role })
}
export const reducer = createReducer(INITIAL_STATE, {
  [Types.MYPROFILE_SET_MYPROFILE]: myprofileSetMyprofile,
  [Types.RESET]: (state) => INITIAL_STATE
})
