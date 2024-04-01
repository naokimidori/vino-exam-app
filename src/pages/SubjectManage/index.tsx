import React, { useState, useEffect } from 'react';
import { Button, Popconfirm, Table, message } from 'antd';
import type { TableProps } from 'antd';
import SubjectFormModal from './SubjectFormModal';
import { useDispatch, useSelector } from 'react-redux';
import http from '@/utils/http';
import { getLessonList, lessonList } from '@/store/slice/subject';
import { AppDispatch } from '@/store';
import dayjs from 'dayjs';
import { TIME_FORMAT } from '@/common/constant';

export interface LessonDataType {
  _id: string;
  created: Date;
  oneId: string;
  oneName: string;
  twoName: string;
}

function SubjectManage() {
  const dispatch: AppDispatch = useDispatch();
  const list = useSelector(lessonList);
  const getListData = () => {
    dispatch(getLessonList());
  };

  const onDeleteLesson = async (id: string) => {
    const result = await http.delete(`/api/subject/two/${id}`)
    if (result?.data?.code === 0) {
      message.success('删除成功');
      getListData();
    }
  }

  const columns: TableProps<LessonDataType>['columns'] = [
    {
      title: '序号',
      dataIndex: '_id',
      width: 200,
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '课程类别',
      dataIndex: 'oneName',
      width: 200,
    },
    {
      title: '课程名称',
      dataIndex: 'twoName',
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      render: text => {
        return dayjs(text).format(TIME_FORMAT);
      },
    },
    {
      title: '操作',
      dataIndex: '_id',
      render: (text, record) => {
        return (
          <>
            <SubjectFormModal
              addSuccessHandler={getListData}
              modifyData={record}
            >
              <Button type="link">编辑</Button>
            </SubjectFormModal>

            <Popconfirm
              title="删除课程"
              description="你确定要删除该课程吗？该操作不可逆"
              onConfirm={() => onDeleteLesson(record._id)}
              okText="是"
              cancelText="否"
            >
              <Button type="text" danger>
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getListData();
  }, []);

  return (
    <div className="p-4 bg-white">
      <SubjectFormModal addSuccessHandler={getListData}>
        <Button type="primary">新增课程</Button>
      </SubjectFormModal>
      <Table
        className="pt-4"
        rowKey="_id"
        columns={columns}
        dataSource={list}
        pagination={false}
      />
    </div>
  );
}

export default SubjectManage;
