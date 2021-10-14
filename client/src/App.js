import React from 'react'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
// import Footer from './components/layout/Footer'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import {setAuthToken} from  './utils/setAuthToken'
import {setCurrentUser, logUserOut} from './actions/authActions'
import {CreateProfile} from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExp from './components/add-cred/AddExp'
import AddEdu from './components/add-cred/AddEdu'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'

import './App.css';

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime){
    store.dispatch(logUserOut())
    window.location.href = '/login'
  }
}


function App() {
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
      <Navbar/>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path= '/dashboard' component={Dashboard}/>
      <Route exact path='/create-profile' component={CreateProfile}/>
      <Route exact path= '/edit-profile' component={EditProfile}/>
      <Route exact path='/add-experience' component={AddExp} />
      <Route exact path='/add-education' component={AddEdu} />
      <Route exact path='/profiles' component={Profiles} />
      <Route exact path= '/profile/:handle' component={Profile}/>
      <Route exact path= '/post' component={Posts}/>
      <Route exact path= '/post/:id' component={Post}/>
      </div>
      </Router>
    </Provider>
  );
}

export default App;
