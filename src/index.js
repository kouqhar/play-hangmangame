import uuid from 'uuid'
import Hangman from './hangman'
import getPuzzle from './requests'

let displayGame = document.querySelector('#puzzle')
const gameStatus = document.querySelector('#guesses')
const numWords = document.querySelector('#num-words')
const resetBtn = document.querySelector('#reset')
let wordCount = '6'
let game1;

window.addEventListener('keypress', function (e) {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    render()
})

const render = () => {
    let letters = game1.puzzle.split('')
    displayGame.innerHTML = ''
    gameStatus.textContent = `${game1.statusMessage}`
    numWords.textContent =  `Number of Words : ${wordCount}`
    letters.forEach(elem => {
        let span = document.createElement('span')
        span.textContent = elem
        displayGame.appendChild(span)
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle(wordCount)
    const textLen = Math.floor((puzzle.length / 2) + 1)
    game1 = new Hangman(puzzle, textLen)
    render()
}

resetBtn.addEventListener('click', startGame)
startGame()