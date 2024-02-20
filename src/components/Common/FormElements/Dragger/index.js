import React from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload, Form } from 'antd';
import './style.scss'
const Index = ({ listType, placeholder, label, notwrapInForm, name, validateTrigger, rules, valuePropName ,type,icon,maxCount,onChange,accept}) => {
  const { Dragger } = Upload;
  const props = {
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    beforeUpload: file => {
      const isExcelFile = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isExcelFile) { message.error(`You can only upload ${type} files!`); }
      return isExcelFile;
    },
    
    progress: {
      strokeColor: {
        '0%': '#E31837',
        '20%': '#E31837',
        '50%': '#E31837',
        '70%': '#E31837',
        '100%': '#E31837',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const FileUpload = (
    <>
      <Dragger listType={listType} {...props} type={type} name={name} maxCount={maxCount} onChange={onChange} accept={accept}>
        <p className="ant-upload-drag-icon">
          {icon?icon:<UploadOutlined />}
        </p>
        <p className="ant-upload-text">Drag and drop or <span>choose your file </span> to upload</p>
        <p className="ant-upload-hint">
         Only Allow these Types XLSX , XLS , CSV
     </p>
      </Dragger>

    </>
  );
  return !!notwrapInForm ? (
    <>{FileUpload}</>
  ) : (
    <Form.Item
      name={name}
      label={label}
      validateTrigger={validateTrigger || "onBlur"}
      rules={rules}
      valuePropName={valuePropName}
      getValueFromEvent={(e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      }}
    >
      {FileUpload}
    </Form.Item>
  );
 
}

export default Index