import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
	axios.post('/api/users/register', userData)
		.then(res => history.push('/login'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
}

// Login - Get user token
export const loginUser = (userData) => dispatch => {
	axios.post('/api/users/login', userData)
		.then(res => {
			// Save to local storage
			const { token } = res.data;
			// Set token to localStorage
			localStorage.setItem('jwtToken', token);
			// Set token to auth header
			setAuthToken(token);
			// Decode token to get user data using jwt-decode
			const decoded = jwt_decode(token);
			// Set Current User
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}
