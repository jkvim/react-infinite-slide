import React from 'react';
import ReactDOM from 'react-dom';

import { ArrowLeft, ArrowRight } from './src/arrows';
import Dots from './src/dots';
import Slides from './src/slides';

function App() {
  return (
    <div>
      <Slides arrowLeft={ArrowLeft}
              arrowRight={ArrowRight}
              dots={Dots}
              duration='0.3s'
              autoplay
      >
        <div className="one" style={{background: 'green'}}></div>
        <div className="two" style={{background: 'red'}}></div>
       
      </Slides>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
