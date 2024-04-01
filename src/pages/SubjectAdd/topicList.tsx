import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTopicList,
  selectActiveTopic,
  selectActiveLesson,
  setActiveTopic,
  getTopicList,
  selectListLoading,
} from '@/store/slice/subject';
import { Button, Empty, Popconfirm, Spin, message } from 'antd';
import http from '@/utils/http';
import { AppDispatch } from '@/store';

const TopicList: React.FC = () => {
  const list = useSelector(selectTopicList);
  const listSpinning = useSelector(selectListLoading);

  const currentLesson = useSelector(selectActiveLesson);
  const currentTopic = useSelector(selectActiveTopic);
  const dispatch: AppDispatch = useDispatch();

  const onDeleteTopic = async (id: string) => {
    try {
      await http.delete(`/api/topic/${id}`);
      message.success('题目删除成功');

      // 如果当前选择的题目id和删除的id一致 则在删除成功后清空当前题目数据
      if (currentTopic?._id === id) {
        setActiveTopic(null);
      }
      dispatch(getTopicList(currentLesson!.value));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Spin spinning={listSpinning} className="mt-10">
      {list?.length ? (
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
      ) : (
        <Empty className='mt-10' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Spin>
  );
};

export default TopicList;
