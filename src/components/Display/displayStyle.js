import styled from 'styled-components';

export const Container = styled.div`
  justify-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #0a0;
  height: 100vh;
  .buttonContainer {
    justify-content: center;
  }
  .mapContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-style: solid;
    border-color: white;
    border-width: 5px;
    width: 70%;
    background: gray;
  }
  .mapButton {
    margin: 10px;
    width: 90%;
    background: lightgray;
  }

  .title {
    color: white;
    font-size: 3rem;
  }
  .dungeonCon {
    height: 70%;
  }
`;
