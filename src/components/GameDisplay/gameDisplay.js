import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  setMapId,
  movePlayer,
  getPlayerLocation,
  setRefresh,
} from '../../actions/charActions';
import Keypad from '../Keypad/keypad';
import {Container} from './gameStyle';

const GameDisplay = props => {
  const [grid, setGrid] = useState([[]]);
  const [gridId, setGridId] = useState();
  const [player, setPlayer] = useState({
    x: props.playerX,
    y: props.playerY,
  });
  const [gridWidth, setGridWidth] = useState();
  const [gridHeight, setGridHeight] = useState();
  // const[ refresh, setRefresh] = useState(false);

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
    selectMap();
    props.setRefresh(false);
  }, [props.refresh]);

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
    isLoading: state.charReducer.isLoading,
    refresh: state.charReducer.refresh,
  };
};

export default connect(mapStateToProps, {
  setMapId,
  movePlayer,
  getPlayerLocation,
  setRefresh,
})(GameDisplay);
