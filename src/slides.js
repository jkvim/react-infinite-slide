import React from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'

// import AlloyFinger from 'alloyfinger';

export default class Slides extends React.Component {
  static defaultProps = {
    width: '500px',
    height: '300px',
    duration: 1000,
    arrowLeft: null,
    arrowRight: null,
    dots: null,
    delay: 1000
  }

  constructor (props) {
    super(props)
    this.state = {
      active: this.maxLength,
      playAnimation: true
    }
  }

  componentDidMount () {
    if (this.props.autoplay) {
      setInterval(() => {
        this.navigationTo(1)
      }, this.props.delay)
    }
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

  caculateActive = increment => this.state.active + increment

  navigationTo = throttle(nextStep => {
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
  }, this.props.duration)

  handleSlideToLeft = () => this.navigationTo(-1)

  handleSlideToRight = () => this.navigationTo(1)

  handleClickDots = (key) => {
    const step = key - this.state.active
    this.navigationTo(step)
  }

  get maxLength () {
    return this.props.children.length
  }

  get atLast () {
    const { active } = this.state
    return active === this.maxLength || active === this.maxLength - 1
  }

  get activeDot () {
    return this.state.active === this.maxLength ? 0 : this.state.active
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

  renderDots = () => {
    const { dots } = this.props
    return dots ? React.cloneElement(dots, {
      onClick: this.handleClickDots,
      activeDot: this.activeDot
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
        <div className="react-infinite-slides slides" style={this.wrapperStyle()}>
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
  autoplay: PropTypes.bool,
  arrowLeft: PropTypes.element,
  arrowRight: PropTypes.element,
  dots: PropTypes.object
}
