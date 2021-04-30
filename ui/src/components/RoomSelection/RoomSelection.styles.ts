import styled from 'styled-components';
import { Button } from '../App/App.styles';

const width = 200;
const alertRed = '#eb2f2f';

const Container = styled.div`
  width: ${width + 70}px;
  margin: 10vh auto;
  position: static;
`;

const ButtonContainer = styled.div`
  position: relative;
  width: ${width}px;
  margin: auto;
`;

const NewButton = styled(Button)`
  width: ${width}px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 500px) {
    font-size: 15px;
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

const Text = styled.p<{ topMargin?: boolean; isError?: boolean }>`
  text-align: center;
  font-weight: 400;
  font-size: 18px;
  user-select: none;
  margin-top: ${(props) => (props.topMargin ? '40px' : '20px')};
  color: ${(props) => (props.isError ? alertRed : 'inherit')};
`;

const Entry = styled.input<{ toUpperCase: boolean; isError: boolean; hideText?: boolean }>`
  width: ${width - 3}px;
  height: 37px;
  text-align: center;
  ${(props) => (props.hideText ? '-webkit-text-security: disc;' : '-webkit-text-security: none;')}
  font-weight: 500;
  font-size: 15px;
  border: solid 2px ${(props) => (props.isError ? alertRed : '#f9f9f9')};
  border-style: solid;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #333;
  margin: auto;
  display: block;
  padding: 0;
  margin-bottom: 10px;
  text-transform: ${(props) => (props.toUpperCase ? 'uppercase' : 'none')};

  :focus {
    outline: none !important;
  }

  ::placeholder {
    font-weight: 400;
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
  background-color: #e9e9e9;
  color: #333;
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
    border-color: #e9e9e9 transparent transparent transparent;
  }
`;

export {
  NewButton as Button,
  Title,
  Label,
  Text,
  Entry,
  Container,
  HideButton,
  ButtonContainer,
  ToolTip,
  ToolTipText,
};
