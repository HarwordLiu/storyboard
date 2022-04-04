import * as React from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/es/form';
import { FORM_NAME, FORM_PATH } from './constant';

interface CreateFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  formRef: React.RefObject<FormInstance<any>>;
}

const layout = {
  labelCol: { span: 4 },
};

export default class Create extends React.Component<CreateFormProps> {
  render() {
    const {} = this.props;
    return (
      <div>
        <Form {...layout} title="create" ref={this.props.formRef}>
          <Form.Item name={FORM_NAME} label="剧本名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {/* <Form.Item name={FORM_PATH} label="剧本目录" rules={[{ required: false }]}>
            <Input />
          </Form.Item> */}
        </Form>
      </div>
    );
  }
}
