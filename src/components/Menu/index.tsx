import React, { useEffect, useState } from 'react';
import { Menu as AntdMenu } from 'antd';
import type { MenuProps } from 'antd';
import { STUDENT_MENUS, SUPER_ADMIN_MENUS } from '@/common/menuConfig';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '@/routes';
import usePathKey from '@/hooks/usePathKey';

const Menu: React.FC = () => {
  const items = SUPER_ADMIN_MENUS;

  const navigate = useNavigate();
  const pathKey = usePathKey();

  const [current, setCurrent] = useState('');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    routesConfig.forEach((route) => {
      if (route.path.split('/')[1] === e.key) {
        navigate(route.path);
      }
    });
  };

  useEffect(() => {
    if (pathKey) {
      setCurrent(pathKey);
    }
  }, [])

  return (
    <AntdMenu className='rounded' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  )
}

export default Menu

