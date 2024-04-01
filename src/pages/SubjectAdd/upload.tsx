import React from 'react';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';

type CustomUploadProps = {
  fileList: UploadFile[];
  uploadProps?: Partial<UploadProps>;
};

const CustomUpload: React.FC<CustomUploadProps> = ({
  fileList,
  uploadProps,
}) => {  
  const _props: UploadProps = {
    name: 'file',
    accept: '.jpg,.png,.jpeg',
    listType: 'picture-card',
    customRequest: () => {},
    maxCount: 1,
    ...(uploadProps || {}),
    onChange(info: UploadChangeParam) {      
      uploadProps?.onChange?.(info);
    },
  };

  return (
    <Upload {..._props} fileList={fileList}>
      {fileList.length < (_props?.maxCount || 1) && (
        <div>
          {false ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>上传图片</div>
        </div>
      )}
    </Upload>
  );
};

export default CustomUpload;
