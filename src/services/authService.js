import api from './api'
import { jwtDecode } from 'jwt-decode';

let tokenKey = 'token'

api.setJwt(getJwt());

async function login(username, password) {
    try{
      const response = await api.post('/user/auth', {
        username,
        password,
      });
      
      const { token } = response.data;
      sessionStorage.setItem(tokenKey, token);
      api.setJwt(token);
      return {
        status: 200
      }
    } catch (err) {
      return {
        status: err.response.status === 409 ? 409 : 400,
        message: err.response.data.message
      };
    }
}

function getCurrentUser() {
    try {
      const jwt = sessionStorage.getItem(tokenKey);

      return jwtDecode(jwt);
    } catch (err) {
      console.error(err)   
      return null;
    }
  }

function logout() {
    api.setJwt(null);
    sessionStorage.removeItem(tokenKey);
}

function getJwt() {
    return sessionStorage.getItem(tokenKey);
  }

export {
    login,
    logout,
    getCurrentUser,
    getJwt
}