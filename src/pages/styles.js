import styled from 'styled-components';
import { darken, lighten } from 'polished';


export const Container = styled.div`
  max-width: 700px;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  border: .5px solid #000;


  h1 {
      /* color: white; */
    text-align: center;
    margin-top: 20px;
    font-size: 40px;
    font-weight: bold;
  }


  div{
    margin-top: 18px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    h2 {
      font-size: 18px;
      strong {
        color: ${lighten(0.2, 'purple')};
      }
    }
  }

  h2, h3{
    font-weight: bold;
    margin: 12px;
    text-align: center;
  }

  h3 {
    font-size: 22px;
  }

  p {
    margin: 12px;
    text-align: center;
    font-size: 35px;
    font-weight: bold;
  }


`;


export const InputButtonContainer = styled.div`
    display: flex;
    justify-content: center;


    input {
        max-width: 150px;
        display: flex;
        border-radius: 4px;
    }
`;

export const AlphabetContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 95%;
  flex-wrap:wrap;
  margin: 10px;
  margin-left: 2.5%;

`;

export const ButtonPlayAgain = styled.button`
  width: 50%;
  height: 40px;
  margin: 15px auto;
  padding: 0;
  font-size: 18px;
  background-color: '#fff';
  border: none;
  font-weight: bolder;
  outline: none;

`;
