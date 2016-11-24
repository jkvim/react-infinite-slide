import React from 'React';

export default class Slides extends React.Component {
  constructor(props) {
    super(this);
    const slides = this.initSlides(props);
    this.bindHanlders([
      'onSlideLeft',
      'onSlideRight',
      'onDotsClick'
    ]);
    this.bindComponents([
      {
        element: props.arrowLeft,
        target: 'arrowLeft',
        handler: this.onSlideLeft
      },
      {
        element: props.arrowRight,
        target: 'arrowRight',
        handler: this.onSlideRight
      },
      {
        element: props.dots,
        target: 'dots',
        handler: this.onDotsClick
      }
    ]);
    this.state = {
      slides,
    };
  }

  initSlides({ width = 600, height = 400, animate = 'ease-in', duration = 0.5, children }) {
    return children.map((slide, index) => {
      const style = {
        position: 'absolute',
        top: '0',
        left: (index * width) + 'px',
        width: width + 'px',
        height: height + 'px',
        transition: `left ${duration}s ${animate}`,
      };
      return React.cloneElement(slide, {
        style,
        key: index
      });
    });
  }

  updateSlides() {
    return this.state.slides.map((slide, index) => {
      const style = slide.props.style;
      style.left = index * parseInt(slide.props.style.width) + 'px';
      return React.cloneElement(slide, {
        style
      });
    });
  }

  bindHanlders(handlers) {
    handlers.forEach((handler) => {
      this[handlers] = this[handler].bind(this);
    });
  }

  bindComponents(components) {
    components.forEach((component) => {
      const { element, target, handler } = component;
      if (element) {
        this[target] = handler;
      }
    });
  }

  onSlideLeft() {
    this.setState({
      slides: [
        ...this.state.slides.slice(1),
        this.state.slides[0]
      ]
    });
  }

  onSlideRight() {
    this.setState({
      slides: [
        this.state.slides[this.state.slides.length - 1],
        ...this.state.slides.slice(0, this.state.slides.length - 1)
      ]
    })
  }

  onDotsClick(key) {
   if (key < this.state.slides.length && key > 0) {
     this.setState({
       slides: [
         ...this.state.slides.slice(key),
         ...this.state.slides.slice(0, key)
       ]
     });
   }
  }

  render() {
    const slides = this.updateSlides(this.state.slides);
    return (
      <div className="react-infinite-slides" style={{position: 'relative'}}>
        {this.arrowLeft}
        {this.arrowRight}
        {slides}
        {this.dots}
      </div>
    );
  }
}

Slides.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element),
  arrowLeft: React.PropTypes.element,
  arrowRight: React.PropTypes.element,
  dots: React.Props.element,
};