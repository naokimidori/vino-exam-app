import React from 'react';
import { Space } from 'antd';
import styles from './index.module.scss';
import { LOGO } from '@/common/constant';

const Header: React.FC = () => {
  return (
    <div className={styles.pageHeader}>
      <img className={styles.logo} src={LOGO} alt="logo" />
      <Space className={styles.rightWrapper} size="middle">
        <img src="https://pic.imgdb.cn/item/65f6e5b99f345e8d033be167.png" alt="" />
        <div className={styles.user}>
          <img src="https://pic.imgdb.cn/item/65f6e5b99f345e8d033be1e3.png" alt="" />
          <span className={styles.userName}>管理员</span>
        </div>
      </Space>
    </div>
  );
};

export default Header;
