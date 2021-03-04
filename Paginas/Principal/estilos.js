import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  background: white;
  width: 700px;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  svg {
    margin-right: 10px;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  flex-direction: row;
  display: flex;
  input {
    flex: 1;
    border: 1px solid ${(props) => (props.error ? "#FF0000" : "#ddd")};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }
`;

//Criando animcação do botao
const animate = keyframes`
  from{
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: "submit",
  disabled: props.loading,
}))`
  background: #0d2636;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${animate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  margin-top: 30px;

  li {
    display: flex;
    padding: 16px;
    flex-direction: row;
    justify-content: space-between;
    font-family: Roboto;
    font-size: 18px;
    text-decoration: none;
    list-style: none;
    align-items: center;
  }
`;

export const Button = styled.button.attrs({
  type: "button",
})`
  background: transparent;
  color: #0d2636;
  border: 0;
  padding: 8px 7px;
  outline: 0;
  border-radius: 4px;
`;
