import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './screens/Home/Home'
import Login from './screens/Login/Login'
import Signup from './screens/Signup/Signup'
import Test from './screens/Test/Test';


// import firebase from "./services/firebase"
function App() {
  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection("notes")
  //     .add({
  //       title: "Working",
  //       body: "This is to check the Integration is working",
  //     })
  // })
  return (
    <>
      <BrowserRouter>
        <Switch>

          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/signup" exact>
            <Signup />
          </Route>

          <Route path="/test-route" exact>
            <Test />
          </Route>

        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
