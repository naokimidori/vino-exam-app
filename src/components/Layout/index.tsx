import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return(
    <div className="layout">
      <div className='layout-header'>
        header
      </div>
      <div className='layout-nav'>
        nav
      </div>
      <div className='layout-outlet'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
