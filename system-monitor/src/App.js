import React, { Component } from 'react';
import './App.css';
import { getAllPcs } from './services/gets';
import Index from './component/Index/Index';
import MyRouter from './MyRouter';
class App extends Component {
  state = {
    isPolling : true
  }
  
  render() {
  const handlePolling = () => {
    this.setState({
      isPolling : !this.state.isPolling
    })
  };
    return (
      <MyRouter 
      isPolling={this.state.isPolling}
      handlePolling={handlePolling} />
    );
  }
}

export default App;
