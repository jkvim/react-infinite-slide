import React from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'
import { EventEmitter } from 'fbemitter'

// import AlloyFinger from 'alloyfinger';
const EVENT = {
  NOTIFY_WOKER: 'NOTIFY_WOKER'
}

export default class Slides extends React.Component {
  emitter = new EventEmitter();
  animationQueue = []
  playing = false
  state = { active: this.maxLength, playAnimation: true }

  componentDidMount() {
    this.emitter.addListener(EVENT.NOTIFY_WOKER, this.getNextJob)
  }

  componentWillUnmount() {
    this.emitter.removeAllListeners()
  }

  componentDidUpdate (prevProps, prevState) {
    // slide by arrow. from maxLength to 1
    if (this.state.active === 0 && prevState.active === this.maxLength) {
      setTimeout(() => {
        this.setState({
          active: 1,
          playAnimation: true
        })
      }, 0)
      return
    }
    // slide by arrow, from 0 to maxLenth - 1
    if (prevState.active === 0 && this.state.active === this.maxLength) {
      setTimeout(() => {
        this.setState({
          active: this.maxLength - 1,
          playAnimation: true
        })
      }, 0)
    }
  }

  getNextJob = () => {
    const nextStep = this.animationQueue.pop()
    if (nextStep && !this.playing) {
      this.playing = true
      this.navigationTo(nextStep)
    }
  }

  caculateActive = increment => this.state.active + increment

  navigationTo = nextStep => {
    let active = this.caculateActive(nextStep)
    let playAnimation = true
    if (active > this.maxLength) {
      active = 0
      playAnimation = false
    }
    if (active === -1) {
      active = this.maxLength
      playAnimation = false
    }
    this.setState({
      active: active,
      playAnimation: playAnimation
    })
  }

  pushToQueue = nextStep => {
    this.animationQueue.push(nextStep)
    this.notifyWorker()
  }

  notifyWorker = () => {
    this.emitter.emit(EVENT.NOTIFY_WOKER)
  }

  handleSlideToLeft = () => this.pushToQueue(-1)

  handleSlideToRight = () => this.pushToQueue(1)

  handleTransitionEnd = () => {
    this.playing = false
    this.notifyWorker()
  }

  get maxLength () {
    return this.props.children.length
  }

  get atLast () {
    const { active } = this.state
    return active === this.maxLength || active === this.maxLength - 1
  }

  sildeStyle = index => {
    const position = this.atLast && index === 0 ? this.maxLength : index
    return {
      position: 'absolute',
      left: `${position}00%`
    }
  }

  wrapperStyle = () => {
    const { active, playAnimation } = this.state
    const { width, height, duration } = this.props
    return {
      left: 0,
      transform: `translate(-${active}00%, 0)`,
      transition: playAnimation ? `${duration}ms ease-in-out` : '',
      height: height,
      width: width
    }
  }

  renderArrowLeft = () => {
    const { arrowLeft } = this.props
    return arrowLeft ? React.cloneElement(arrowLeft, {
      onClick: this.handleSlideToLeft
    }) : null
  }

  renderArrowRight = () => {
    const { arrowRight } = this.props
    return arrowRight ? React.cloneElement(arrowRight, {
      onClick: this.handleSlideToRight
    }) : null
  }

  renderSlides = () => {
    const { children } = this.props
    return React.Children
      .map(children, (child, index) => (
        React.cloneElement(child, {
          style: {
            ...child.props.style,
            ...this.sildeStyle(index)
          }
        })
      ))
  }

  render () {
    const containerStyle = {
      position: 'relative',
      display: 'inline-block',
      overflow: 'hidden',
      ...this.props.containerStyle
    }

    return (
      <div className="react-infinite-slides container" style={containerStyle}>
        {this.renderArrowLeft()}
        {this.renderArrowRight()}
        <div
          className="react-infinite-slides slides"
          style={this.wrapperStyle()}
          onTransitionEnd={this.handleTransitionEnd}
        >
          {this.renderSlides()}
        </div>
      </div>
    )
  }
}

Slides.propTypes = {
  containerStyle: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.element),
  width: PropTypes.string,
  height: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  arrowLeft: PropTypes.element,
  arrowRight: PropTypes.element,
  dots: PropTypes.object
}

Slides.defaultProps = {
  width: '500px',
  height: '300px',
  duration: 1000,
  arrowLeft: null,
  arrowRight: null,
  dots: null,
  delay: 1000
}
