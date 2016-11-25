import React from 'react';

export default class Slides extends React.Component {
  constructor(props) {
    super();
    this.width = props.width || 600;
    this.height = props.height || 400;
    this.initSlides(props);
    this.bindHanlders([
      'onSlideLeft',
      'onSlideRight',
      'onDotsClick'
    ]);
    this.state = {
      key: 0
    };
  }

  initSlides({ animate = 'ease-in', duration = 0.5, children }) {
    this.slides = children.map((slide, index) => {
      if (index === children.length - 1) {
        index = -1; // move the last one slide to -1 position
      } 
      const style = Object.assign({
        position: 'absolute',
        top: '0',
        left: (index * this.width) + 'px',
        width: this.width + 'px',
        height: this.height + 'px',
        transition: `left ${duration}s ${animate}`,
      }, slide.props.style);
      return React.cloneElement(slide, {
        style,
        key: index
      });
    });
  }

  updateSlides(slides) {
    return slides.map((slide, index) => {
      const style = Object.assign({}, slide.props.style);
      style.left = index * parseInt(slide.props.style.width) + 'px';
      return React.cloneElement(slide, {
        style
      });
    });
  }

  bindHanlders(handlers) {
    handlers.forEach((handler) => {
      this[handler] = this[handler].bind(this);
    });
  }

  onSlideLeft() {
    console.log('slide left');
    this.setState({
      key: (this.state.key + 1) % this.slides.length
    });
    this.slides = this.updateSlides([
      ...this.slides.slice(1),
      this.slides[0]
    ]);
  }

  onSlideRight() {
    console.log('slide right');
    this.setState({
      key: (this.state.key - 1)
    });
    this.slides = this.updateSlides([
      this.slides[this.slides.length - 1],
      ...this.slides.slice(0, this.slides.length - 1)
    ]);
  }

  onDotsClick(key) {
    if (key < this.slides.length && key > 0) {
      this.setState({
        key
      });
      this.slides = this.updateSlides([
        ...this.slides.slice(key),
        ...this.slides.slice(0, key)
      ]);
    }
  }

  render() {
    const {
      arrowLeft: ArrowLeft,
      arrowRight: ArrowRight,
      dots: Dots
    } = this.props;
    const style = {
      position: 'relative',
      width: this.width + 'px',
      height: this.height + 'px',
      overflow: 'hidden',
    };
    return (
      <div className="react-infinite-slides" style={style}>
        <ArrowLeft onClick={this.onSlideLeft} />
        <ArrowRight onClick={this.onSlideRight} />
        <Dots activeDot={this.state.key}
          length={this.slides.length}
          onDotsClick={this.onDotsClick} />
        {this.slides}
      </div>
    );
  }
}

Slides.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element),
};