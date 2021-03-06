import React from 'react';
import parse from 'dogescript';
import testManifest from '../assets/test-manifest.json'
import TestList from './components/TestList';

import CodeCard from './components/CodeCard';
import DogeCodeCard from './components/DogeCodeCard.js';


const defaultDoge = `
shh THIS IS DOGESCRIPT

very dogescript is 'such messy; very doge-friendly'

such woofy much foo bar bat
plz console.loge with foo
    such nested
        plz console.loge with ['so', 'wow']
    wow
plz nested
wow

plz woofy with 'multiple', 'doge', 'properties wow'

very cat is 'not a doge'

rly woofy is 'doges only' and cat not 'doge' or cat is 'not a doge'
    plz console.loge with {such: 'doge'}
wow
`

const parsedDoge = parse(defaultDoge);

export default class App extends React.Component {

  state = {
    jsText: '',
    debug: Object.keys(testManifest).length !== 0,
    tests: testManifest,
    currentDisplay: {
      dogescriptSource: defaultDoge,
      expectedSource: parsedDoge,
      javascriptSource: parsedDoge
    }
  }

  updateDogescriptSource = (source) => {
    const newJS = parse(source);

    this.setState({
      currentDisplay: {
        dogescriptSource: source,
        javascriptSource: newJS,
        // set expected source to same thing
        expectedSource: this.state.currentDisplay.expectedSource
      }
    });
  }

  loadTest = (test) => {

    // force a re-parse for debugging purposes
    const newJS = parse(test.source);
    const displayCode = {
      dogescriptSource: test.source,
      expectedSource: test.expected,
      javascriptSource: newJS
    }

    this.setState({ currentDisplay: displayCode });
  }

  render() {

    return (
      <div>
        <div>
          <h1> Deflea </h1>
          <p> type for great instant compile wow </p>
        </div>
        <div>
          <TestList show={this.state.debug} tests={testManifest} loadTest={this.loadTest} />
          <DogeCodeCard
            updateSource={this.updateDogescriptSource}
            title="doge"
            source={this.state.currentDisplay.dogescriptSource} />
          <CodeCard title="expected" source={this.state.currentDisplay.expectedSource} />
          <CodeCard title="js" source={this.state.currentDisplay.javascriptSource} />
        </div>
      </div>
    );
  }
}
