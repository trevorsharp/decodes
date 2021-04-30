import styled from 'styled-components';

const red = '#d54e47';
const lightRed = '#f7a8a3';
const darkRed = '#7d211c';
const blue = '#4d92e2';
const lightBlue = '#acd2fc';
const darkBlue = '#15467f';

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  font-size: 25px;
  user-select: none;
  margin: 7px 10px;
`;

const ButtonBar = styled.div`
  width: 100%;
  display: flex;
  padding 0 -10px;
`;

const Button = styled.button<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : 'auto')};
  border: solid 2px;
  border-radius: 5px;
  padding: 7px 15px;
  margin: 5px 10px;
  background-color: transparent;
  cursor: pointer;
  display: block;
  vertical-align: text-bottom;
  font-size: 15px;
  font-weight: 700;
  user-select: none;
  color: inherit;

  :hover {
    background-color: #444;
  }

  :active {
    background-color: #494949;
  }

  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;

const Spacer = styled.div`
  flex: auto;
`;

const GameContainer = styled.div`
  margin: 4vh auto;
  max-width: 1350px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 1115px) {
    margin: 10px auto;
  }
`;

const SideBar = styled.div`
  width: 300px;
  min-width: 300px;
  max-width: 300px;
  display: inline-block;
  margin: 15px 25px 50px;

  @media (max-width: 1115px) {
    margin-bottom: 30px;
  }

  @media (max-width: 600px) {
    min-width: 90vw;
    max-width: 90vw;
  }
`;

const Label = styled.h2<{ color?: string; large?: boolean }>`
  text-align: center;
  font-weight: 400;
  font-size: ${(props) => (props.large ? '27px' : '23px')};
  user-select: none;
  margin: 5px 0;
  color: ${(props) => (props.color ? (props.color === 'red' ? red : blue) : 'inherit')};

  @media (max-width: 500px) {
    font-size: ${(props) => (props.large ? '5vw' : '4.5vw')};
  }
`;

const TeamContainer = styled.div`
  width: 100%
  height: fit-content;
  margin: 20px 0 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const TeamDetail = styled.div<{ color: string }>`
  width: 45%;
  min-width: 45%;
  max-width: 45%;
  color: ${(props) => (props.color === 'red' ? '#d54e47' : '#4d92e2')};
`;

const PlayerName = styled.p<{ activePlayer: boolean }>`
  text-align: left;
  font-weight: 500;
  font-size: 18px;
  user-select: none;
  text-align: center;
  margin: 10px 5px;
  overflow-wrap: anywhere;
  font-style: ${(props) => (props.activePlayer ? 'italic' : 'normal')};
`;

const Icon = styled.img`
  height: 15px;
  margin-right: 5px;
  top: 2px;
  position: relative;
  user-select: none;
`;

const GameBoard = styled.div`
  min-width: 700px;
  max-width: 1000px;
  flex: auto;
  margin: 10px 25px 10px;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;

  @media (max-width: 900px) {
    min-width: 90vw;
    max-width: 90vw;
  }
`;

const Word = styled.div<{
  gameOver: boolean;
  isClickable: boolean;
  selected: boolean;
  guesser: boolean;
  color: string;
}>`
  border-radius: 4px;
  text-align: center;
  padding: 45px 10px 50px;
  margin: 8px;
  font-size: 22px;
  user-select: none;
  color: #222;
  background-color: #f4f4f4;
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};

  @media (max-width: 1400px) {
    font-size: 1.6vw;
    padding: 3.2vw 0.3vw 3.4vw;
  }

  @media (max-width: 1115px) {
    font-size: 2.5vw;
    margin: 0.8vw;
    padding: 4vw 0.5vw 4.2vw;
  }

  ${(props) => {
    switch (props.color) {
      case '0':
        if (props.selected) {
          return `color: white; background-color: ${red};`;
        }
        if (!props.guesser || props.gameOver) {
          return `color: ${darkRed}; background-color: ${lightRed}; outline: none;`;
        }
        return;
      case '1':
        if (props.selected) {
          return `color: white; background-color: ${blue};`;
        }
        if (!props.guesser || props.gameOver) {
          return `color: ${darkBlue}; background-color: ${lightBlue}; outline: none;`;
        }
        return;
      case '2':
        if (props.selected) {
          return `color: white; background-color: #999;`;
        }
        if (!props.guesser || props.gameOver) {
          return `color: #444; background-color: #ddd; outline: none;`;
        }
        return;
      case '3':
      default:
        if (props.selected) {
          return `color: white; background-color: #444;`;
        }
        if (!props.guesser || props.gameOver) {
          return `color: #111; background-color: #5a5a5a; outline: none;`;
        }
        return;
    }
  }};
  }};
`;

export {
  Title,
  ButtonBar,
  Button,
  Spacer,
  GameContainer,
  SideBar,
  Label,
  TeamContainer,
  TeamDetail,
  PlayerName,
  Icon,
  GameBoard,
  Word,
};
