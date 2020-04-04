import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './component/Index/Index';
import Header from './component/Header/Header';
import One from './component/test/One';
import Two from './component/test/Two';
import TotalPc from './component/TotalPc/TotalPc'
const MyRouter =({isPolling, handlePolling}) =>{
        return(
            <Router>
                <Header isPolling={isPolling} handlePolling={handlePolling} ></Header>
                <div className="main">
                <Switch>
                  <Route exact path="/" component={Index} />
                  <Route path="/login" component={Index} />
                  <Route path="/one" component={One} />
                  <Route path="/two" component={Two} />
                  <Route  path="/total"
                  render={() =>
                      <TotalPc isPolling={isPolling}  />
                  }/>
                </Switch>
                </div>
          </Router>
        );
}

export default MyRouter;