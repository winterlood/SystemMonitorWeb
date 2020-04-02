import React, { useEffect, useState } from 'react';
import './App.css';
import {getAllPcs} from './services/gets';
import Index from './component/Index/Index';
import MyRouter from './MyRouter';
import PollingContext from './context/PollingContext' 
const App = () => {
  const [isPolling,setIsPolling] = useState("y");
  const handlePolling = () =>{
    console.log("handle Polling!");
    if(isPolling==="y"){
      setIsPolling("n");
    }
    else{
      setIsPolling("y");
    }
  }
    return (
  <PollingContext.Provider value={true}>
      <MyRouter isPolling={isPolling} setIsPolling={handlePolling}/>
  </PollingContext.Provider>
  );
}

export default App;
