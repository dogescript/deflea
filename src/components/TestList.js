import _ from 'lodash';
import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
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

  constructor(props) {
    super(props);

    this.loadTest = this.loadTest.bind(this);
  }

  loadTest(name, test) {
    console.log('TestName:' + name);
    console.log('Data:' + test.source);
    let dogeArea = document.querySelector('.dogescript')
    dogeArea.value = test.source;
    var event = new Event('input', { bubbles: true });
    dogeArea.dispatchEvent(event);
    let expectedJS = document.querySelector('.expected-javascript');
    expectedJS.value = test.expected;
  }

  loadTestById = (testIdentifier) => {
    console.log(testIdentifier);
    console.log(this.props);

    console.log(this.props.tests[testIdentifier]);
    const test = this.props.tests[testIdentifier];

    this.loadTest(test.name, test);
  }

  render() {
    const testItems = Object.entries(this.props.tests).map(([k, v]) => {

      const simpleName = k.replace("test\\spec\\", "").replace('\\', '/');
      return (
        <TestListItem 
          name={simpleName}
          testIdentifier={k}
          status={v.status}
          loadTest={this.loadTestById}
          key={k}
        />
      )

      // const className = v.status;
      // let icon = null;

      // switch (v.status) {
      //   case 'passed':
      //     icon = <FontAwesome
      //       name='fa-check-circle'
      //       className='fa-check-circle'
      //       title={className}
      //       style={{
      //         marginRight: '10px',
      //         color: '#3b823e',
      //         fontSize: '24px',
      //         verticalAlign: 'middle'
      //       }} />
      //     break;
      //   case 'failed':
      //     icon = <FontAwesome
      //       name='fa-times-circle'
      //       className='fa-times-circle'
      //       title={className}
      //       style={{
      //         marginRight: '10px',
      //         color: '#e23939',
      //         fontSize: '24px',
      //         verticalAlign: 'middle'
      //       }} />
      //     break;
      //   case 'skipped':
      //     icon = <FontAwesome
      //       name='fa-exclamation-circle'
      //       className='fa-exclamation-circle'
      //       title={className}
      //       style={{
      //         marginRight: '10px',
      //         color: '#dcb12f',
      //         fontSize: '24px',
      //         verticalAlign: 'middle'
      //       }} />
      //     break;
      // }

      // return (
      //   <div className={'item ' + className} key={k} onClick={() => this.loadTest(k, v)} style={{ margin: '2px' }}>
      //     {icon}
      //     <span style={{ verticalAlign: 'middle' }}>{k}</span>
      //   </div>
      // )
    });

    return (
      <div className='test-list' style={{ float: 'left', width: '25%', background: '#dfe0e6' }}>
        <TestListItem
          name="var/very-is-much"
          status="passed"
          testIdentifier="test\spec\var\very-is-much"
          loadTest={this.loadTestById} />
        <TestListItem
          name="thename"
          status="failed"
          testIdentifier="2"
          loadTest={this.loadTestById}
        />
        <TestListItem
          name="thename"
          status="skipped"
          testIdentifier="3"
          loadTest={this.loadTestById} />
        {testItems}
      </div>
    )
  }
}
