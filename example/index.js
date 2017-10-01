import React from 'react';
import ReactDOM from 'react-dom';
import GithubCorner from 'react-github-corner';
import { ArrowLeft, ArrowRight, Dots, Slides } from '../src';


function App () {
  return (
    <section>
      <h2>Slide By Arrow</h2>
      <Slides>
        <div className="one" style={{ background: '#bdff70', width: '500px', height: '300px' }} />
        <div className="two" style={{ background: '#f09bfd', width: '500px', height: '300px' }} />
        <div className="three" style={{ background: '#ffa500', width: '500px', height: '300px' }} />
      </Slides>
      <h2>Slide By Auto</h2>
    </section>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
