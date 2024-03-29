import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, } from 'react-router-dom';

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
import Connections from './screens/Connections/Connections';
import Notifications from './screens/Notifications/Notifications';
import Messages from './screens/Messages/Messages';
import PeopleProfile from './screens/PeopleProfile/PeopleProfile';
import CreatePost from './screens/CreatePost/CreatePost';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

function App() {

  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>

        <Route path='/' element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        } >
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/profile/:username" element={<PeopleProfile />} />
          <Route exact path="/profile/:username/connections" element={<Connections />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/compose/create-post" element={<CreatePost />} />


        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/logout" element={<Logout />} />

        <Route path="/test-route" element={<Test />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/compose/create-post" element={<CreatePost />} />
        </Routes>
      )}

    </>
  )
}

export default App;
