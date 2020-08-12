import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {generateMap, getMap} from '../../actions/charActions';
import {getUserInfo} from '../../actions/authActions';
import axios from 'axios';
import {Button} from 'pcln-design-system';
import {Container} from './displayStyle';
import GameDisplay from '../GameDisplay/gameDisplay';

const Display = props => {
  console.log('props', props);
  const [render, setRender] = useState(false);
  const [mapId, setMapId] = useState();
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    props.getUserInfo(props.username);
    props.getMap(props.userid);
    setRefresh(false);
    console.log(refresh, 'refresh');
  }, [refresh]);

  return (
    <Container className="container">
      {!render === true ? (
        <>
          <h className="title ">List of Maps</h>
          <div classname="buttonContainer">
            <Button
              size="medium"
              onClick={function generateRefresh() {
                props.generateMap(props.userid);
                setRefresh(true);
              }}>
              Generate
            </Button>
            <Button size="medium" onClick={() => props.getMap(props.userid)}>
              GetMap
            </Button>
          </div>
          <div className="mapContainer" style={{height: `100%`, color: 'gray'}}>
            {props.maps.map(n => (
              <Button
                className="mapButton"
                variation="outline"
                color="black"
                onClick={function loadMap() {
                  setRender(true);
                  setMapId(n.mapid);
                }}>
                {n.mapid}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <div className="gameContainer">
          <GameDisplay
            className="dungeonCon"
            mapid={mapId}
            setRender={setRender}
          />
        </div>
      )}
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    maps: state.charReducer.playerMap,
    username: state.authReducer.user,
    userid: state.authReducer.userid,
  };
};

export default connect(mapStateToProps, {generateMap, getMap, getUserInfo})(
  Display,
);
