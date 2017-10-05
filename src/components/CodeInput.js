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
      <div>
        <div>
          <p>Dogescript</p>
          <p>Javascript</p>
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
            defaultValue={ parse(defaultDoge) }
          />
          { this.state.debug &&
            <textarea
              style={{resize: 'none'}}
              className="javascript"
              defaultValue={ parse(defaultDoge) }
            />
          }
        </div>
      </div>
    )
  }
}
