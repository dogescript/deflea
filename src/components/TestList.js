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

  render() {
    const testItems = Object.entries(this.props.tests).map(([k, v]) => {
      const className = v.passed ? 'passed' : 'failed';
      let icon = null;
      if(v.passed)
      {
        icon = <FontAwesome
                  name='fa-check-circle'
                  className='fa-check-circle'
                  title={className}
                  style={{
                      marginRight:'10px',
                      color:'#3b823e',
                      fontSize:'24px'
                    }} />
      }
      else {
        icon = <FontAwesome
                  name='fa-check-circle'
                  className='fa-exclamation-circle'
                  title={className}
                  style={{
                      marginRight:'10px',
                      color:'red',
                      fontSize:'24px'
                    }} />
      }

      return (
        <div className={ 'item ' + className } key={k}>
          {icon}
          <span>{k}</span>
        </div>
      )
    });

    return (
      <div className='test-list'>
        {testItems}
      </div>
    )
  }
}
