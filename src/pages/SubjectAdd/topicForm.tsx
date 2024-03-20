import { Button, Form, type FormProps, Input, Upload } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

type FieldType = {
  title?: string;
  desc?: string;
  img?: string[];
};

const TopicForm: React.FC = () => {
  const [form] = Form.useForm();
  
  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success:', values);
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

        <Form.Item<FieldType>
          label="描述"
          name="desc"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item<FieldType>
          label="图片"
          name="img"
        >
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存题目
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TopicForm;
