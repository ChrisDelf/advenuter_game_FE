import {types} from '../actions/index';

const {
  MAP_GET_START,
  MAP_GET_SUCCESS,
  MAP_GET_FAILURE,
  MAP_GEN_START,
  MAP_GEN_SUCCESS,
  MAP_GEN_FAILURE,
  SET_MAPID_SUCCESS,
  SET_MAPID_START,
  MOVE_START,
  MOVE_SUCCESS,
  MOVE_FAILURE,
  GET_PLAYER_LOCATION_START,
  GET_PLAYER_LOCATION_SUCCESS,
  GET_PLAYER_LOCATION_FAILURE,
  REFRESH_START,
  REFRESH_SUCCESS,
  LOADING_START,
  LOADING_SUCCESS,
} = types;

const charState = {
  playerX: 0,
  playerY: 0,
  playerMap: [{}],
  error: '',
  loading: false,
  isSuccess: false,
  mapId: 0,
  refresh: false,
};

const charReducer = (state = charState, {type, payload}) => {
  switch (type) {
    /// retrieving map from database
    case MAP_GET_START:
      return {
        ...state,
        error: '',
        loading: true,
      };
    case MAP_GET_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        playerMap: payload,
        isSuccess: true,
      };
    case MAP_GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    //----- generation of map
    case MAP_GEN_START:
      return {
        ...state,
        error: '',
        loading: true,
      };
    case MAP_GEN_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        // isSuccess: true,
      };
    case MAP_GEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    ////------- Saving mapid
    case SET_MAPID_START:
      return {
        ...state,
        loading: true,
      };
    case SET_MAPID_SUCCESS:
      return {
        ...state,
        mapId: payload,
        loading: false,
      };

    ///---------------player movement
    case MOVE_START:
      return {
        ...state,
        loading: true,
      };
    case MOVE_SUCCESS:
      console.log('move success', payload);
      return {
        ...state,
        playerX: payload.playerx,
        playerY: payload.playery,
        refresh: true,
        loading: false,
      };
    case MOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    ///---- getting the player location from the backend

    case GET_PLAYER_LOCATION_START:
      return {
        ...state,
        loading: true,
      };

    case GET_PLAYER_LOCATION_SUCCESS:
      console.log('setting player location', payload);
      return {
        ...state,
        playerX: payload.playerx,
        playerY: payload.playery,
        isloading: false,
      };

    case GET_PLAYER_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case REFRESH_START:
      return {
        ...state,
        loading: true,
      };
    case REFRESH_SUCCESS:
      return {
        ...state,
        refresh: payload,
      };
    case LOADING_START:
      return {...state};
    case LOADING_SUCCESS:
      return {...state, isSuccess: payload};
    default:
      return state;
  }
};

export default charReducer;
