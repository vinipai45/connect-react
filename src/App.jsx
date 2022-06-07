import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

import PrivateRoute from './utils/helper-functions/PrivateRoute'
import NotFound from './components/NotFound/NotFound';
import Main from './screens/Main/Main'
import Login from './screens/Login/Login'
import Logout from './screens/Logout/Logout'
import Signup from './screens/Signup/Signup'
import Test from './screens/Test/Test';
import Profile from './screens/Profile/Profile';
import Home from './screens/Home/Home';
import View from './screens/View/View';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          } >
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />

          </Route>

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/logout" element={<Logout />} />

          <Route path="/test-route" element={<Test />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
