import React from 'react';
import PropTypes from 'prop-types'
// import AlloyFinger from 'alloyfinger';

export default class Slides extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      key: 0,
      direction: 'left'
    };
  }

  render () {
    const {
      arrowLeft: ArrowLeft,
      arrowRight: ArrowRight,
      dots: Dots
    } = this.props;
    const style = this.getStyle();
    const activeDot = this.getActiveDot();
    return (
      <div className="react-infinite-slides container"
        style={style.container}
        ref={(c) => {this.container = c;}}>
        {ArrowLeft ?
          <ArrowLeft onClick={this.onSlideLeft} /> :
          null
        }
        {ArrowRight ?
          <ArrowRight onClick={this.onSlideRight} /> :
          null
        }
        {Dots ?
          <Dots activeDot={activeDot}
            length={this.slides.length}
            onDotsClick={this.onDotsClick}
            onClick={this.onDotsClick}
          /> :
          null
        }
        <div
          className="react-infinite-slides wrapper"
          style={style.wrapper}
        >
          {this.slides}
        </div>
      </div>
    );
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
