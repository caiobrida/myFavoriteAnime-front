import api from './api';

async function getAllAnimes(userId, page=1, search='') {
    try{
      const response = await api.get(`/animes/list/${userId}`, {
        params: {
            page,
            search
        }
      });
      return {
        status: 200,
        response
      }
    } catch (err) {
      return {
        status: 400,
        message: err.response.data.message,
      }
    }
  
  }

  export {
    getAllAnimes,
  }