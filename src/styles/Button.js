import styled from "styled-components";

export const Button = styled.button`
  text-decoration: none;
  max-width: auto;
  background-color: rgb(98 84 243);
  color: white;
  padding: 1.4rem 2.4rem;
  border: none;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &:active {
    box-shadow: 0 2rem 2rem 0 rgba(132, 144, 255, 0.3);
    transform: scale(0.96);
  }

  a {
    text-decoration: none;
    color: white;
    font-size: 1.8rem;
  }
`;
