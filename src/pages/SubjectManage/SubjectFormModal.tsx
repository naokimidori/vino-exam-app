import { Form, Input, Modal, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import http from '@/utils/http';
import { LessonDataType } from './index';

interface SubjectFormModalProps {
  children: React.ReactNode;
  addSuccessHandler?: () => void;
  modifyData?: LessonDataType;
}

type Course = {
  name: string;
  key: string;
  _id: string;
};

const SubjectFormModal: React.FC<SubjectFormModalProps> = props => {
  const { modifyData } = props;
  const isEditModel = !!modifyData;
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [option, setOption] = useState<Course[]>([]);

  const getLessonTypes = () => {
    setLoading(true);
    const abort = new AbortController();
    setTimeout(() => {
      http
        .get('/api/subject/one', { signal: abort.signal })
        .then(res => {
          return res.data.data;
        })
        .then(setOption)
        .catch(console.error)
        .finally(() => {
          setLoading(false);
        });
    }, 0);

    return abort;
  };

  const handleSave = () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async values => {
        console.log('保存', values);
        let res: any;
        if (modifyData) {
          res = await http.patch(`/api/subject/two/${modifyData._id}`, {
            ...values,
          });
        } else {
          res = await http.post('/api/subject/two', values);
        }
        if (res.data.code !== 0) {
          message.error(res.data.message || '保存失败');
        } else {
          message.success('保存成功');
          props?.addSuccessHandler?.();
          setVisible(false);
        }
      })
      .catch(console.error)
      .finally(() => setSubmitLoading(false));
  };

  useEffect(() => {
    if (visible) {
      const g = getLessonTypes();
      form.resetFields();
      if (isEditModel) {
        form.setFieldsValue({
          oneId: modifyData.oneId,
          twoName: modifyData.twoName,
        });
      }
      return () => {
        g.abort();
      };
    } else {
      form.resetFields();
    }
  }, [visible]);

  const handleOpen = () => {
    setVisible(true);
  };

  const withOpen = (node: React.ReactNode) => (
    <span onClick={handleOpen}>{node}</span>
  );

  return (
    <>
      {withOpen(props.children)}
      <Modal
        title={isEditModel ? '编辑课程' : '新增课程'}
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={handleSave}
        confirmLoading={submitLoading}
        okText="保存"
        cancelText="取消"
        maskClosable={false}
      >
        <Form form={form} className="pt-4" wrapperCol={{ span: 16 }}>
          <Form.Item
            label="课程类别"
            name="oneId"
            rules={[{ required: true, message: '请选择课程类别' }]}
          >
            <Select
              fieldNames={{ label: 'name', value: '_id' }}
              aria-label="name"
              loading={loading}
              options={option}
            />
          </Form.Item>
          <Form.Item
            label="课程名称"
            name="twoName"
            rules={[{ required: true, message: '请输入课程名称' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SubjectFormModal;
