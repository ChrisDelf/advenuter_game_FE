import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .single {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .double {
    align-items: space-between;
  }
`;
