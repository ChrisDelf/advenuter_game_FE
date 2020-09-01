import axios from 'axios';
import axiosWithAuth from '../utilities/axiosWithAuth';
import {ERROR, types} from './index';

const {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  ERROR_CLEAN,
  USER_LOGIN_SUCCES,
  INFO_START,
  INFO_SUCCESS,
  INFO_FAILURE,
} = types;

//const Url = process.env.REACT_APP_URL || "https://mudadventurebackend.herokuapp.com";
//const apiClient = process.env.REACT_APP_CLIENT || "fdgewtek,";
//const apiSecret = process.env.REACT_APP_SECRET || "dsfgdert";
const Url = 'http://localhost:9000';

const apiClient = process.env.REACT_APP_CLIENT || 'doge';
const apiSecret = process.env.REACT_APP_SECRET || 'doge';

export const loginUser = (data, history) => {
  const bodyData = new FormData();
  bodyData.set('username', data.username);
  bodyData.set('password', data.password);
  bodyData.set('grant_type', 'password');

  console.log(Url);

  // const headers = new Headers();
  // headers.set('content-Type', 'application/x-www-form-urlencoded');
  // headers.set('Authorization', 'Basic ${btoa("doge:doge"))}');

  return dispatch => {
    dispatch({type: LOGIN_START});
    return axios({
      method: 'POST',
      url: `${Url}/login`,
      data: bodyData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${apiClient}:${apiSecret}`)}`,
      },
    })
      .then(res => {
        localStorage.setItem('token', res.data.token);

        dispatch({type: USER_LOGIN_SUCCES, payload: data.username});
        dispatch({type: LOGIN_SUCCESS, payload: res.data});
        history.push('/display');
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: err ? err : ERROR,
        });
      });
  };
};

export const registerUser = (data, history) => dispatch => {
  console.log(data);
  dispatch({type: REGISTER_USER_START});
  return axios({
    method: 'POST',
    url: `${Url}/users/register`,
    data: data,
    headers: {
      Authorization: `Basic ${btoa(`${apiClient}:${apiSecret}`)}`,
    },
  })
    .then(res => {
      dispatch({type: REGISTER_USER_SUCCESS, payload: res.data});
      history.push('/display');
    })
    .catch(err => {
      dispatch({type: REGISTER_USER_FAILURE, payload: err});
    });
};

export const getUserInfo = username => dispatch => {
  dispatch({type: INFO_START});
  return axiosWithAuth()
    .get(`/users/display/${username}`)
    .then(res => {
      dispatch({type: INFO_SUCCESS, payload: res.data});
    })
    .catch(err => {
      dispatch({type: INFO_FAILURE, payload: err});
    });
};

export const errorClean = () => {
  return dispatch => dispatch({type: ERROR_CLEAN});
};
