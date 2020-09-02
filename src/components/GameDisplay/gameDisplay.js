import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  setMapId,
  movePlayer,
  getPlayerLocation,
  setRefresh,
  setSuccess,
  getMap,
} from '../../actions/charActions';
import Keypad from '../Keypad/keypad';
import {Container} from './gameStyle';
import {Button} from 'pcln-design-system';

const GameDisplay = props => {
  const [grid, setGrid] = useState([[0]]);
  const [gridId, setGridId] = useState();
  const [player, setPlayer] = useState({
    x: props.playerX,
    y: props.playerY,
  });
  const [gridWidth, setGridWidth] = useState();
  const [gridHeight, setGridHeight] = useState();
  const [refresh, setRefresh] = useState(false);

  function selectMap() {
    if (props.maps.length !== null) {
      for (let i = 0; i < props.maps.length; i++) {
        if (props.maps[i].mapid === props.mapid) {
          props.setMapId(props.mapid);
          setGrid(props.maps[i]);
          setGridWidth(props.maps[i].width);
          setGridHeight(props.maps[i].height);
          props.getPlayerLocation(props.playerMapId);
          setPlayer({
            x: props.playerX,
            y: props.playerY,
          });
        }
      }
    }
  }
  useEffect(() => {
    console.log('props.isSuccess', props.isSuccess);
    props.setRefresh(false);
    props.getMap(props.userid);
    selectMap();
  }, [props.refreshMap, props.isSuccess]);

  // const displayGrid = []
  //
  //
  // for (let i = 0; i <= gridHeight; i++){
  //   const row = [];
  //   for (let j = 0; j < grid.grid.length; j++) {
  //     if (grid.grid[j].y === i) {
  //       row.push(grid.grid[j])
  //     }
  //   }
  //   displayGrid.push(row);
  // }

  return (
    <Container className="container">
      <div>{props.mapid}</div>
      {/*  <button onClick={ () => {props.getPlayerLocation(props.playerMapId)}}>Geting player location</button>*/}
      {/*  <button onClick={ () => {props.movePlayer(player, props.playerMapId)}}>Testing player movement</button>*/}
      {grid.grid !== undefined && grid.grid !== null ? (
        grid.grid.map(row => (
          <div style={{height: 10}}>
            {row.map(cell => {
              let color = '';
              if (cell.roomType === 'Floor') {
                color = 'brown';
              }
              if (cell.roomType === 'Door') {
                color = 'gray';
              }
              if (cell.roomType === 'Wall') {
                color = 'black';
              }
              if (cell.roomType === 'Monster') {
                color = 'red';
              }
              if (cell.x === player.x && cell.y === player.y) {
                color = 'yellow';
              }
              return (
                <div
                  style={{
                    backgroundColor: color,
                    width: 10,
                    height: 10,
                    display: 'inline-block',
                  }}
                />
              );
            })}
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}

      <div>
        <Keypad setPlayer={setPlayer} player={player} grid={grid} />
        <Button size="medium" onClick={() => props.setRender(false)}>
          Back to Home
        </Button>
      </div>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    maps: state.charReducer.playerMap,
    playerX: state.charReducer.playerX,
    playerY: state.charReducer.playerY,
    playerMapId: state.charReducer.mapId,
    loading: state.charReducer.loading,
    isSuccess: state.charReducer.isSuccess,
    refreshMap: state.charReducer.refresh,
    userid: state.authReducer.userid,
  };
};

export default connect(mapStateToProps, {
  setMapId,
  movePlayer,
  getPlayerLocation,
  setRefresh,
  getMap,
  setSuccess,
})(GameDisplay);
