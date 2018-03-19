import React from 'react';
import parse from 'dogescript';
import testManifest from '../assets/test-manifest.json'
import CodeInput from './components/CodeInput';
import TestList from './components/TestList';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      jsText: '',
      debug: Object.keys(testManifest).length !== 0,
    }

    this.handleChangeForDoge = this.handleChangeForDoge.bind(this);
  }

  handleChangeForDoge(e) {
    this.setState({ jsText: parse(e.target.value) });
  }

  render() {

    return (
      <div id="app">
        <div>
          <h1> dogescript in the WOWser </h1>
          <p> type for great instant compile wow </p>
        </div>

        <TestList show={this.state.debug} tests={testManifest}/>
        <CodeInput onChange={this.handleChangeForDoge} jsText={this.state.jsText} debug={this.state.debug}/>

      </div>
    );
  }
}
