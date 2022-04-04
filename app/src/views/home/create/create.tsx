import * as React from 'react';
import { Modal } from 'antd';
import CreateForm from './create-form';
import { FormInstance } from 'antd/es/form';
import { FORM_NAME } from './constant';

interface CreateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  visible: boolean;
  createFile: (e: any) => void;
  cancel: () => void;
}

export default class Create extends React.Component<CreateProps> {
  formRef = React.createRef<FormInstance>();

  createNemDrama = () => {
    const keys = [FORM_NAME];
    const result = keys.reduce((prev, curr) => {
      prev[curr] = this.formRef.current!.getFieldValue(curr);
      return prev;
    }, {});
    this.props.createFile(result);
  };

  render() {
    const { visible = false, cancel } = this.props;
    return (
      <div>
        <Modal
          title="创建新剧本"
          visible={visible}
          onOk={() => this.createNemDrama()}
          onCancel={() => cancel()}
        >
          <CreateForm formRef={this.formRef}></CreateForm>
        </Modal>
      </div>
    );
  }
}
