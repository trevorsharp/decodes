import styled from 'styled-components';

const Container = styled.div`
width: 100%
height: fit-content;
border: solid 1.5px;
border-radius: 3px;
margin-top: 10px;
padding-bottom: 20px;
`;

const Display = styled.div`
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 15px;
`;

const Detail = styled.div<{ color: string }>`
  width: 45%;
  min-width: 45%;
  max-width: 45%;
  color: ${(props) => (props.color === 'red' ? '#d54e47' : '#4d92e2')};
`;

const PlayerName = styled.p<{ activePlayer: boolean }>`
  text-align: left;
  font-weight: 500;
  font-size: 15px;
  user-select: none;
  text-align: center;
  margin: 6px 5px;
  word-break: break-all;
  font-style: ${(props) => (props.activePlayer ? 'italic' : 'normal')};
`;

const Icon = styled.img`
  height: 15px;
  margin-right: 5px;
  top: 2px;
  position: relative;
  user-select: none;
`;

export { Container, Display, Detail, PlayerName, Icon };
