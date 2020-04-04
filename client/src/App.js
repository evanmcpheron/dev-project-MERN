import React, { Fragment, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

// Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import PrivateRoute from './components/routing/PrivateRoute';
import Admin from './components/admin/Admin';
import AdminRoute from './components/routing/AdminRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Dashboard from './components/dashboard/Dashboard';
import Post from './components/post/Post';
import Tutorials from './components/tutorials/Tutorials';
import Tutorial from './components/tutorial/Tutorial';
import Videos from './components/admin/Videos';

// REDUX
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

ReactGA.initialize('UA-80246531-5', {
   debug: false,
   titleCase: false,
   gaOptions: {
      userId: 123,
   },
});

const history = createBrowserHistory();
history.listen((location) => {
   ReactGA.set({ page: location.pathname });
   ReactGA.pageview(location.pathname);
});

if (localStorage.token) {
   setAuthToken(localStorage.token);
}

const App = () => {
   useEffect(() => {
      store.dispatch(loadUser());
   }, []);

   return (
      <Provider store={store}>
         <Router history={history}>
            <Fragment>
               <Navbar />
               <Route exact path="/" component={Landing} />
               <section>
                  <Alert />
                  <Switch>
                     <Route exact path="/login" component={Login} />
                     <Route exact path="/register" component={Register} />
                     <Route exact path="/profiles" component={Profiles} />
                     <Route exact path="/profile/:id" component={Profile} />
                     <Route exact path="/tutorials" component={Tutorials} />
                     <Route exact path="/tutorial/:id" component={Tutorial} />
                     <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                     />
                     <PrivateRoute exact path="/post/:id" component={Post} />
                     <PrivateRoute exact path="/posts" component={Posts} />
                     <PrivateRoute
                        exact
                        path="/create-profile"
                        component={CreateProfile}
                     />
                     <PrivateRoute
                        exact
                        path="/add-experience"
                        component={AddExperience}
                     />
                     <PrivateRoute
                        exact
                        path="/add-education"
                        component={AddEducation}
                     />
                     <PrivateRoute
                        exact
                        path="/edit-profile"
                        component={EditProfile}
                     />

                     <AdminRoute exact path="/admin" component={Admin} />
                     <AdminRoute
                        exact
                        path="/admin/tutorial/:id"
                        component={Videos}
                     />
                  </Switch>
               </section>
            </Fragment>
         </Router>
      </Provider>
   );
};

export default App;
