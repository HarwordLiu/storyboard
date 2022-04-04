import * as React from 'react';
import { List, Button } from 'antd';
import Create from './create';
import { FORM_NAME } from './create/constant';

interface DramaState {
  dramaList: any[];
  visible: boolean;
}

interface DramaProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  changeFile: (e: any) => void;
}

export default class DramaList extends React.Component<DramaProps> {
  state: DramaState = {
    dramaList: [],
    visible: false,
  };

  selected = (e: any) => {
    this.getList();
    this.props.changeFile(e);
  };

  async getList() {
    const data = await $tools.list();
    this.setState({ dramaList: data });
  }

  componentDidMount() {
    this.getList();
  }

  createModal = (visible: boolean) => {
    this.setState({ visible: visible });
  };

  createFile = (e: any) => {
    $tools
      .create(e)
      .then(() => {
        this.getList();
      })
      .then(() => {
        this.createModal(false);
      })
      .then(() => {
        this.props.changeFile({ name: e[FORM_NAME] });
      });
  };

  render() {
    const { dramaList, visible } = this.state;
    return (
      <div>
        <Button style={{ display: 'flex', margin: '0 auto' }} onClick={() => this.createModal(true)}>
          创建
        </Button>
        <List
          size="small"
          bordered
          dataSource={dramaList}
          renderItem={(item) => <List.Item onClick={() => this.selected(item)}>{item.name}</List.Item>}
        />
        <Create
          visible={visible}
          createFile={(e) => this.createFile(e)}
          cancel={() => this.createModal(false)}
        ></Create>
      </div>
    );
  }
}
