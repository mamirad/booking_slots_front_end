import { UploadOutlined } from '@ant-design/icons';

// Antd
import { Button, Upload , Form } from 'antd';

// Localization
import LOCALIZATION from "../../../../services/LocalizationService";

function ImageUpload ({placeholder,label,action,icon,buttonText,buttonType,listType,valuePropName,fileList,notwrapInForm,maxCount,required,validator,name,validateTrigger,onChange,type,accept}){
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      };
    let rules = [
        { required: required, message: LOCALIZATION.REQUIRED },
      ];
    
      // Custom Validations
      !!validator && rules.push({ validator });

    const imageUpload = (
        <Upload
          placeholder={placeholder || label}
          action={action}
          fileList={fileList}
          onChange={onChange}
          type={type}
          accept={accept}
          maxCount={maxCount}
          customRequest={dummyRequest}
          listType={listType}
        >
            <Button type={buttonType} icon={icon?icon:<UploadOutlined/>}>{buttonText}</Button>
            </Upload>
      );
      return !!notwrapInForm ? (
        <>{imageUpload}</>
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
          {imageUpload}
        </Form.Item>
      );
};
export default ImageUpload;