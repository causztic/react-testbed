import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  // emoji autocompletion ignores autoComplete (both at input level and at form level)
  render() {   
    return (
      <div className="App">
        <input value={this.state.value} autoComplete="off" onChange={this.handleChange} style={{ marginTop: 50, fontSize: 30 }} />
        <div style={{ height: 50 }} />
        <button style={{ height: 50, width: 300 }} onClick={this.resetState}>Reset</button>
      </div>
    )
  }

  resetState() {
    this.setState({ value: '' });
  }

  handleChange(e) {
    // nativeEvent is insertText without predictive text 
    // nativeEvent is insertCompositionText with predictive text (non-numbers)

    // uncomment this to prevent emoji suggestions from messing up the value if post-processing (e.g. formatting on handleChange)
    // is needed.
    // if (e.nativeEvent?.inputType === 'insertText' && e.nativeEvent?.data?.length > 1) {
    //   // insertText *should* on normal means have data length of more than 1
    //   // cut uses deleteByCut
    //   // paste uses InsertFromPaste
    //   // backspacing uses deleteContentBackward
    //   return;
    // }

    console.log(e.nativeEvent);
    
    let value = e.target.value;
    if (value.length === 4) {
      // Gboard will somehow trigger a insertCompositionText and then a subsequent insertText if the value is modified on React's handleChange:
      // 1. adding the modified value in front with insertCompositionText
      // 2. subsequently an insertText after with the unmodified value.

      value = `${value[0]},${value[1]}${value[2]}${value[3]}`
    }

    this.setState({ value }, () => {
      console.log(this.state.value);
    });
  }
}

export default App;
