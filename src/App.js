import React from 'react';
import parse from "dogescript";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      jsText: '',
    }

    this.handleChangeForDoge = this.handleChangeForDoge.bind(this);
  }

  handleChangeForDoge(e) {
    this.setState({ jsText: parse(e.target.value) });
  }

  render() {
    return (
      <div>
        <h1> dogescript in the WOWser </h1>

        <p> type for great instant compile wow </p>
        <div>
          <p style={{position: 'absolute', marginLeft: '25%'}}>Dogescript</p>
          <p style={{position: 'absolute', marginLeft: '75%'}}>Javascript</p>
        </div>
        <br /><br /> <br />
        <div>
          <textarea
            style={{resize: 'none'}}
            onChange={this.handleChangeForDoge}
            className="dogescript"
            defaultValue={defaultDoge}
          />
          <textarea
            style={{resize: 'none'}}
            className="javascript"
            value={ this.state.jsText || parse(defaultDoge) }
          />
        </div>
      </div>
    );
  }
}


const defaultDoge = `
shh THIS IS DOGESCRIPT

very dogescript is 'such messy; very doge-friendly'

such woof much foo bar bat
plz console.loge with foo
    such nested
        plz console.loge with ['so', 'wow']
    wow
plz nested
wow

plz woof with 'multiple', 'doge', 'properties wow'

very cat is 'not a doge'

rly woof is 'doges only' and cat not 'doge' or cat is 'not a doge'
    plz console.loge with {such: 'doge'}
wow

module.exports is woof
`
