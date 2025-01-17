import api from './api';

async function register(user) {
    try{
      await api.post('/user/create', user);
      return {
        status: 200,
      }
    } catch (err) {
      return {
        status: 400,
        message: err.response.data.message,
      }
    }
  
  }

  export {
    register,
  }