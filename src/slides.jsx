import React from 'react';

export default class Slides extends React.Component {
  constructor(props) {
    super(props);
    this.initProps(props);
    this.initSlides(props);
    this.bindHanlders([
      'onSlideLeft',
      'onSlideRight',
      'onDotsClick'
    ]);
    this.state = {
      key: 0,
      direction: 'left'
    };
  }

  initProps({ width = "600px", height = "400px", duration = 300 }) {
    const regex = /[0-9]+(px|%)$/;
    if (!regex.test(width) || !regex.test(height)) {
      throw TypeError('invalid width or height');
    }
    this.width = width;
    this.height = height;
    this.duration = duration + 'ms';
  }

  initSlides({ children }) {
    this.slides = children.map((slide, index) => {
      const style = Object.assign({
        width: this.width,
        height: this.height,
        flexShrink: 0,
      }, slide.props.style);
      return React.cloneElement(slide, {
        style,
        key: index
      });
    });
    this.head = React.cloneElement(this.slides[this.slides.length - 1], {
      key: this.slides.length,
      className: 'head'
    });
    this.tail = React.cloneElement(this.slides[0], {
      key: -1,
      className: 'tail'
    });
  }

  componentDidMount() {
    const { autoplay, delay = 1000 } = this.props;
    const loop = () => {
      this.onSlideRight();
      setTimeout(loop.bind(this), delay);
    };
    if (autoplay) {
      setTimeout(loop.bind(this), delay);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { key, direction } = nextState;
    const skipToLastSlide = (
      direction === 'left' &&
      this.state.key === -1 &&
      key === this.slides.length - 1
    );
    const skipToFirstSlide = (
      key === 0 &&
      direction === 'right' &&
      this.state.key === this.slides.length
    )
    if (skipToFirstSlide || skipToLastSlide) {
      this.duration = '0s';
    } else {
      this.duration = this.props.duration + 'ms';
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { key } = prevState;
    const { direction } = this.state;
    const slideLeftAtHead = (key === -1) && direction === 'left';
    const slideRightAtTail = (key === this.slides.length) && direction === 'right';
    const doSlideAfterSkip = (flag, slideFn) => {
      if (flag) {
        setTimeout(() => slideFn.call(this), 0);
      }
    };
    doSlideAfterSkip(slideLeftAtHead, this.onSlideLeft);
    doSlideAfterSkip(slideRightAtTail, this.onSlideRight);
  }

  bindHanlders(handlers) {
    handlers.forEach((handler) => {
      this[handler] = this[handler].bind(this);
    });
  }

  onSlideLeft() {
    let key = this.state.key === - 1 ?
      this.slides.length - 1 :
      this.state.key - 1;

    this.setState({
      key,
      direction: 'left'
    });
  }

  onSlideRight() {
    let key = this.state.key === this.slides.length ?
      0 : this.state.key + 1;

    this.setState({
      key,
      direction: 'right'
    });
  }

  onDotsClick(key) {
    if (key >= 0 &&
      key !== this.state.key &&
      key < this.slides.length) {
      const direction = key > this.state.key ? 'right' : 'left';
      this.setState({
        key,
        direction
      });
    }
  }

  getActiveDot() {
    switch (this.state.key) {
      case -1:
        return this.slides.length - 1;
      case this.slides.length:
        return 0;
      default:
        return this.state.key;
    }
  }

  getStyle() {
    return {
      container: {
        overflow: 'hidden',
        position: 'relative',
        width: this.width,
        height: this.height,
      },
      wrapper: {
        display: 'flex',
        transitionDuration: this.duration,
        transform: `translateX(${100 * -(this.state.key + 1)}%)`,
      }
    };
  }

  render() {
    const {
      arrowLeft: ArrowLeft,
      arrowRight: ArrowRight,
      dots: Dots
    } = this.props;
    const style = this.getStyle();
    const activeDot = this.getActiveDot();
    return (
      <div className="react-infinite-slides container"
           style={style.container}>
        {ArrowLeft ? <ArrowLeft onClick={this.onSlideLeft} /> : null}
        {ArrowRight ? <ArrowRight onClick={this.onSlideRight} /> : null}
        {Dots ? <Dots activeDot={activeDot}
                      length={this.slides.length}
                      onDotsClick={this.onDotsClick} /> : null}
        <div className="react-infinite-slides wrapper" 
              style={style.wrapper}>
          {this.head}
          {this.slides}
          {this.tail}
        </div>
      </div>
    );
  }
}

Slides.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element),
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  delay: React.PropTypes.number,
  duration: React.PropTypes.number,
  autoplay: React.PropTypes.bool
};
