import styled from '@emotion/styled';

type TInput = {
  theme: string;
};

export const Wrapp = styled.form`
  position: relative;
  width: 300px;
  margin: 10px auto;
  display: flex;
  align-items: center;
`;

export const Input = styled.input<TInput>`
  max-width: 300px;
  height: 35px;
  outline: none;
  padding: 0 0 0 35px;
  border: 1px solid #000;
  ::placeholder {
    color: #000;
  }
`;

export const LoopWrap = styled.button`
  background-color: transparent;
  border: none;
  left: 5%;
  position: absolute;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export const ButtonSearch = styled.button`
  height: 35px;
  width: 50px;
  border: 1px solid #000;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  cursor: pointer;
  border-left: none;
`;

export const ButtonClear = styled.button`
  position: absolute;
  left: 75%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
