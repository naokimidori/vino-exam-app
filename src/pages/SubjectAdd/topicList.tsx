import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTopicList,
  selectActiveTopic,
  selectActiveLesson,
  setActiveTopic,
} from '@/store/slice/subject';
import { Button, Popconfirm } from 'antd';

const TopicList: React.FC = () => {
  const list = useSelector(selectTopicList);

  const currentLesson = useSelector(selectActiveLesson);
  const currentTopic = useSelector(selectActiveTopic);

  const dispatch = useDispatch();

  const onDeleteTopic = (id: string) => {};
  return (
    <ul className="max-h-full overflow-scroll pt-4">
      {list?.map((item, index) => (
        <li
          key={item._id}
          className={`rounded-md py-4 px-4 border-b-2 border-gray-50 flex cursor-pointer items-center ${
            currentTopic?._id === item._id ? 'bg-slate-100' : ''
          }`}
          onClick={() => dispatch(setActiveTopic(item))}
        >
          <span>{index + 1}、</span>
          <span className="flex-1">{item.title}</span>
          <Popconfirm
            title="删除题目"
            description="你确定要删除该题目吗？该操作不可逆"
            onConfirm={() => onDeleteTopic(item._id)}
            okText="是"
            cancelText="否"
          >
            <Button type="text" danger>
              删除
            </Button>
          </Popconfirm>
        </li>
      ))}
    </ul>
  );
};

export default TopicList;
