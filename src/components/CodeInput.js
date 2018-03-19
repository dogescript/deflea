import React from 'react'
import PropTypes from 'prop-types'
import parse from 'dogescript';

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

export default class CodeInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }

  state = {}

  render() {
    return (
      <div className='code-input' style={{ float:'right', width: '75%' }} >
          <div style={{ border: '1px solid black', width: '32%', float: 'left', marginLeft:'1%', marginBotton:'1%' }}>
            <div style={{ textAlign: 'center', width: '100%', margin:'10px' }}>
              <span>Dogescript Source</span>
            </div>
            <textarea rows='40'
              style={{wrap: 'off',  marginLeft: '5%', width:'90%', rows:25}}
              onChange={(e) => this.props.onChange(e)}
              className="dogescript"
              defaultValue={defaultDoge}
            />
          </div>
          { this.props.debug &&
            <div style={{ border: '1px solid black', width: '32%', float: 'left', marginLeft:'1%', marginBotton:'1%'  }}>
              <div style={{ textAlign: 'center', width: '100%', margin:'10px' }}>
                  <span>Expected Javascript</span>
              </div>
              <textarea rows='40'
                style={{wrap: 'off', marginLeft: '5%', width:'90%'}}
                readOnly
                className="expected-javascript"
                defaultValue={ parse(defaultDoge) }
              />
            </div>
          }
          <div style={{ border: '1px solid black', width: '32%', marginLeft:'1%', float:'left', marginBotton:'1%' }}>
            <div style={{ textAlign: 'center', width: '100%', margin:'10px', rows:25}}>
                <span>Actual Javascript</span>
            </div>
            <textarea rows='40'
            style={{wrap: 'off',  marginLeft: '5%', width:'90%'}}
            readOnly
            value={this.props.jsText}
            className="actual-javascript"
            defaultValue= { parse(defaultDoge) }
            />
          </div>
      </div>
    )
  }
}
