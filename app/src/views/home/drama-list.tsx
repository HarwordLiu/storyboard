import * as React from 'react';
import { List, Button } from 'antd';

interface DramaState {
  dramaList: any[];
}

interface DramaProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  changeFile: (e: any) => void;
}

export default class DramaList extends React.Component<DramaProps> {
  state: DramaState = {
    dramaList: [],
  };

  selected = (e: any) => {
    this.props.changeFile(e);
  };
  componentDidMount() {
    $tools.list().then((e) => {
      this.setState({ dramaList: e });
    });
  }
  render() {
    const { dramaList } = this.state;
    return (
      <div>
        <Button>创建</Button>
        <List
          size="small"
          bordered
          dataSource={dramaList}
          renderItem={(item) => <List.Item onClick={() => this.selected(item)}>{item.name}</List.Item>}
        />
      </div>
    );
  }
}
