import React from 'react';
import parse from "dogescript";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      jsText: '',
    }

    this.handleChangeForDoge = this.handleChangeForDoge.bind(this);
    this.rundoge = this.rundoge.bind(this);
  }

  handleChangeForDoge(e) {
    this.setState({ jsText: parse(e.target.value) });
  }
  
  rundoge()
  {
   var source = this.state.jsText || parse(defaultDoge);
   console.log('executing:\n'+source);
   window.eval(source);
  }

  render() {
    return (
      <div>
        <h1> dogescript in the WOWser </h1>
        <h2> type for great instant compile wow or </h2>
        <button style={runButton} onClick={this.rundoge}>dose click for run!</button>
        <div>
          <p style={{position: 'absolute', marginLeft: '25%'}}>Dogescript</p>
          <p style={{position: 'absolute', marginLeft: '75%'}}>Javascript</p>
        </div>
        <br /><br /> <br />
        <div>
          <textarea
            style={textAreaStyle}
            onChange={this.handleChangeForDoge}
            className="dogescript"
            defaultValue={defaultDoge}
          />
          <textarea
            style={textAreaStyle}
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


const textAreaStyle = {
  maxWidth: '50%',
  'width':'49%',
   height: '600px',
  fontFamily: 'monospace',
  fontSize: '16px',
  WebkitBoxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  boxSizing: 'border-box',
  resize: 'none',
  marginLeft: '10px'
}

const runButton = {
  color: '#000!important',
  backgroundColor: '#ffeb3b!important',
  padding: '8px 16px',
  verticalAlign: 'middle',
  display: 'inline-block',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  border: '1px solid #ccc!important'
}