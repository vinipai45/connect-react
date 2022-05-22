import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

import PrivateRoute from './helper-functions/PrivateRoute'
import Home from './screens/Home/Home'
import Login from './screens/Login/Login'
import Logout from './screens/Logout/Logout'
import Signup from './screens/Signup/Signup'
import Test from './screens/Test/Test';


function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/logout" element={<Logout />} />

          <Route path="/test-route" element={<Test />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
