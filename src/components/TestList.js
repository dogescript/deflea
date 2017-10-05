import _ from "lodash";
import React from 'react'
import PropTypes from 'prop-types'

export default class TestList extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    tests: PropTypes.object.isRequired
  }

  static defaultProps = {
    show: false,
  }

  state = {
    showFailing: true,
    showPassing: true,
  }

  render() {
    const testItems = Object.entries(this.props.tests).map(([k, v]) => {
      const className = v.passed ? "passed" : "failed";
      return (
        <div className={ 'item ' + className } key={k}>
          <span>{k}</span>
          <span>{v.passed ? " Passed" : " Failed"}</span>
        </div>
      )
    });

    return (
      <div className="test-list">
        {testItems}
      </div>
    )
  }
}
