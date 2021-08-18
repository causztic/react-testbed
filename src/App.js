import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    }

    this.handleChange = this.handleChange.bind(this);
  }

  render() {   
    return (
      <div className="App">
        <input value={this.state.value} onChange={this.handleChange} />
      </div>
    )
  }

  handleChange(e) {
    let value = e.target.value;
    if (value.length === 4) {
      value = `${value[0]},${value[1]}${value[2]}${value[3]}`
    }

    this.setState({ value });
  }
}

export default App;
