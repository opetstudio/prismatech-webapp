// import PropTypes from 'prop-types'
import React from 'react'
import AdminlteContainer from './AdminlteContainer'

const ResponsiveContainer = ({ children, appname, sidemenu }) => {
  return (<AdminlteContainer sidemenu={sidemenu}>{children}</AdminlteContainer>)
}
export default ResponsiveContainer
