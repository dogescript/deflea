import _ from 'lodash';
import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'

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

  loadTest(name, test)
  {
    console.log('TestName:' + name);
    console.log('Data:' + test.source);
    let dogeArea = document.querySelector('.dogescript')
    dogeArea.value=test.source;
    var event = new Event('input', { bubbles: true });
    dogeArea.dispatchEvent(event);
    let expectedJS = document.querySelector('.expected-javascript');
    expectedJS.value=test.expected;
  }

  render() {
    const testItems = Object.entries(this.props.tests).map(([k, v]) => {
      const className = v.status;
      let icon = null;

      switch(v.status)
      {
        case 'passed':
          icon = <FontAwesome
                  name='fa-check-circle'
                  className='fa-check-circle'
                  title={className}
                  style={{
                      marginRight:'10px',
                      color:'#3b823e',
                      fontSize:'24px',
                      verticalAlign:'middle'
                    }} />
          break;
        case 'failed':
          icon = <FontAwesome
                    name='fa-times-circle'
                    className='fa-times-circle'
                    title={className}
                    style={{
                        marginRight:'10px',
                        color:'#e23939',
                        fontSize:'24px',
                        verticalAlign:'middle'
                      }} />
          break;
        case 'skipped':
        icon = <FontAwesome
                  name='fa-exclamation-circle'
                  className='fa-exclamation-circle'
                  title={className}
                  style={{
                      marginRight:'10px',
                      color:'#dcb12f',
                      fontSize: '24px',
                      verticalAlign:'middle'
                    }} />
          break;
      }

      return (
        <div className={ 'item ' + className } key={k} onClick={() => this.loadTest(k,v)} style={{ margin: '2px' }}>
          {icon}
          <span style={{ verticalAlign:'middle' }}>{k}</span>
        </div>
      )
    });

    return (
      <div className='test-list' style={{ float:'left', width:'25%', background: '#dfe0e6' }}>
        {testItems}
      </div>
    )
  }
}
