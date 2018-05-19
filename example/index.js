import React from 'react'
import ReactDOM from 'react-dom'
import GithubCorner from 'react-github-corner'
import { ArrowLeft, ArrowRight, Dots, Slides } from '../src'

const styles = {
  h1: {
    margin: '100px auto',
    color: 'white',
    fontSize: 100,
    textAlign: 'center',
    fontFamily: 'sans-serif'
  }
}


function App () {
  return (
    <section>
      <h2>Slide By Arrow</h2>
      <Slides arrowLeft={<ArrowLeft />} arrowRight={<ArrowRight />} dots={<Dots length={3} />}>
        <div className="one" style={{ background: '#bdff70', width: '500px', height: '300px' }} >
          <h1 style={styles.h1}>1</h1>
        </div>
        <div className="two" style={{ background: '#f09bfd', width: '500px', height: '300px' }} >
          <h1 style={styles.h1}>2</h1>
        </div>
        <div className="three" style={{ background: '#ffa500', width: '500px', height: '300px' }} >
          <h1 style={styles.h1}>3</h1>
        </div>
      </Slides>
    </section>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
