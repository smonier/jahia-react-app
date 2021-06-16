import React, { Component } from 'react';
import News from './News';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tagList: ["tags"]
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    console.log(e.target.value)
  }
  render() {
    return <News />;
  }
}

export default App;