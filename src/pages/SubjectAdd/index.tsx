import { AppDispatch } from '@/store';
import {
  getSubjectTree,
  selectActiveTwo,
  selectSubjectTree,
  setActiveTwo,
} from '@/store/slice/subject';
import React, { useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TreeSelect } from 'antd';
import get from 'lodash/get';

function SubjectAdd() {
  const dispatch: AppDispatch = useDispatch();
  const subjectTreeData = useSelector(selectSubjectTree);
  const subjectActiveTwo = useSelector(selectActiveTwo);

  useEffect(() => {
    dispatch(getSubjectTree()).then((res: any) => {
      const initOne = get(res, 'payload[0].children[0]', {});
      dispatch(
        setActiveTwo({
          title: initOne.title,
          value: initOne.value,
        })
      );
    });
  }, []);

  const onChange = (newValue: string, label: ReactNode[]) => {
    dispatch(
      setActiveTwo({
        title: label[0],
        value: newValue,
      })
    );
  };

  return (
    <div className="bg-white rounded p-4 box-border h-[42rem]">
      <div className="h-18 flex items-center pb-4 border-b-2 border-gray-100">
        <div className="w-1 h-5 bg-blue-600"></div>
        <div className="mx-3 min-w-[100px]">{subjectActiveTwo.title}</div>
        <div className="w-60">
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            value={subjectActiveTwo?.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择课程"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            treeData={subjectTreeData}
          />
        </div>
        <div className="ml-3">
          <Button type="primary">新增课程</Button>
        </div>
      </div>

      <div className="h-[40rem]"></div>
    </div>
  );
}

export default SubjectAdd;
