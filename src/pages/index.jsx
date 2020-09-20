import { useState, useEffect } from 'react';

import { Container, InputButtonContainer, AlphabetContainer, ButtonPlayAgain } from './styles'

import Head from 'next/head'
import Draw from '../components/Draw';
import Letter from '../components/Letter';

export default function Home() {

  const [life, setLife] = useState(6);
  const [letters, setLetters] = useState([])
  const [currentLetter, setCurrentLetter] = useState('')
  const [game, setGame] = useState({})
  const [isWinner, setIsWinner] = useState(false)
  const [isResetedGame, setIsResetedGame] = useState(false)
  const [alphabet, setAlphabet] = useState(['A','B','C','D','E','F','G','H', 'I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','Z'])
  const [lettersIsDisabled, setLettersIsDisabled] = useState(Array(alphabet.length).fill(false))

  const verifyWord = (letter) => {
    const secretWord = 'CAR';
    return secretWord.indexOf(letter)
  }

  const newGame = () => {
    const currentGame = {
      theme: 'Objeto',
      quantityLetters: 3
    }
    setGame(currentGame)
    return currentGame
  }

  const confirmLetter = (letter, index) => {
    const resultVerifyWord = verifyWord(letter)
    if ( resultVerifyWord === -1 ) {
      setLife(life - 1)
    } else {
      let holdLetter = letters;
      holdLetter[resultVerifyWord] = letter;
      setLetters([...holdLetter]);
    }
    const arrayIsDisabledLetters = lettersIsDisabled;
    arrayIsDisabledLetters[index] = true;
    setLettersIsDisabled([...arrayIsDisabledLetters])

    setIsWinner(verifyIsWinner())
    setCurrentLetter('')
    console.log('brunos2')
  }

  const resetGame = () => {
    setIsResetedGame(true)
    newGame()
    setLetters([...Array(game.quantityLetters).fill('_ ')])
    setLife(6);
    setCurrentLetter('');
    setIsWinner(false)
    setLettersIsDisabled(Array(alphabet.length).fill(false))
    setTimeout(()=> {
      setIsResetedGame(false)
    },0)
  }

  const verifyIsWinner = () => {
    return !letters.includes('_ ')
  }

  useEffect(() => {
    const { quantityLetters } = newGame()
    setLetters([...Array(quantityLetters).fill('_ ')])
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
