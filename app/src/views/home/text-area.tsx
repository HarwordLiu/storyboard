import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Input } from 'antd';
import DramaList from './drama-list';

const { TextArea } = Input;

import './text-area.less';

export default class Home extends React.Component {
  state = {
    initValue: '',
  };

  componentDidMount() {
    $tools.list().then((e) => {
      return this.changeFile(e[0]);
    });
  }
  changeFile = async (item: any) => {
    $tools
      .get(item)
      .then((result) => {
        this.setState({ initValue: result });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  contentChange = (e: any) => {
    this.setState({ initValue: e.target.value });
  };
  render() {
    const { initValue } = this.state;
    return (
      <div className="text-content">
        <DramaList className="left" changeFile={this.changeFile} />
        <TextArea className="center" value={initValue} onInput={this.contentChange}></TextArea>
        <ReactMarkdown className="right" children={initValue} remarkPlugins={[remarkGfm]}></ReactMarkdown>
      </div>
    );
  }
}
