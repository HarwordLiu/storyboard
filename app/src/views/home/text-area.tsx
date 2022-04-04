import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Input } from 'antd';
import DramaList from './drama-list';
import { throttle } from 'lodash';

const { TextArea } = Input;

import './text-area.less';

export default class Home extends React.Component {
  state = {
    initValue: '',
  };
  tempValue: any = {};

  put = throttle((e) => {
    if (!this.tempValue || !this.tempValue.name || !this.tempValue.text) {
      return;
    }
    if (this.tempValue.text !== this.state.initValue) {
      $tools.put(e);
    }
  }, 2000);

  setInitValue(value: any) {
    this.tempValue = value;
    this.setState({ initValue: value.text });
  }

  componentDidMount() {
    $tools.list().then((e) => {
      return this.changeFile(e[0]);
    });
  }

  changeFile = async (item: any) => {
    this.put({ name: this.tempValue.name, text: this.state.initValue });
    $tools
      .get(item)
      .then((result) => {
        this.setInitValue(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  contentChange = (e: any) => {
    this.setState({ initValue: e.target.value });
    this.put({ name: this.tempValue.name, text: e.target.value });
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
