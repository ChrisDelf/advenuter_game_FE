import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  movePlayer,
  getPlayerLocation,
  setRefresh,
  getMap,
} from '../../actions/charActions';
import {Button} from 'pcln-design-system';
// import {Promise} from "bluebird";
import styled from 'styled-components';
import {Container} from './keypadStyle';

//const container = styled.con `
//display`

const Keypad = props => {
  const {setPlayer, player, setRefresh, grid} = props;

  // const [ playerK, setPlayerK] = useState({
  //     playerx: props.x,
  //     playery: props.y,
  // })

  //useEffect(() => {
  //props.getPlayerLocation(props.playerMapId);
  //console.log('Did we get a refresh?');
  //props.setRefresh('false');
  // props.getMap();
  //}, [props.refresh]);

  function moveDirection(direction) {
    if (direction === 'N') {
      let moveN = {playery: props.y - 1, playerx: props.x};

      if (grid.grid[moveN.playery][moveN.playerx].roomType !== 'Wall') {
        props.movePlayer(moveN, props.playerMapId);

        props.setRefresh(true);
      }
    }
    if (direction === 'S') {
      let moveS = {playery: props.y + 1, playerx: props.x};
      if (grid.grid[moveS.playery][moveS.playerx].roomType !== 'Wall') {
        props.movePlayer(moveS, props.playerMapId);

        props.setRefresh(true);
      }
    }
    if (direction === 'W') {
      let moveW = {playerx: props.x - 1, playery: props.y};
      if (grid.grid[moveW.playery][moveW.playerx].roomType !== 'Wall') {
        props.movePlayer(moveW, props.playerMapId);

        props.setRefresh(true);
      }
    }
    if (direction === 'E') {
      let moveE = {playerx: props.x + 1, playery: props.y};
      if (grid.grid[moveE.playery][moveE.playerx].roomType !== 'Wall') {
        props.movePlayer(moveE, props.playerMapId);

        props.setRefresh(true);
      }
    }
    // console.log("player that is sent off to the server", player)
    //
    // props.movePlayer({player: player},props.playerMapId)
  }

  return (
    <Container>
      <div>
        <div className="single">
          <Button
            onClick={() => {
              moveDirection('N');
            }}>
            N
          </Button>
        </div>
        <div className="double">
          <Button
            onClick={() => {
              moveDirection('W');
            }}>
            W
          </Button>

          <Button
            onClick={() => {
              moveDirection('E');
            }}>
            E
          </Button>
        </div>
        <div className="single">
          <Button
            onClick={() => {
              moveDirection('S');
            }}>
            S
          </Button>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    x: state.charReducer.playerX,
    y: state.charReducer.playerY,
    playerMapId: state.charReducer.mapId,
    refresh: state.charReducer.refresh,
  };
};
export default connect(mapStateToProps, {
  movePlayer,
  getPlayerLocation,
  setRefresh,
  getMap,
})(Keypad);
