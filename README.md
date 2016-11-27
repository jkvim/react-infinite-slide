# React infinite slide
> if you just want infinite slider, this is for you

# Feature
- swipe support
- autopaly
- alow custom arrow and dots

## Install
    npm install react-infinite-slide

## Components
### `Slides`
The slides wrapper

| props      | description                          | type            | default |
|------------|--------------------------------------|-----------------|---------|
| width      | width of wrapper and slides          | String          | "600px" |
| height     | height of wrapper and slides         | String          | "400px" |
| duration   | transition duration                  | Number          | 300     |
| autoplay   | should autoplay the slides           | Bool            | false   |
| delay      | the autoplay delay of between slides | Number          | 1000    |
| arrowLeft  | the left arrow component constructor | ReactComponent  | null    |
| arrowRight | the right arrow compnent constructor | ReactComponent  | null    |
| dots       | the dots component constructor       | React Component | null    |

**Example**
```jsx
import { ArrowLeft, ArrowRight, Dots, Slides } from 'react-infinite-slide';

function App() {
  return (
    <Slides arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            dots={Dots}
            duration={0.3}>
     <div className="one"></div>
     <div className="two"></div>
     <div className="three"></div>
   </Sildes>
  );
}

```

### `ArrowLeft`
Default left arrow Component, pass to `<Slides />` as props of `arrowLeft`,
you can custom your `ArrowLeft` component and pass it to `<Slides />`,
`<Slides />` will pass `onClick` to it, and you **MUST** call `props.onClick` 
when arrow is be clicked. 

**Example**
```jsx
function ArrowLeft({ onClick }) {
  return (
    <div onClick={onClick></div>
  )
}
``` 

### `ArrowRight`
Default right arrow Component, pass to `<Slides />` as props of `arrowRight`,
you can custom your `ArrowRight` component like [ArrowLeft](#`ArrowLeft`)


### `<Dots />`
Default dots Component, pass to `<Slides />` as props of `dots`, you can
custom your `Dots` component and pass it to `<Slides />`, `<Slides />` will pass
`onDotsClick` to it and you **MUST** call `props.onDotsClick(key)` when dot is be clicked.

**Example**
```jsx
class Dots extends React.Component {
  onClick(key) {
    return () => {
        this.props.onDotsClick(key)
    }
  }

  render() {
    return (
      <ul>
        <li key="1" onClick=this.onClick(1)></li>
        <li key="2" onClick=this.onClick(2)></li>
        <li key="3" onClick=this.onClick(3)></li>
      </ul>
    );
  }
}
```


## Demo
[react-infinite-slide-demo](http://jkvim.github.io/react-infinite-slide)

## Todo
- [x] add touch support
- [ ] fix bug of transition overlap