import React from 'react';
import ReactDOM from 'react-dom';

import { ArrowLeft, ArrowRight, Dots, Slides } from '../src';

function App() {
  return (
    <div>
      <Slides arrowLeft={ArrowLeft}
              arrowRight={ArrowRight}
              dots={Dots}
              duration={300}
              width="100%">
        <div className="one" style={{background: 'green'}}></div>
        <div className="two" style={{background: 'red'}}></div>
        <div className="three" style={{background: 'yellow'}}></div>
      </Slides>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
