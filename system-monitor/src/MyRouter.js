import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './component/Index/Index';
import Header from './component/Header/Header';
import One from './component/test/One';
import Two from './component/test/Two';
import TotalPc from './component/TotalPc/TotalPc';
import Login from './component/Login/Login';
import AuthRoute from './component/AuthRoute/AutheRoute';
const MyRouter =({saveLoginState,user, authenticated,isPolling, handlePolling}) =>{
        return(
            <Router>
                <Header isPolling={isPolling} handlePolling={handlePolling} ></Header>
                <div className="main">
                <Switch>
                  <Route
                    path="/login"
                    render={props => (
                      <Login authenticated={authenticated} saveLoginState={saveLoginState} {...props} />
                    )}
                  />                  
                   <AuthRoute
                    authenticated={authenticated}
                    path="/"
                    render={props => <TotalPc user={user} isPolling={isPolling} {...props} />}
                  />
                  <Route path="/one" component={One} />
                  <Route path="/two" component={Two} />
                  {/* <Route  path="/total"
                  render={() =>
                      <TotalPc isPolling={isPolling}  />
                  }/> */}
                </Switch>
                </div>
          </Router>
        );
}

export default MyRouter;