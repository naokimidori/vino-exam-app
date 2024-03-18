import React, { useState, useEffect } from 'react';

function SubjectAdd() {
  useEffect(() => {}, []);

  return (
    <header className="h-16 bg-gray-800 flex text-gray-300 px-5 mt-2">
      <a href="" className="mr-5 my-auto">
        <img src="./logo512.png" alt="" className="h-10" />
      </a>
      <nav className="flex items-center">
        <a
          href=""
          className="bg-black px-5 py-2 mx-1 rounded-lg hover:bg-black"
        >
          仪表盘
        </a>
        <a href="" className="px-5 py-2 mx-1 rounded-lg hover:bg-black">
          工程
        </a>
        <a href="" className="px-5 py-2 mx-1 rounded-lg hover:bg-black">
          团队
        </a>
        <a href="" className="px-5 py-2 mx-1 rounded-lg hover:bg-black">
          日历
        </a>
      </nav>
      <div className="ml-auto relative flex items-center group">
        <img
          className="rounded-full h-9"
          src="https://pic.imgdb.cn/item/65f6e5b99f345e8d033be1e3.png"
          alt=""
        />
        <div className="absolute bg-white text-gray-700 text-sm top-14 right-0 w-48 shadow-lg ring-1 ring-black ring-opacity-5 py-2 rounded-md scale-0 group-hover:scale-100 duration-300 origin-top-right">
          <a href="" className='block px-4 py-2 hover:bg-gray-100'>个人资料</a>
          <a href="" className='block px-4 py-2 hover:bg-gray-100'>设置</a>
          <a href="" className='block px-4 py-2 hover:bg-gray-100'>退出</a>
        </div>
      </div>
    </header>
  );
}

export default SubjectAdd;
