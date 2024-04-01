import { Button, Form, Input, message } from 'antd';
import type { FormProps } from 'antd';
import React, { useState } from 'react';
import CustomUpload from './upload';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { uploadFileByCos } from '@/utils/uploadUtil';
import http from '@/utils/http';
import { useSelector } from 'react-redux';
import { selectActiveLesson } from '@/store/slice/subject';

type FieldType = {
  title?: string;
  desc?: string;
  img?: string[];
};

const TopicForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const currentLesson = useSelector(selectActiveLesson);  

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleImgChange: UploadProps['onChange'] = async (
    fileInfo: UploadChangeParam
  ) => {
    setFileList(fileInfo.fileList.map(item => ({ ...item, status: 'done' })));
  };

  const resetForm = () => {
    form.resetFields();
    setFileList([]);
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    
    if (!currentLesson?.value) {
      message.error('请先选择课程');
      return
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

    const params = {
      ...values,
      twoId: currentLesson?.value,
    }

    const result = await http.post('/api/topic', params);
    setLoading(false);
    const { data } = result || {};
    if (data?.code !== 0) {
      message.error(data?.message || '系统异常，请稍后再试～');
      return
    }

    message.success('题目保存成功');
    resetForm();
  };

  return (
    <div className="rounded-lg h-full bg-slate-100 p-4">
      <div className="flex items-center mb-8">
        <div className="w-1 h-5 bg-blue-600"></div>
        <span className="mx-3">题目详情</span>
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
        </Form.Item>
      </Form>
    </div>
  );
};

export default TopicForm;
