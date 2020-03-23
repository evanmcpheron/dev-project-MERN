import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import tutorial from './tutorial';
import admin from './admin';

export default combineReducers({ alert, auth, profile, post, tutorial, admin });
