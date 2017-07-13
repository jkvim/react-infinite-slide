import React from 'react'

function Arrow({ direction, onClick }) {
  const style = {
    wrapper: {
      position: 'absolute',
      top: '50%',
      height: '40px',
      width: '30px',
      textAlign: 'center',
      background: 'rgba(0, 0, 0, 0.6)',
      boxSizing: 'border-box',
      zIndex: 1,
      marginTop: '-20px',
    },
    arrow: {
      width: '12px',
      height: '12px',
      borderTop: '5px solid #fff',
      borderLeft: '5px solid #fff',
      borderRadius: '3px',
      display: 'block',
      margin: '0 auto',
      marginTop: '10px'
    }
  }
  if (direction === 'left') {
    style.wrapper.left = '0'
    style.arrow.transform = 'rotate(-45deg)'
  } else if (direction === 'right') {
    style.wrapper.right = '0'
    style.arrow.transform = 'rotate(135deg)'
  }
  return (
    <div className={`arrow-${direction}`} style={style.wrapper} onClick={onClick} >
      <div style={style.arrow}></div>
    </div>
  )
}

const ArrowLeft = ({ onClick }) => (
  <Arrow direction="left" onClick={onClick} />
)

const ArrowRight = ({ onClick }) => (
  <Arrow direction="right" onClick={onClick} />
)

export {
  ArrowLeft,
  ArrowRight
}
