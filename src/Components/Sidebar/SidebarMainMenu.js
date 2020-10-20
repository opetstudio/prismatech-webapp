import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class SidebarMainMenu extends Component {
  render () {
    const { title, children, userPrivileges, name, icon } = this.props
    if (!userPrivileges.includes(name)) return null
    return (
      <li className='nav-item has-treeview'>
        <Link to='#' className='nav-link'>
          {!icon && <i className='nav-icon fas fa-cog' />}
          {icon && icon}
          <p>{title}
            <i className='fas fa-angle-left right' />
          </p>
        </Link>
        <ul className='nav nav-treeview'>
          {children}
        </ul>
      </li>
    )
  }
}
