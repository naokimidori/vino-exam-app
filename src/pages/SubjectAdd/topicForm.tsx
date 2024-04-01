import { Alert, Button, Form, Input, Tag, message } from 'antd';
import type { FormProps } from 'antd';
import React, { useEffect, useState } from 'react';
import CustomUpload from './upload';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { uploadFileByCos } from '@/utils/uploadUtil';
import http from '@/utils/http';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTopicList,
  selectActiveLesson,
  selectActiveTopic,
  setActiveLesson,
  setActiveTopic,
} from '@/store/slice/subject';
import { AppDispatch } from '@/store';

type FieldType = {
  title?: string;
  desc?: string;
  img?: string[];
};

const TopicForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const currentLesson = useSelector(selectActiveLesson);
  const currentTopic = useSelector(selectActiveTopic);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleImgChange: UploadProps['onChange'] = async (
    fileInfo: UploadChangeParam
  ) => {
    setFileList(fileInfo.fileList.map(item => ({ ...item, status: 'done' })));
  };

  const resetForm = () => {
    form.resetFields();
    setFileList([]);
  };

  useEffect(() => {
    if (!currentTopic) {
      resetForm();
    } else {
      form.setFieldsValue({
        title: currentTopic.title,
        desc: currentTopic.desc,
        img: currentTopic.img,
      });
      if (currentTopic.img?.length) {
        setFileList(
          currentTopic.img?.map(url => {
            const fileName = url.split('/').at(-1)!;
            return {
              uid: fileName,
              name: fileName,
              status: 'done',
              url: '//' + url,
            };
          })
        );
      } else {
        setFileList([]);
      }
    }
  }, [currentTopic?._id]);

  // 组件卸载时把当前选择的数据删除
  useEffect(() => {
    return () => {
      dispatch(setActiveTopic(null));
      dispatch(setActiveLesson(null));
    };
  }, []);

  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    if (!currentLesson?.value) {
      message.error('请先选择课程');
      return;
    }

    setLoading(true);
    if (fileList.length) {
      // 需要上传的图片文件（如果没有则不用处理）
      const needUploadImgs = fileList.filter(file => !file.url);
      if (needUploadImgs.length) {
        const imgURLs = (await uploadFileByCos(fileList)) as string[];
        values.img = imgURLs;
      }
    } else {
      values.img = [];
    }
    try {
      let result;
      // 更新
      if (currentTopic) {
        const params = {
          title: values.title,
          desc: values.desc,
          img: values.img,
        };
        result = await http.patch(`/api/topic/${currentTopic._id}`, params);
      } else {
        // 新增
        const params = {
          ...values,
          twoId: currentLesson?.value,
        };
        result = await http.post('/api/topic', params);
      }

      setLoading(false);
      const { data } = result || {};
      if (data?.code !== 0) {
        message.error(data?.message || '系统异常，请稍后再试～');
        return;
      }

      message.success('题目保存成功');
      resetForm();
      // 刷新课程题目列表
      dispatch(getTopicList(currentLesson.value));
    } catch (error) {
      setLoading(false);
    }
  };

  const handleClose = () => {
    dispatch(setActiveTopic(null));
    resetForm();
  };

  return (
    <div className="rounded-lg h-full bg-slate-100 p-4">
      {!currentLesson && (
        <Alert
          className="mb-4"
          description="请先选择一门课程，否则无法保存题目！"
          type="warning"
          showIcon
        />
      )}
      <div className="flex items-center mb-8">
        <div className="w-1 h-5 bg-blue-600"></div>
        <span className="mx-3">题目详情</span>
        {currentTopic ? (
          <Tag color="volcano">修改</Tag>
        ) : (
          <Tag color="blue">新增</Tag>
        )}
      </div>

      <Form
        name="topic"
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="题干"
          name="title"
          rules={[{ required: true, message: '请输入' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="描述" name="desc">
          <Input.TextArea />
        </Form.Item>

        <Form.Item<FieldType> label="图片" name="img">
          <CustomUpload
            fileList={fileList}
            uploadProps={{
              onChange: handleImgChange,
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button
            loading={loading}
            disabled={loading}
            type="primary"
            htmlType="submit"
          >
            保存题目
          </Button>
          {currentTopic && (
            <Button type="default" className="ml-4" onClick={handleClose}>
              关闭
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default TopicForm;
