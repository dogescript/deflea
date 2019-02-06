import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'

export class TestListItem extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    testIdentifier: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    loadTest: PropTypes.func.isRequired
  }

  handleOnClick = (id) => {
    this.props.loadTest(id);
  }

  render() {
    const { status, name, testIdentifier } = this.props;
    return (
      <div onClick={this.handleOnClick.bind(this, testIdentifier)} >
        <span>{statusIcons[status]}</span><span>{name}</span>
      </div>
    )
  }
}

const iconStyle = {
  fontSize: '24px',
  verticalAlign: 'middle',
  marginRight: '10px',
  marginLeft: '5px'
}

const passIconName = 'fa-check-circle'
const passIcon = <FontAwesome name={passIconName}
  className={passIconName}
  title={passIconName}
  style={{
    ...iconStyle,
    color: '#3b823e'
  }} />

const failIconName = 'fa-times-circle'
const failIcon = <FontAwesome
  name={failIconName}
  className={failIconName}
  title={failIconName}
  style={{
    ...iconStyle,
    color: '#e23939',
  }} />

const skipIconName = 'fa-exclamation-circle'
const skipIcon = <FontAwesome
  name={skipIconName}
  className={skipIconName}
  title={skipIconName}
  style={{
    ...iconStyle,
    color: '#dcb12f'
  }} />

const statusIcons = {
  'passed': passIcon,
  'failed': failIcon,
  'skipped': skipIcon
}

export default TestListItem
