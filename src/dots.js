import React from 'react'
import PropTypes from 'prop-types'

export default class Dots extends React.Component {
  onClick (key) {
    this.props.onClick && this.props.onClick(key)
  }

  getDots () {
    const dots = []
    for (let i = 0; i < this.props.length || 0; i++) {
      const style = {
        width: '5px',
        height: '5px',
        margin: '0 10px',
        borderRadius: '50%',
        display: 'inline-block',
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '2px'
      }

      if (i === this.props.activeDot) {
        style.background = '#FFFFFF'
      }

      dots.push(
        <li onClick={() => this.onClick(i)} style={style} key={i} />
      )
    }
    return dots
  }

  render () {
    const dots = this.getDots()
    const style = {
      zIndex: 2,
      left: '0',
      margin: '0',
      padding: '0',
      width: '100%',
      bottom: '10px',
      listStyle: 'none',
      textAlign: 'center',
      position: 'absolute'
    }
    return (
      <ul style={style}>
        {dots}
      </ul>
    )
  }
}

Dots.propTypes = {
  activeDot: PropTypes.number,
  length: PropTypes.number
}
