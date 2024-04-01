import { AppDispatch } from '@/store';
import {
  LessonTreeType,
  getSubjectTree,
  getTopicList,
  selectActiveLesson,
  selectSubjectTree,
  setActiveLesson,
  setActiveTopic,
} from '@/store/slice/subject';
import React, { useEffect, ReactNode, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TreeSelect } from 'antd';
import get from 'lodash/get';
import TopicList from './topicList';
import TopicForm from './topicForm';

// 禁用含有children字段的项
const disableChildrenItem = (items: LessonTreeType[]) => {
  const _items = JSON.parse(JSON.stringify(items));
  return _items.map((item: LessonTreeType) => {
    if (item.children?.length && item.children?.length > 0) {
      // @ts-ignore
      item.disabled = true;
      item.children = disableChildrenItem(item.children);
    }
    return item;
  });
};

function SubjectAdd() {
  const dispatch: AppDispatch = useDispatch();
  // 学科列表
  const lessonTreeList = useSelector(selectSubjectTree);
  // 学科列表memo、使父级不能选择
  const lessonTreeListMemo = useMemo(() => {
    console.log('lessonTreeListMemo渲染～');
    return lessonTreeList?.length ? disableChildrenItem(lessonTreeList) : [];
  }, [lessonTreeList]);
  // 当前学科
  const currentLesson = useSelector(selectActiveLesson);

  // 获取课程树
  useEffect(() => {
    dispatch(getSubjectTree());
  }, []);

  // 获取题目列表
  useEffect(() => {
    if (!currentLesson?.value) return;
    dispatch(getTopicList(currentLesson.value));
  }, [currentLesson?.value]);

  const onLessonChange = (newValue: string, label: ReactNode[]) => {
    // 清空右侧form区
    dispatch(setActiveTopic(null));
    // 设置当前课程
    dispatch(
      setActiveLesson({
        title: label[0],
        value: newValue,
      })
    );
  };

  return (
    <div className="bg-white rounded pt-4 px-4 box-border">
      <div className="h-18 flex items-center pb-4 border-b-2 border-gray-100">
        <div className="w-1 h-5 bg-blue-600"></div>
        <div className="mx-3 min-w-[100px]">
          {currentLesson?.title || '请选择课程'}
        </div>
        <div className="w-60">
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            value={currentLesson?.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择试卷"
            allowClear
            treeDefaultExpandAll
            onChange={onLessonChange}
            treeData={lessonTreeListMemo}
          />
        </div>
        <div className="ml-3">
          <Button type="primary" onClick={() => dispatch(setActiveTopic(null))}>
            新增题目
          </Button>
        </div>
      </div>

      <div className="h-[40rem] flex">
        <div className="flex-1">
          <TopicList />
        </div>
        <div className="flex-1 py-4 pl-4 box-border">
          <TopicForm />
        </div>
      </div>
    </div>
  );
}

export default SubjectAdd;
