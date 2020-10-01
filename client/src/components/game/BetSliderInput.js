import styled from 'styled-components';

export const BetSliderInput = styled.input`
  width: 100%;
  background-color: transparent;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    background: #245069;
    border: none;
    border-radius: 40px;
    width: 100%;
    height: 0.25rem;
    cursor: pointer;
  }

  &::-webkit-slider-thumb {
    margin-top: -4px;
    width: 1rem;
    height: 1rem;
    background: #6297b5;
    border: 0px solid rgba(0, 0, 0, 0);
    border: 0;
    border-radius: 40px;
    cursor: pointer;
    -webkit-appearance: none;
  }

  &:focus::-webkit-slider-runnable-track {
    background: #245069;
  }

  &::-moz-range-track {
    background: #245069;
    border: none;
    border-radius: 40px;
    width: 100%;
    height: 0.25rem;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 1rem;
    height: 1rem;
    background: #6297b5;
    border: 0px solid rgba(0, 0, 0, 0);
    border: 0;
    border-radius: 40px;
    cursor: pointer;
  }

  &::-ms-track {
    background: transparent;
    border-color: transparent;
    border-width: 4.8px 0;
    color: transparent;
    width: 100%;
    height: 0.25rem;
    cursor: pointer;
  }

  &::-ms-fill-lower {
    background: #245069;
    border: none;
    border-radius: 40px;
  }

  &::-ms-fill-upper {
    background: #245069;
    border: none;
    border-radius: 40px;
  }

  &::-ms-thumb {
    width: 1rem;
    height: 1rem;
    background: #6297b5;
    border: 0px solid rgba(0, 0, 0, 0);
    border: 0;
    border-radius: 40px;
    cursor: pointer;
    margin-top: 0px;
  }

  &:focus::-ms-fill-lower {
    background: #245069;
  }

  &:focus::-ms-fill-upper {
    background: #245069;
  }

  @supports (-ms-ime-align: auto) {
    & {
      margin: 0;
    }
  }
`;
