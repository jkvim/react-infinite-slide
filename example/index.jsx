import React from 'react';
import ReactDOM from 'react-dom';
import GithubCorner from 'react-github-corner';
import { ArrowLeft, ArrowRight, Dots, Slides } from '../src';


function App() {
  return (
    <div>
      <header>
        <GithubCorner href="https://github.com/jkvim/react-infinite-slide" />
        <h1>React Infinite Slide</h1>
      </header>
      <section>
        <h2>Slide By Arrow</h2>
        <Slides arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                dots={Dots}
                duration={300}
                width="100%">
          <div className="one" style={{background: '#bdff70'}}></div>
          <div className="two" style={{background: '#f09bfd'}}></div>
          <div className="three" style={{background: '#ffa500'}}></div>
        </Slides>
        <h2>Slide By Auto</h2>
      </section>
      <section>
        <Slides dots={Dots}
                duration={300}
                width="100%"
                autoplay
                delay={2000}>
          <div className="one" style={{background: '#bdff70'}}></div>
          <div className="two" style={{background: '#f09bfd'}}></div>
          <div className="three" style={{background: '#ffa500'}}></div>
        </Slides>
      </section>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
