import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header';
import Menu from '../Menu';
import useShowMenu from '@/hooks/useShowMenu';
import useShowHeader from '@/hooks/useShowHeader';


const Layout: React.FC = () => {

  const showMenu = useShowMenu();
  const showHeader = useShowHeader();

  return (
    <div className="layout">
      {showHeader && (
        <div className='layout-header'>
          <Header />
        </div>
      )}
      <div className='layout-content'>
        {showMenu && (
          <div className='layout-nav'>
            <Menu />
          </div>
        )}
        <div className='layout-outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
