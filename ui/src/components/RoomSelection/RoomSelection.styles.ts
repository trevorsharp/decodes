import styled from 'styled-components';

const width = 200;

const Container = styled.div`
  width: 350px;
  margin: auto;
  margin-top 50px;
`;

const ButtonContainer = styled.div`
  position: relative;
  width: ${width}px;
  margin: auto;
`;

const Button = styled.button`
  width: ${width}px;
  border: solid 1.5px;
  border-radius: 6px;
  padding: 10px 15px;
  background-color: transparent;
  cursor: pointer;
  margin: auto;
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

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  font-size: 40px;
  user-select: none;
`;

const Label = styled.h2`
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  user-select: none;
`;

const Entry = styled.input<{ toUpperCase: boolean; isError: boolean }>`
  width: ${width - 3}px;
  height: 37px;
  text-align: center;
  font-weight: 400;
  font-size: 15px;
  border-radius: 6px;
  border: solid 1.5px ${(props) => (props.isError ? 'red' : '')};
  background-color: transparent;
  margin: auto;
  display: block;
  padding: 0;
  margin-bottom: 10px;
  text-transform: ${(props) => (props.toUpperCase ? 'uppercase' : 'none')};

  :focus {
    outline: none !important;
  }

  ::placeholder {
    font-weight: 200;
    text-transform: none;
    user-select: none;
  }
`;

const HideButton = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  user-select: none;
  position: absolute;
  top: 10px;
  left: ${width - 30}px;
  z-index: 1;
`;

const ToolTip = styled.span`
  position: relative;
  display: block;
  margin: auto;

  :hover > span {
    visibility: visible;
  }
`;

const ToolTipText = styled.span`
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 7px 15px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 120%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;

  ::after {
    content: ' ';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`;

export {
  Button,
  Title,
  Label,
  Entry,
  Container,
  HideButton,
  ButtonContainer,
  ToolTip,
  ToolTipText,
};
