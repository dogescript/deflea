import _ from 'lodash';
import React from 'react'
import PropTypes from 'prop-types'
import TestListItem from './TestListItem'

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

  loadTestById = (testIdentifier) => {
    const test = this.props.tests[testIdentifier];

    this.props.loadTest(test);
  }

  render() {
    const testItems = Object.entries(this.props.tests).map(([k, v]) => {

      const simpleName = k.replace('test\\spec\\', '').replace(/\\/g, '/');
      return (
        <TestListItem
          name={simpleName}
          testIdentifier={k}
          status={v.status}
          loadTest={this.loadTestById}
          key={k}
        />
      )
    });

    return (
      <div className='test-list'
        style={{ float: 'left', width: '20%', background: '#dfe0e6' }}>
        {testItems}
      </div>
    )
  }
}
