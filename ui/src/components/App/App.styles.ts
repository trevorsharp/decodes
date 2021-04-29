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
  border: solid 1.5px;
  border-radius: 6px;
  padding: 7px 15px;
  margin: 5px 10px;
  background-color: transparent;
  cursor: pointer;
  display: block;
  vertical-align: text-bottom;
  font-size: 15px;
  font-weight: 500;
  user-select: none;

  :hover {
    background-color: #eee;
  }

  :active {
    background-color: #ddd;
  }
`;

const Spacer = styled.div`
  flex: auto;
`;

const GameContainer = styled.div`
  padding: 0 25px;
  margin: 4vh auto;
  width: 1350px;
`;

const SideBar = styled.div`
  width: 300px;
  display: inline-block;
`;

const Label = styled.h2<{ color?: string }>`
  text-align: center;
  font-weight: 400;
  font-size: 17px;
  user-select: none;
  color: ${(props) => (props.color ? (props.color === 'red' ? red : blue) : 'inherit')};
`;

const GameBoard = styled.div`
  width: 1000px;
  float: right;
  flex: auto;
  margin-top: 10px;
  margin-bottom: 100px;
  flex: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Word = styled.div<{
  gameOver: boolean;
  isClickable: boolean;
  selected: boolean;
  leader: boolean;
  color: string;
}>`
  width: 165px;
  border-radius: 3px;
  text-align: center;
  padding: 50px 10px 55px;
  margin: 9px 0;
  user-select: none;
  color: black;
  background-color: #eee;
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
  ${(props) => {
    switch (props.color) {
      case '0':
        if (props.selected) {
          return `color: white; background-color: ${red};`;
        }
        if (props.leader || props.gameOver) {
          return `color: ${darkRed}; background-color: ${lightRed}; outline: none;`;
        }
        return;
      case '1':
        if (props.selected) {
          return `color: white; background-color: ${blue};`;
        }
        if (props.leader || props.gameOver) {
          return `color: ${darkBlue}; background-color: ${lightBlue}; outline: none;`;
        }
        return;
      case '2':
        if (props.selected) {
          return `color: white; background-color: #aaa;`;
        }
        if (props.leader || props.gameOver) {
          return `color: #444; background-color: #ddd; outline: none;`;
        }
        return;
      case '3':
      default:
        if (props.selected) {
          return `color: white; background-color: #333;`;
        }
        if (props.leader || props.gameOver) {
          return `color: #222; background-color: #777; outline: none;`;
        }
        return;
    }
  }};
  }};
`;

export { Title, ButtonBar, Button, Spacer, GameContainer, SideBar, Label, GameBoard, Word };
