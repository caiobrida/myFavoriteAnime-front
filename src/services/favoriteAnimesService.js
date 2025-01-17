import api from './api';

async function getAllFavoriteAnimes(userId, page=1) {
    try{
      const response = await api.get(`/favorites/list/${userId}`, {
        params: {
            page
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

  async function showFavoriteAnime(favoriteAnimeId) {
    try{
      const response = await api.get(`/favorites/get/${favoriteAnimeId}`);
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
  
  async function createFavoriteAnime(data) {
    try{
      const response = await api.post(`/favorites/create`, data);
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

  async function deleteFavoriteAnime(favoriteAnimeId) {
    try{
      await api.delete(`/favorites/remove/${favoriteAnimeId}`);
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
    getAllFavoriteAnimes,
    showFavoriteAnime,
    createFavoriteAnime,
    deleteFavoriteAnime
  }