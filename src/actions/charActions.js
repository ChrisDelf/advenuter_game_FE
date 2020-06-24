import axios from 'axios';
import axiosWithAuth from '../utilities/axiosWithAuth';
import {ERROR, types} from './index';

const {
  MOVE_START,
  MOVE_SUCCESS,
  MOVE_FAILURE,
  MAP_GEN_START,
  MAP_GEN_SUCCESS,
  MAP_GEN_FAILURE,
  MAP_GET_START,
  MAP_GET_FAILURE,
  MAP_GET_SUCCESS,
  SET_MAPID_START,
  SET_MAPID_SUCCESS,
  GET_PLAYER_LOCATION_START,
  GET_PLAYER_LOCATION_SUCCESS,
  GET_PLAYER_LOCATION_FAILURE,
  REFRESH_START,
  REFRESH_SUCCESS,
} = types;

const Url =
  process.env.REACT_APP_URL || 'https://mudadventurebackend.herokuapp.com';
const apiClient = process.env.REACT_APP_CLIENT || 'fdgewtek,';
const apiSecret = process.env.REACT_APP_SECRET || 'dsfgdert';

export const generateMap = userid => {
  const token = localStorage.getItem('token');

  return dispatch => {
    dispatch({type: MAP_GEN_START});
    return axios({
      method: 'GET',
      url: `${Url}/users/test/${userid}`,
      headers: {
        Authorization: token,
      },
    })
      .then(res => {
        // Mixpanel.track('Register Success');

        dispatch({type: MAP_GEN_SUCCESS, payload: res});
      })
      .catch(err => {
        // Mixpanel.track('Login Failed');
        dispatch({type: MAP_GEN_FAILURE, payload: err});
      });
  };
};
export const getMap = userid => {
  const token = localStorage.getItem('token');

  return dispatch => {
    dispatch({type: MAP_GET_START});
    return axios({
      method: 'GET',
      url: `${Url}/users/getmap/${userid}`,
      headers: {
        Authorization: token,
      },
    })
      .then(res => {
        // Mixpanel.track('Register Success');
        console.log(res);
        res.data.map(n => (n.grid = JSON.parse(n.grid)));

        dispatch({type: MAP_GET_SUCCESS, payload: res.data});
      })
      .catch(err => {
        // Mixpanel.track('Login Failed');
        dispatch({type: MAP_GET_FAILURE, payload: err});
      });
  };
};

export const getPlayerLocation = mapid => {
  const token = localStorage.getItem('token');

  return dispatch => {
    dispatch({type: GET_PLAYER_LOCATION_START});
    return axios({
      method: 'GET',
      url: `${Url}/users/playerlocation/${mapid}`,
      headers: {
        Authorization: token,
      },
    })
      .then(res => {
        console.log('getPlayerLocation', res);
        dispatch({type: GET_PLAYER_LOCATION_SUCCESS, payload: res.data});
      })
      .catch(err => {
        dispatch({type: GET_PLAYER_LOCATION_FAILURE, payload: err});
      });
  };
};

export const movePlayer = (player, mapid) => {
  console.log('moving player', player);
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch({type: MOVE_START});

    return axios({
      method: 'PUT',
      url: `${Url}/users/moveplayer/${mapid}`,
      data: player,
      headers: {
        Authorization: token,
      },
    })
      .then(res => {
        dispatch({type: MOVE_SUCCESS, payload: player});
      })
      .catch(err => ({type: MOVE_FAILURE, payload: err}));
  };
};

export const setMapId = mapId => {
  return dispatch => {
    dispatch({type: SET_MAPID_START});
    return dispatch({type: SET_MAPID_SUCCESS, payload: mapId});
  };
};

export const setRefresh = type => {
  return dispatch => {
    dispatch({type: REFRESH_START});
    return dispatch({type: REFRESH_SUCCESS, payload: type});
  };
};
