import React, { useEffect } from 'react';
import './App.css';
import {getAllPcs} from './services/gets';
import Index from './component/Index/Index';
import MyRouter from './MyRouter';
const App = () => {
 
  return (
  <MyRouter/>
  );
}

export default App;
