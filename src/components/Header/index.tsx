import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white flex px-5 shadow-sm ring-1 ring-gray-700 ring-opacity-5">
      <a href="" className="mr-5 my-auto">
        <img
          src="https://pic.imgdb.cn/item/65f832959f345e8d03277c9f.png"
          alt=""
          className="h-10"
        />
      </a>
      <nav className="flex items-center text-slate-800">
        <a href="" className="px-5 py-2 mx-1 rounded-lg hover:bg-gray-100">
          仪表盘
        </a>
        <a href="" className="px-5 py-2 mx-1 rounded-lg hover:bg-gray-100">
          工程
        </a>
        <a href="" className="px-5 py-2 mx-1 rounded-lg hover:bg-gray-100">
          团队
        </a>
        <a href="" className="px-5 py-2 mx-1 rounded-lg hover:bg-gray-100">
          日历
        </a>
      </nav>
      <div className="ml-auto relative flex items-center group">
        <div className="flex items-center">
          <img
            className="rounded-full h-9 mr-2"
            src="https://pic.imgdb.cn/item/65f6e5b99f345e8d033be1e3.png"
            alt=""
          />
          <span>管理员</span>
        </div>
        <div className="absolute bg-white text-gray-700 text-sm top-14 right-0 w-48 shadow-lg ring-1 ring-black ring-opacity-5 py-2 rounded-md scale-0 group-hover:scale-100 duration-300 origin-top-right">
          <a href="" className="block px-4 py-2 hover:bg-gray-100">
            个人资料
          </a>
          <a href="" className="block px-4 py-2 hover:bg-gray-100">
            设置
          </a>
          <a href="" className="block px-4 py-2 hover:bg-gray-100">
            退出
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
