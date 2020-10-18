import { useState, useEffect } from 'react';

import axios from 'axios';

import { Container, InputButtonContainer, AlphabetContainer, ButtonPlayAgain } from './styles'

import Head from 'next/head'
import Draw from '../components/Draw';
import Letter from '../components/Letter';

export default function Home() {
  const BASE_URL = 'http://localhost:4000/api'
  const [life, setLife] = useState(6);
  const [letters, setLetters] = useState([])
  const [game, setGame] = useState({})
  const [isWinner, setIsWinner] = useState(false)
  const [isResetedGame, setIsResetedGame] = useState(false)
  const [alphabet, setAlphabet] = useState(['A','B','C','D','E','F','G','H', 'I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','Z'])
  const [lettersIsDisabled, setLettersIsDisabled] = useState(Array(alphabet.length).fill(false))

  const verifyWord = async (letter) => {

    const {data} = await axios.post(`${BASE_URL}/checkletter`,{
      id: game.id,
      letter: letter
    })
    console.log(data)
    return data.indexesOfLetters.length > 0 ? data.indexesOfLetters : false
  }

  const newGame = async () => {

  }

  const confirmLetter = async (letter, index) => {
    const resultVerifyWord = await verifyWord(letter)
    console.log(resultVerifyWord)
    if (!resultVerifyWord) {
      setLife(life - 1)
    } else {
      let holdLetter = letters;
      resultVerifyWord.forEach(indexOfLetter => {
        holdLetter[indexOfLetter] = letter
      })
      setLetters([...holdLetter]);
    }
    const arrayIsDisabledLetters = lettersIsDisabled;
    arrayIsDisabledLetters[index] = true;
    setLettersIsDisabled([...arrayIsDisabledLetters])

    setIsWinner(verifyIsWinner())
    console.log('brunos2')
  }

  const resetGame = async () => {
    setIsResetedGame(true)
    const {data} = await axios.get(`${BASE_URL}/game-start`)
    setGame(data)
    setLetters([...Array(data.quantityLetters).fill('_ ')])
    setLife(6);
    setIsWinner(false)
    setLettersIsDisabled(Array(alphabet.length).fill(false))
    setTimeout(()=> {
      setIsResetedGame(false)
    },0)
  }

  const verifyIsWinner = () => {
    return !letters.includes('_ ')
  }

  useEffect( () => {
    (async () => {
      const {data} = await axios.get(`${BASE_URL}/game-start`)
      setGame(data)
      const { quantityLetters } = data
      setLetters([...Array(quantityLetters).fill('_ ')])
      console.log(data)
    })()

  }, [])

  return (
    <Container>
      <Head>
        <title>Hangman Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Jogo da Forca</h1>
      <div>
        <h2>Tema: <strong>{game.theme}</strong></h2>
        <h2>Vidas restantes: <strong>{life}</strong></h2>
      </div>
      <Draw life={life} isResetedGame={isResetedGame}/>
      {isWinner? (<>
          <h3>Parabains! Você ganhou 👏👏👏!</h3>
          <ButtonPlayAgain onClick={() => resetGame()}>Joga Novamente</ButtonPlayAgain>
        </>) : life < 1 ?
        (<>
          <h3>Game Over ☠️☠️☠️</h3>
          <ButtonPlayAgain onClick={() => resetGame()}>Joga Novamente</ButtonPlayAgain>
        </>) :
       (
      <>
        <p>{letters}</p>
        <AlphabetContainer>
          {alphabet.map((letter, index) => (
            <Letter
            key={index}
            value={letter}
            disabled={lettersIsDisabled[index]}
            onClick={() => confirmLetter(letter, index)}/>
          ))}
        </AlphabetContainer>

      </>)
      }
    </Container>
  )
}
