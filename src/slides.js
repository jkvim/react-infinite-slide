import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { ArrowLeft, ArrowRight } from './arrows'
// import AlloyFinger from 'alloyfinger';
import { mapIndexToTop, mapIndexToBottom } from './utils'
import Transition from 'react-transition-group/Transition'
import TransitionGroup from 'react-transition-group/TransitionGroup'

const transitionStyle = {
  display: 'flex',
  transition: 'left 0.5s ease-in'
}

export default class Slides extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 0,
      direction: 'left'
    }
  }

  handleSlideToLeft = () => {
    console.log('click left')
    const { active } = this.state
    this.setState({
      active: active - 1
    })
  }

  handleSlideToRight = () => {
    console.log('click right')
    const { active } = this.state
    this.setState({
      active: active + 1
    })
  }

  render () {
    const { children } = this.props
    const { active } = this.state
    const positiveSeq = Children.toArray(children)
    const oppositeSeq = positiveSeq.reverse()
    const positiveIndex = mapIndexToTop(active, positiveSeq.length - 1)
    const oppositeIndex = mapIndexToBottom(active, positiveSeq.length - 1)
    const positiveStyle = {
      ...transitionStyle,
      zIndex: 1,
      left: positiveIndex === 0 ? 0 : `-${positiveIndex * 100}%`,
      width: `${positiveSeq.length}00%`,
      position: 'absolute'
    }
    const oppositeStyle = {
      ...transitionStyle,
      zIndex: 0,
      left: oppositeIndex === 0 ? 0 : `-${oppositeIndex * 100}%`,
      width: `${positiveSeq.length}00%`,
      position: 'absolute'
    }
    const slidesStyle = {
      width: '500px',
      height: '300px',
      overflow: 'hidden',
      position: 'relative'
    }
    const containerStyle = {
      position: 'relative',
      display: 'inline-block'
    }

    return (
      <div className="react-infinite-slides container" style={containerStyle}>
        <ArrowLeft onClick={this.handleSlideToLeft} />
        <ArrowRight onClick={this.handleSlideToRight} />
        <div className="react-infinite-slides slides" style={slidesStyle}>
          <div style={positiveStyle}>
            {positiveSeq}
          </div>
          <div style={oppositeStyle}>
            {oppositeSeq}
          </div>
        </div>
      </div>
    )
  }
}

Slides.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  width: PropTypes.string,
  height: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  autoplay: PropTypes.bool,
  arrowLeft: PropTypes.object,
  arrowRight: PropTypes.object,
  dots: PropTypes.object
}
