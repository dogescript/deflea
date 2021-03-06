import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Card layout that has the code source text area
 */
export class DogeCodeCard extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired
    }

    changeListener = (e) => {
        this.props.updateSource(e.target.value);
    }

    render() {

        const { title, source } = this.props

        return (
            <div style={{ border: '1px solid black', width: '25%', float: 'left', marginLeft: '1%', marginBotton: '1%' }}>
                <div style={{ textAlign: 'center', width: '100%', margin: '10px' }}>
                    <span>{title}</span>
                </div>
                <textarea rows='40'
                    style={{ wrap: 'off', marginLeft: '5%', width: '90%', rows: 25 }}
                    value={this.props.source}
                    onChange={this.changeListener}
                />
            </div>
        )
    }
}

export default DogeCodeCard
