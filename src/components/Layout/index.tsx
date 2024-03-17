import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';
import useShowMenu from '@/hooks/useShowMenu';
import useShowHeader from '@/hooks/useShowHeader';
import usePathKey from '@/hooks/usePathKey';

const FULL_SCREEN_PATH_KEY = ['login'];

const Layout: React.FC = () => {
  const showMenu = useShowMenu();
  const showHeader = useShowHeader();
  const pathKey = usePathKey();

  if (FULL_SCREEN_PATH_KEY.includes(pathKey)) {
    return (
      <div className="layout">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="layout">
      {showHeader && (
        <div className="layout-header">
          <Header />
        </div>
      )}
      <div className="layout-content">
        {showMenu && (
          <div className="layout-nav">
            <Menu />
          </div>
        )}
        <div className="layout-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
