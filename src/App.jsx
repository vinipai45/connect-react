import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

import PrivateRoute from './utils/helper-functions/PrivateRoute'
import NotFound from './components/NotFound/NotFound';
import Layout from './screens/Layout/Layout'
import Login from './screens/Login/Login'
import Logout from './screens/Logout/Logout'
import Signup from './screens/Signup/Signup'
import Test from './screens/Test/Test';
import Profile from './screens/Profile/Profile';
import Home from './screens/Home/Home';
import Search from './screens/Search/Search';
import Notifications from './screens/Notifications/Notifications';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          } >
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/notifications" element={<Notifications />} />

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
