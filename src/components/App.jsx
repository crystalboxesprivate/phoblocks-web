import React from 'react'

class App extends React.Component {
  render() {
    // give children the app state
    return this.props.children.map(
      (x, idx) =>
        <React.Fragment key={`comp${idx}`}>
          {React.cloneElement(x, { state: this.props.state })}
        </React.Fragment>
    )
  }
}

export default App
